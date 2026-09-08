/**
 * generation.ts — Migrado de Apps Script a Node.js
 *
 * Cambios principales:
 * - CacheService.getScriptCache() → NodeCache (sin límite de 100KB)
 * - Todas las funciones son async/await
 * - Utilities.base64Encode() → Buffer.from().toString('base64')
 * - Imports apuntan a archivos locales del api-server
 */

import NodeCache from 'node-cache';
import { COMPASS_INTELLIGENCE_PROMPTS, PROMPTS } from './prompts';
import { CONFIG } from './config';
import { AppLogger } from './logging';
import { StorageManager } from './storage';
import { TimeUtil } from './time-util';
import { GenerationSettings, VariantTextAsset } from './types';
import { VertexHelper } from './vertex';

// Reemplazo de CacheService de Apps Script — sin límite de tamaño
const cache = new NodeCache({ stdTTL: CONFIG.defaultCacheExpiration });

const GENERATE_TEXT_ASSETS_REGEX =
  /.*Headline\s?:\**(?<headline>.*)\n+\**Description\s?:\**(?<description>.*)/ims;

export interface AvSegment {
  av_segment_id: string;
  description: string;
  visual_segment_ids: number[];
  audio_segment_ids: number[];
  start_s: number;
  end_s: number;
  duration_s: number;
  transcript: string[];
  labels: string[];
  objects: string[];
  text: string[];
  logos: string[];
  details: string[];
  keywords: string;
}

export interface GenerateVariantsResponse {
  combo_id: number;
  title: string;
  scenes: string[];
  av_segments: AvSegment[];
  description: string;
  score: number;
  abcd: {
    attention: any;
    branding: any;
    connection: any;
    direction: any;
  };
  abcd_dimensiones?: {
    attention_score: number;
    branding_score: number;
    connection_score: number;
    direction_score: number;
  };
  duration: string;
  strengths?: string[];
  weaknesses?: string[];
  insight_principal?: string;
  proyeccion_impacto?: string;
}

