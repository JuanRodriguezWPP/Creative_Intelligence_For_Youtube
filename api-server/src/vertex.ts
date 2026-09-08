import { GoogleAuth } from 'google-auth-library';
import { CONFIG } from './config';

interface VertexAiModelParams {
  temperature: number;
  maxOutputTokens: number;
  topP: number;
  thinkingConfig: { thinkingBudget: number };
}

interface VertexAiGeminiRequest {
  contents: {
    role: 'user';
    parts: (
      | { text: string }
      | { fileData: { mimeType: string; fileUri: string } }
      | { inlineData: { mimeType: string; data: string } }
    )[];
  };
  generationConfig: VertexAiModelParams;
  safetySettings: VertexAiGeminiRequestSafetyThreshold[];
}

enum SafetyThreshold {
  HARM_BLOCK_THRESHOLD_UNSPECIFIED = 0,
  BLOCK_LOW_AND_ABOVE = 1,
  BLOCK_MEDIUM_AND_ABOVE = 2,
  BLOCK_ONLY_HIGH = 3,
  BLOCK_NONE = 4,
}

interface VertexAiGeminiRequestSafetyThreshold {
  category:
  | 'HARM_CATEGORY_SEXUALLY_EXPLICIT'
  | 'HARM_CATEGORY_HATE_SPEECH'
  | 'HARM_CATEGORY_HARASSMENT'
  | 'HARM_CATEGORY_DANGEROUS_CONTENT';
  threshold: SafetyThreshold;
}

interface VertexAiGeminiResponseCandidate {
  candidates?: [
    {
      content: {
        parts: [{ text: string }];
      };
      finishReason?: string;
    },
  ];
  error?: Record<string, unknown>;
}

// Instanciamos el cliente de autenticación
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// Helper para reemplazar a Utilities.sleep() de Apps Script
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class VertexHelper {
  static getEndpointUrlBase(): string {
    return `https://${CONFIG.vertexAi.location}-${CONFIG.vertexAi.endpoint}/v1/projects/${CONFIG.vertexAi.projectId}/locations/${CONFIG.vertexAi.location}/publishers/google/models/${CONFIG.vertexAi.model}`;
  }

  static async fetchJson(url: string, request: VertexAiGeminiRequest): Promise<unknown> {
    try {
      // 1. Obtenemos el token de acceso mágicamente gracias al Service Account
      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();

      // 2. Hacemos la petición usando el fetch nativo de Node.js
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (response.status === 429) {
        console.log(`Waiting ${Number(CONFIG.vertexAi.quotaLimitDelay) / 1000}s as API quota limit has been reached...`);
        await sleep(CONFIG.vertexAi.quotaLimitDelay);
        return VertexHelper.fetchJson(url, request);
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Vertex AI Error ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching from Vertex AI:', error);
      throw error;
    }
  }

  static async generate(prompt: string, gcsVideoUrl?: string, modelParams?: Partial<VertexAiModelParams>, csvBase64?: string): Promise<string> {
    return VertexHelper.multimodalGenerate(prompt, gcsVideoUrl, modelParams, csvBase64);
  }

  static async multimodalGenerate(prompt: string, gcsVideoUrl?: string, modelParams?: Partial<VertexAiModelParams>, csvBase64?: string): Promise<string> {
    const endpoint = `${VertexHelper.getEndpointUrlBase()}:streamGenerateContent`;

    const request: VertexAiGeminiRequest = {
      contents: {
        role: 'user',
        parts: [{ text: prompt }],
      },
      generationConfig: { ...CONFIG.vertexAi.modelParams, ...modelParams },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: SafetyThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: SafetyThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: SafetyThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: SafetyThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    };
    
    if (gcsVideoUrl) {
      request.contents.parts.push({
        fileData: { mimeType: 'video/mp4', fileUri: gcsVideoUrl },
      });
    }
    
    if (csvBase64) {
      request.contents.parts.push({
        inlineData: { mimeType: 'text/csv', data: csvBase64 },
      });
    }

    const response = await VertexHelper.fetchJson(
      endpoint,
      request
    ) as VertexAiGeminiResponseCandidate[];

    const content: string[] = [];
    for (const candidate of response) {
      if (candidate.error) {
        // If quota exhausted (429) inside the JSON response, retry
        if ((candidate.error as any).code === 429 || (candidate.error as any).status === 'RESOURCE_EXHAUSTED') {
          console.log(`Streaming chunk returned 429 RESOURCE_EXHAUSTED. Waiting ${Number(CONFIG.vertexAi.quotaLimitDelay) / 1000}s to retry...`);
          await sleep(CONFIG.vertexAi.quotaLimitDelay);
          return VertexHelper.multimodalGenerate(prompt, gcsVideoUrl, modelParams, csvBase64);
        }
        throw new Error(JSON.stringify(response));
      }
      
      if (
        candidate.candidates && candidate.candidates[0] &&
        ('SAFETY' === candidate.candidates[0].finishReason ||
        'BLOCKLIST' === candidate.candidates[0].finishReason)
      ) {
        throw new Error(
          `Request was blocked as it triggered API safety filters. ${prompt}`
        );
      }
      
      if (candidate.candidates && candidate.candidates[0] && candidate.candidates[0].content && candidate.candidates[0].content.parts) {
        content.push(candidate.candidates[0].content.parts[0].text);
      }
    }
    
    const contentText = content.join('');
    if (!contentText) {
      throw new Error(JSON.stringify(response));
    }
    return contentText;
  }
}