export class GenerationHelper {
  static async resolveGenerationPrompt(
    gcsFolder: string,
    settings: GenerationSettings
  ): Promise<string> {
    const videoLanguage = await GenerationHelper.getVideoLanguage(gcsFolder);
    const avSegments = await GenerationHelper.getAvSegments(gcsFolder);

    const duration = settings.shortenVideo
      ? settings.duration
      : avSegments.reduce((total, seg) => total + seg.duration_s, 0);

    const expectedDurationRange =
      GenerationHelper.calculateExpectedDurationRange(duration);
    const videoScript = await GenerationHelper.createVideoScript(
      gcsFolder,
      settings.shortenVideo ? settings.duration : Number.MAX_SAFE_INTEGER
    );

    let promptTemplate = settings.shortenVideo
      ? CONFIG.vertexAi.generationPrompt
      : CONFIG.vertexAi.aspectRatioOnlyPrompt;

    if (settings.fullVideoAnalysis) {
      promptTemplate = CONFIG.vertexAi.fullVideoEvaluationPrompt;
    }

    // Build brand guidelines block
    let brandSection = '';
    const bp = settings.brandParams;
    if (bp && (bp.brandName || bp.advertiserName || bp.country || bp.brandColor || bp.brandColor2 || bp.brandColor3 || bp.communicationTone)) {
      const lines: string[] = [
        '4b. **Brand & Client Guidelines (MANDATORY — apply to every combination):**',
      ];
      if (bp.brandName) lines.push(`    *   **Brand Name:** ${bp.brandName}`);
      if (bp.advertiserName) lines.push(`    *   **Advertiser:** ${bp.advertiserName}`);
      if (bp.country) lines.push(`    *   **Target Country/Market:** ${bp.country} — ensure cultural nuances and context align with this market.`);
      if (bp.brandColor || bp.brandColor2 || bp.brandColor3) {
        lines.push(`    *   **Brand Colors (hex):**`);
        if (bp.brandColor) lines.push(`        - Primary: ${bp.brandColor}`);
        if (bp.brandColor2) lines.push(`        - Secondary: ${bp.brandColor2}`);
        if (bp.brandColor3) lines.push(`        - Tertiary: ${bp.brandColor3}`);
        lines.push(`        Ensure visual elements, text overlays, and color grading referencing brand identity respect this color palette.`);
      }
      if (bp.communicationTone) lines.push(`    *   **Communication Tone:** ${bp.communicationTone} — all selected scenes and the overall narrative MUST reflect this tone.`);
      lines.push('    *   Any combination that contradicts these brand guidelines must be discarded.');
      brandSection = lines.join('\n');
    }

    let contextSection = '';
    const cc = (settings as any).campaignContext;
    if (cc) {
      const ccLines = [
        '**CONTEXTO ESTRATÉGICO Y DE CAMPAÑA (MANDATORY TO CONSIDER FOR YOUR EVALUATION):**',
        'El Insight Principal, Fortalezas y Áreas de Mejora DEBEN evaluarse teniendo en cuenta el siguiente contexto del caso:'
      ];
      if (cc.objetivo_campania) ccLines.push(`- Objetivo de Campaña: ${cc.objetivo_campania}`);
      if (cc.formato_asset) ccLines.push(`- Formato del Asset: ${cc.formato_asset}`);
      if (cc.comentarios_asset) ccLines.push(`- Comentarios y requerimientos del Asset: ${cc.comentarios_asset}`);
      if (cc.objetivo_negocio) ccLines.push(`- Objetivo de Negocio: ${cc.objetivo_negocio}`);
      if (cc.audiencia) ccLines.push(`- Audiencia Target: ${cc.audiencia}`);
      if (cc.descripcion) ccLines.push(`- Descripción de la Campaña: ${cc.descripcion}`);
      if (cc.consideraciones) ccLines.push(`- Consideraciones Especiales: ${cc.consideraciones}`);
      if (cc.lineamientos_marca) ccLines.push(`- Lineamientos de Marca: ${cc.lineamientos_marca}`);
      if (cc.contexto_mercado) ccLines.push(`- Contexto de Mercado: ${cc.contexto_mercado}`);
      ccLines.push('Evalúa el video en función de si logra este objetivo y respeta este formato, no uses reglas genéricas si contradicen el formato (ej. no pidas historias largas en un formato de 6 segundos).');
      contextSection = ccLines.join('\n');
    }

    const generationPrompt = promptTemplate
      .replace('{{{{campaignContext}}}}', contextSection)
      .replace('{{{{userPrompt}}}}', settings.prompt)
      .replace('{{{{generationEvalPromptPart}}}}', settings.evalPrompt)
      .replace('{{{{brandGuidelines}}}}', brandSection)
      .replace('{{{{desiredDuration}}}}', String(duration))
      .replace('{{{{expectedDurationRange}}}}', expectedDurationRange)
      .replace('{{{{videoLanguage}}}}', videoLanguage)
      .replace('{{{{videoScript}}}}', videoScript);

    return generationPrompt;
  }

  static async getVideoLanguage(gcsFolder: string): Promise<string> {
    const content = await StorageManager.loadFile(`${gcsFolder}/language.txt`, true);
    return (content as string) || CONFIG.defaultVideoLanguage;
  }

  static calculateExpectedDurationRange(duration: number): string {
    const durationFraction = 20 / 100;
    return `${duration - duration * durationFraction}-${duration + duration * durationFraction}`;
  }

  static async getAvSegments(gcsFolder: string): Promise<AvSegment[]> {
    const key = `${gcsFolder}/data.json`;

    // Intentar leer del cache primero (reemplaza CacheService de Apps Script)
    let avSegmentsStr = cache.get<string>(key);

    if (!avSegmentsStr) {
      avSegmentsStr = await StorageManager.loadFile(key, true) as string;
      // NodeCache no tiene límite de 100KB como Apps Script
      cache.set(key, avSegmentsStr);
    }

    return JSON.parse(avSegmentsStr).map((avSegment: AvSegment) => {
      if (typeof avSegment.av_segment_id === 'number') {
        avSegment.av_segment_id = String((avSegment.av_segment_id as unknown as number) + 1);
      }
      if (avSegment.av_segment_id.endsWith('.0')) {
        avSegment.av_segment_id = avSegment.av_segment_id.replace('.0', '');
      }
      return avSegment;
    }) as AvSegment[];
  }

  static async createVideoScript(gcsFolder: string, duration: number): Promise<string> {
    const avSegments = await GenerationHelper.getAvSegments(gcsFolder);
    const videoScript: string[] = [];

    avSegments.forEach(avSegment => {
      if (avSegment.duration_s <= duration) {
        videoScript.push(`Scene ${avSegment.av_segment_id}`);
        videoScript.push(`${avSegment.start_s} --> ${avSegment.end_s}`);
        videoScript.push(`Duration: ${(avSegment.end_s - avSegment.start_s).toFixed(2)}s`);
        const description = avSegment.description;
        if (description) videoScript.push(`Description: ${description.trim()}`);
        videoScript.push(`Number of visual shots: ${avSegment.visual_segment_ids.length}`);
        const transcript = avSegment.transcript;
        const details = avSegment.labels.concat(avSegment.objects);
        const text = avSegment.text.map((t: string) => `"${t}"`);
        const logos = avSegment.logos;
        const keywords = avSegment.keywords;
        if (transcript) videoScript.push(`Off-screen speech: "${transcript.join(' ')}"`);
        if (details) videoScript.push(`On-screen details: ${details.join(', ')}`);
        if (text) videoScript.push(`On-screen text: ${text.join(', ')}`);
        if (logos) videoScript.push(`Logos: ${logos.join(', ')}`);
        if (keywords) videoScript.push(`Keywords: ${keywords.trim()}`);
        videoScript.push('');
      }
    });
    return videoScript.join('\n');
  }

  static async generateVariants(gcsFolder: string, settings: GenerationSettings): Promise<GenerateVariantsResponse[]> {
    const prompt = await GenerationHelper.resolveGenerationPrompt(gcsFolder, settings);
    const variants: GenerateVariantsResponse[] = [];
    const avSegments = await GenerationHelper.getAvSegments(gcsFolder);
    const avSegmentsMap = avSegments.reduce(
      (segments, segment) => ({ ...segments, [segment.av_segment_id]: segment }),
      {} as Record<string, AvSegment>
    );
    const allScenesArray = Object.keys(avSegmentsMap).sort((a, b) => Number(a) - Number(b));
    const allScenes = allScenesArray.join(', ');
    let iteration = 0;
    const maxIterations = 5;

    while (!variants.length && iteration < maxIterations) {
      iteration++;
      AppLogger.info(`GenerateVariants attempt #${iteration} of ${maxIterations}`);
      AppLogger.info(`Mode: ${settings.shortenVideo ? 'SHORTENING' : 'ASPECT RATIO ONLY'}`);
      const response = await VertexHelper.generate(prompt);
      AppLogger.info(`GenerateVariants Response #${iteration}: ${response}`);

      const jsonMatch = response.match(/\[[\s\S]*\]/s);

      if (jsonMatch) {
        try {
          const parsedResults = JSON.parse(jsonMatch[0]);
          AppLogger.info(`Parsed response into ${parsedResults.length} results (JSON)`);

          parsedResults.forEach((result: any, index: number) => {
            AppLogger.info(`\n=== Processing result #${index + 1} ===`);
            const { title, scenes, description, score, abcd } = result;

            const trimmedScenes = String(scenes).trim().split(',')
              .map(s => s.trim()).filter(Boolean)
              .map(scene => scene.toLowerCase().replace('scene ', '').replace('.0', ''));

            if (trimmedScenes.length === 0) {
              AppLogger.warn(`✗ Rejected: Variant has no scenes.\nResult: ${JSON.stringify(result)}`);
              return;
            }

            const sortedTrimmedScenes = trimmedScenes.sort((a, b) => Number(a) - Number(b));
            const trimmedScenesStr = sortedTrimmedScenes.join(', ');
            AppLogger.info(`Scenes found: "${trimmedScenesStr}"`);

            const shouldAcceptVariant = settings.shortenVideo && !settings.fullVideoAnalysis
              ? trimmedScenesStr !== allScenes : true;

            if (shouldAcceptVariant) {
              const outputScenes = sortedTrimmedScenes;
              const filteredSegments = avSegments.filter((segment: AvSegment) =>
                outputScenes.includes(segment.av_segment_id)
              );

              if (filteredSegments.length === 0) {
                AppLogger.warn(`✗ Rejected: No matching segments. Scenes: ${JSON.stringify(outputScenes)}`);
                return;
              }

              const variant: GenerateVariantsResponse = {
                combo_id: index + 1,
                title: String(title).trim(),
                scenes: outputScenes,
                av_segments: filteredSegments,
                description: String(description || '').trim(),
                score: Number(String(score).replace(/[^\d.]/g, '').trim()),
                abcd: {
                  attention: abcd?.attention || [],
                  branding: abcd?.branding || [],
                  connection: abcd?.connection || [],
                  direction: abcd?.direction || []
                },
                abcd_dimensiones: result.abcd_dimensiones ? {
                  attention_score: Number(result.abcd_dimensiones.attention_score) || 0,
                  branding_score: Number(result.abcd_dimensiones.branding_score) || 0,
                  connection_score: Number(result.abcd_dimensiones.connection_score) || 0,
                  direction_score: Number(result.abcd_dimensiones.direction_score) || 0
                } : undefined,
                duration: GenerationHelper.calculateVariantDuration(outputScenes, avSegmentsMap),
                strengths: result.strengths || [],
                weaknesses: result.weaknesses || [],
                insight_principal: result.insight_principal || result.description || '',
                proyeccion_impacto: result.proyeccion_impacto || ''
              };
              variants.push(variant);
              AppLogger.info(`✓ Variant #${variants.length} added: "${variant.title}"`);
            } else {
              AppLogger.warn(`✗ Rejected: Response with ALL scenes in shortening mode.\nScenes: ${trimmedScenesStr}`);
            }
          });
        } catch (e: any) {
          AppLogger.error(`✗ JSON PARSE FAILED: ${e.message}`);
          AppLogger.error(response);
        }
      } else {
        AppLogger.error(`✗ NO JSON ARRAY FOUND IN RESPONSE`);
        AppLogger.error(response);
      }
    }

    AppLogger.info(`\n=== Generation Summary ===`);
    AppLogger.info(`Total variants generated: ${variants.length}`);
    AppLogger.info(`Iterations used: ${iteration}/${maxIterations}`);

    if (!variants.length) {
      throw new Error(`Failed to generate valid variants after ${maxIterations} attempts.`);
    }

    return variants.sort(
      (a, b) =>
        Math.abs(settings.duration - TimeUtil.timeStringToSeconds(a.duration)) -
        Math.abs(settings.duration - TimeUtil.timeStringToSeconds(b.duration)) || b.score - a.score
    );
  }

  static calculateVariantDuration(scenes: string[], avSegmentsMap: Record<string, AvSegment>): string {
    let duration = 0;
    for (const scene of scenes) {
      const avSegment = avSegmentsMap[scene];
      if (avSegment) duration += avSegment.end_s - avSegment.start_s;
    }
    return TimeUtil.secondsToTimeString(duration);
  }

  static async generateTextAsset(
    variantVideoPath: string,
    textAsset: VariantTextAsset,
    textAssetLanguage: string
  ): Promise<VariantTextAsset> {
    const generationPrompt = CONFIG.vertexAi.textAssetsGenerationPrompt
      .replace('{{videoLanguage}}', textAssetLanguage)
      .replace('{{desiredCount}}', '1')
      .replace('3. ', '4. ')
      .replace('{{badExamplePromptPart}}', CONFIG.vertexAi.textAssetsBadExamplePromptPart)
      .replace('{{headline}}', textAsset.headline)
      .replace('{{description}}', textAsset.description);

    const response = await VertexHelper.generate(
      generationPrompt,
      `gs:/${decodeURIComponent(variantVideoPath)}`
    );
    AppLogger.info(`GenerateTextAsset Response: ${response}`);
    const result = response.split('## Ad').filter(Boolean)[0];
    const matches = result.match(GENERATE_TEXT_ASSETS_REGEX);
    if (matches) {
      const { headline, description } = matches.groups as { headline: string; description: string };
      return { headline: String(headline).trim(), description: String(description).trim() };
    } else {
      throw new Error(`WARNING - Received an incomplete response from the API!\nResponse: ${response}`);
    }
  }

  static async generateTextAssets(
    variantVideoPath: string,
    textAssetsLanguage: string
  ): Promise<VariantTextAsset[]> {
    const count = 5;
    const generationPrompt = CONFIG.vertexAi.textAssetsGenerationPrompt
      .replace('{{videoLanguage}}', textAssetsLanguage)
      .replace('{{desiredCount}}', String(count))
      .replace('{{badExamplePromptPart}}\n    ', '');

    const textAssets: VariantTextAsset[] = [];
    let iteration = 0;

    while (textAssets.length < count) {
      iteration++;
      const response = await VertexHelper.generate(
        generationPrompt,
        `gs:/${decodeURIComponent(variantVideoPath)}`
      );
      AppLogger.info(`GenerateTextAssets Response: ${response}`);
      const results = response.split('## Ad').filter(Boolean);

      for (const result of results) {
        const matches = result.match(GENERATE_TEXT_ASSETS_REGEX);
        if (matches) {
          const { headline, description } = matches.groups as { headline: string; description: string };
          textAssets.push({ headline: String(headline).trim(), description: String(description).trim() });
          if (textAssets.length === count) break;
        } else {
          AppLogger.warn(`WARNING - Incomplete response for iteration #${iteration}`);
        }
      }
    }
    return textAssets;
  }

  static async generateYoutubeIdeas(
    gcsFolder: string,
    abcdType: string,
    customPoints: string,
    mode: string,
    selectedValue: string,
    selectedCategories?: string[],
    macroJson?: string,
    microJson?: string
  ): Promise<string> {
    const dataFile = await StorageManager.loadFile(`${gcsFolder}/${CONFIG.cloudStorage.files.data}`, true) as string;
    const analysisFile = await StorageManager.loadFile(`${gcsFolder}/${CONFIG.cloudStorage.files.analysis}`, true) as string;
    const brandParamsFile = await StorageManager.loadFile(`${gcsFolder}/brand_parameters.json`, true) as string;

    if (!dataFile || !analysisFile) throw new Error('Analysis or data files not found.');

    const avSegments = JSON.parse(dataFile);
    const videoAnalysis = JSON.parse(analysisFile);

    let segmentsText = 'No specific segments available.';
    if (Array.isArray(avSegments)) {
      segmentsText = avSegments
        .map((seg: any, index: number) => {
          const start = TimeUtil.secondsToTimeString(seg.start_s);
          const end = TimeUtil.secondsToTimeString(seg.end_s);
          const description = seg.description || 'Visual sequence';
          const transcript = seg.transcript && seg.transcript.length > 0 ? ` [Transcript: ${seg.transcript.join(' ')}]` : '';
          return `* Segment ${index} (${start} - ${end}): ${description}${transcript}`;
        })
        .join('\n');
    }

    let personalizationContext = 'Generate comprehensive YouTube content ideation covering both category-specific and geographic personalization strategies.';
    if (mode === 'category' && selectedValue) {
      personalizationContext = `The content MUST be specifically optimized for the YouTube category/categories: **${selectedValue}**. Tailor the production script, tone, pacing, storytelling format, and creative angles to resonate deeply with the typical audience of this category.`;
    } else if (mode === 'geokey') {
      personalizationContext = `INSTRUCCIONES PARA MODO GEOKEY:\nEl usuario ha analizado su mercado usando inteligencia geoespacial.\n\nESTRATEGIA MACRO (Top Municipios):\n${macroJson || 'No provisto'}\n\nOPORTUNIDADES MICRO (Hexágonos Top 20):\n${microJson || 'No provisto'}\n\nTU TAREA:\n1. Analiza los Municipios y Hexágonos provistos.\n2. Identifica puntos de interés relevantes.\n3. Define perfil de audiencia.\n4. Genera ideas creativas hiper-localizadas.\n5. Integra segmentos del video y análisis ABCD.\n6. Responde usando "geoKeyInsights" del JSON. Deja "categoryIdeas" nulo.`;
    }

    const abcdBusinessObjectives = CONFIG.vertexAi.abcdBusinessObjectives as Record<string, { promptPart: string }>;
    const abcdPrompt = abcdBusinessObjectives[abcdType]?.promptPart || '';

    let brandSection = 'No specific brand guidelines provided.';
    if (brandParamsFile) {
      try {
        const bp = JSON.parse(brandParamsFile);
        if (bp.brandName || bp.advertiserName || bp.country || bp.brandColor || bp.communicationTone) {
          const lines: string[] = ['**Brand & Client Guidelines (MANDATORY):**'];
          if (bp.brandName) lines.push(`*   **Brand Name:** ${bp.brandName}`);
          if (bp.advertiserName) lines.push(`*   **Advertiser:** ${bp.advertiserName}`);
          if (bp.country) lines.push(`*   **Target Market:** ${bp.country}`);
          if (bp.brandColor || bp.brandColor2 || bp.brandColor3) {
            lines.push(`*   **Brand Colors:** Primary: ${bp.brandColor || 'N/A'}, Secondary: ${bp.brandColor2 || 'N/A'}, Tertiary: ${bp.brandColor3 || 'N/A'}`);
          }
          if (bp.communicationTone) lines.push(`*   **Communication Tone:** ${bp.communicationTone}`);
          lines.push('*   Generated content MUST strictly adhere to these brand parameters.');
          brandSection = lines.join('\n');
        }
      } catch (e) {
        AppLogger.warn('Failed to parse brand parameters in youtube ideas generation.');
      }
    }

    let prompt = CONFIG.vertexAi.youtubeIdeasPrompt;
    const conciseAnalysis = { labels: videoAnalysis.labels || [], objects: videoAnalysis.objects || [], text: videoAnalysis.text || [] };
    prompt = prompt.replace('{{personalizationContext}}', personalizationContext);
    prompt = prompt.replace('{{analysis}}', JSON.stringify(conciseAnalysis));
    prompt = prompt.replace('{{segments}}', segmentsText);
    prompt = prompt.replace('{{abcd}}', abcdPrompt);
    prompt = prompt.replace('{{brandGuidelines}}', brandSection);
    prompt = prompt.replace('{{customPoints}}', customPoints);

    AppLogger.info(`GenerateYoutubeIdeas Prompt length: ${prompt.length}`);
    let response = await VertexHelper.generate(prompt);

    // Clean markdown from Gemini response
    response = response.trim();
    if (response.startsWith('```json')) response = response.substring(7);
    else if (response.startsWith('```')) response = response.substring(3);
    if (response.endsWith('```')) response = response.substring(0, response.length - 3);
    response = response.trim();

    return response;
  }

  // ─────────────────────────────────────────────────────────────────
  // COMPASS PIPELINE — Pasos 4, 5 y 6
  // ─────────────────────────────────────────────────────────────────

  static async generateGeoIntelligence(
    compassContextJson: string,
    macroJson: string,
    microJson: string
  ): Promise<string> {
    let macroJsonTruncated = macroJson;
    try {
      const macroParsed = JSON.parse(macroJson);
      if (macroParsed?.top_zonas_demanda && Array.isArray(macroParsed.top_zonas_demanda)) {
        macroParsed.top_zonas_demanda = macroParsed.top_zonas_demanda.slice(0, 30);
        macroJsonTruncated = JSON.stringify(macroParsed);
      }
    } catch (e) {
      AppLogger.warn('Could not truncate macroJson');
    }

    let microJsonTruncated = microJson;
    try {
      const microParsed = JSON.parse(microJson);
      if (microParsed?.top_clusters && Array.isArray(microParsed.top_clusters)) {
        microParsed.top_clusters = microParsed.top_clusters.slice(0, 10);
        microJsonTruncated = JSON.stringify(microParsed);
      }
    } catch (e) {
      AppLogger.warn('Could not truncate microJson');
    }

    let prompt = COMPASS_INTELLIGENCE_PROMPTS.geoIntelligence;
    prompt = prompt.replace('{{compassContextJson}}', compassContextJson);
    prompt = prompt.replace('{{macroJson}}', macroJsonTruncated);
    prompt = prompt.replace('{{microJson}}', microJsonTruncated);

    AppLogger.info('Compass: generateGeoIntelligence starting');
    let response = await VertexHelper.generate(prompt);
    response = response.trim();
    if (response.startsWith('```json')) response = response.substring(7);
    else if (response.startsWith('```')) response = response.substring(3);
    if (response.endsWith('```')) response = response.substring(0, response.length - 3);
    return response.trim();
  }

  static async generateChannelIntelligence(
    compassContextJson: string,
    categories: string[]
  ): Promise<string> {
    const categoriesText = categories.join(', ');
    let prompt = COMPASS_INTELLIGENCE_PROMPTS.channelIntelligence;
    prompt = prompt.replace('{{compassContextJson}}', compassContextJson);
    prompt = prompt.replace('{{categoriesText}}', categoriesText);

    AppLogger.info('Compass: generateChannelIntelligence starting');
    let response = await VertexHelper.generate(prompt);
    response = response.trim();
    if (response.startsWith('```json')) response = response.substring(7);
    else if (response.startsWith('```')) response = response.substring(3);
    if (response.endsWith('```')) response = response.substring(0, response.length - 3);
    return response.trim();
  }

  static async generatePrioritization(compassContextJson: string): Promise<string> {
    let prompt = COMPASS_INTELLIGENCE_PROMPTS.prioritization;
    prompt = prompt.replace('{{compassContextJson}}', compassContextJson);

    AppLogger.info('Compass: generatePrioritization starting');
    let response = await VertexHelper.generate(prompt);
    response = response.trim();
    if (response.startsWith('```json')) response = response.substring(7);
    else if (response.startsWith('```')) response = response.substring(3);
    if (response.endsWith('```')) response = response.substring(0, response.length - 3);
    return response.trim();
  }
}
