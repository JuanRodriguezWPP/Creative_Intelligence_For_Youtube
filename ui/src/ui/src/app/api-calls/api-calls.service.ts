import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CONFIG } from '../../../../config';
import { StringUtil } from '../../../../string-util';
import {
  ApiCalls,
  GeneratePreviewsResponse,
  GenerateVariantsResponse,
  GenerationSettings,
  PreviewSettings,
  PreviousRunsResponse,
  RenderedVariant,
  RenderQueue,
  SegmentMarker,
  VariantTextAsset,
} from './api-calls.service.interface';

// En producción (Cloud Run), Angular y Express comparten el mismo dominio
// y la URL es relativa. En desarrollo local apunta a localhost:3000.
const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? '/api'
  : 'http://localhost:3000/api';


@Injectable({
  providedIn: 'root',
})
export class ApiCallsService implements ApiCalls {
  constructor(private httpClient: HttpClient) { }

  loadPreviousRun(folder: string): string[] {
    return [
      folder,
      `${CONFIG.cloudStorage.authenticatedEndpointBase}/${CONFIG.cloudStorage.bucket}/${encodeURIComponent(folder)}/input.mp4`,
    ];
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ELIMINADO EL MANEJO DE TOKENS. Auth es manejado por el backend Node.js
  // (Mantenido el método solo para cumplir con la interfaz original de TypeScript)
  // ─────────────────────────────────────────────────────────────────────────────
  getUserAuthToken(): Observable<string> {
    return of('dummy-token-no-longer-used');
  }

  // Convierte el archivo a base64 para enviarlo al backend
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  }

  uploadVideo(
    file: File,
    analyseAudio: boolean,
    encodedUserId: string,
    filename?: string,
    contentType?: string
  ): Observable<string[]> {
    return new Observable<string[]>(subscriber => {
      this.fileToBase64(file)
        .then(base64 => {
          const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'mp4';
          const actualFilename = filename || `input.${fileExtension}`;
          const actualContentType = contentType || file.type || 'video/mp4';

          const videoFolderTranscriptionSuffix = CONFIG.defaultTranscriptionService.charAt(0);
          const sanitisedFileName = StringUtil.gcsSanitise(file.name);
          const folder = `${sanitisedFileName}${CONFIG.videoFolderNameSeparator}${analyseAudio ? videoFolderTranscriptionSuffix : CONFIG.videoFolderNoAudioSuffix}${CONFIG.videoFolderNameSeparator}${Date.now()}${CONFIG.videoFolderNameSeparator}${encodedUserId}`;

          const payload = {
            base64Content: base64,
            folder: folder,
            filename: actualFilename,
            contentType: actualContentType,
          };

          this.httpClient
            .post<{ success: boolean; path: string }>(`${API_BASE_URL}/upload`, payload)
            .subscribe({
              next: () => {
                const finalFilename = fileExtension === 'mov' ? 'input.mp4' : actualFilename;
                const videoFilePath = `${CONFIG.cloudStorage.authenticatedEndpointBase}/${CONFIG.cloudStorage.bucket}/${encodeURIComponent(folder)}/${finalFilename}`;

                if (fileExtension === 'mov') {
                  subscriber.next([folder, videoFilePath, 'converting']);
                } else {
                  subscriber.next([folder, videoFilePath]);
                }
                subscriber.complete();
              },
              error: err => subscriber.error(err),
            });
        })
        .catch(err => subscriber.error(err));
    });
  }

  waitForConvertedVideo(folder: string): Observable<string> {
    const videoUrl = `${CONFIG.cloudStorage.authenticatedEndpointBase}/${CONFIG.cloudStorage.bucket}/${encodeURIComponent(folder)}/input.mp4`;
    return of(videoUrl);
  }

  deleteGcsFolder(folder: string): void {
    this.httpClient.delete(`${API_BASE_URL}/folder/${encodeURIComponent(folder)}`).subscribe({
      error: e => console.error('Failed to delete folder', e),
    });
  }

  getFromGcs(url: string, retryDelay = 0, maxRetries = 0): Observable<string> {
    return this.httpClient.get(`${API_BASE_URL}/gcs-file?path=${encodeURIComponent(url)}`, {
      responseType: 'text',
    });
  }

  generateVariants(
    gcsFolder: string,
    settings: GenerationSettings
  ): Observable<GenerateVariantsResponse[]> {
    return this.httpClient.post<GenerateVariantsResponse[]>(`${API_BASE_URL}/generate-variants`, {
      gcsFolder,
      settings,
    });
  }

  generatePreviews(
    gcsFolder: string,
    analysis: any,
    segments: any,
    settings: PreviewSettings
  ): Observable<GeneratePreviewsResponse> {
    return this.httpClient.post<GeneratePreviewsResponse>(`${API_BASE_URL}/generate-previews`, {
      gcsFolder,
      analysis,
      segments,
      settings,
    });
  }

  getRunsFromGcs(): Observable<PreviousRunsResponse> {
    return this.httpClient.get<PreviousRunsResponse>(`${API_BASE_URL}/runs`);
  }

  getRendersFromGcs(gcsFolder: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${API_BASE_URL}/renders/${encodeURIComponent(gcsFolder)}`);
  }

  renderVariants(gcsFolder: string, renderQueue: RenderQueue): Observable<string> {
    return this.httpClient
      .post<{ folder: string }>(`${API_BASE_URL}/render-variants`, { gcsFolder, renderQueue })
      .pipe(map(res => res.folder));
  }

  getGcsFolderPath(folder: string): Observable<string> {
    return of(
      `${CONFIG.cloudStorage.browsingEndpointBase}/${CONFIG.cloudStorage.bucket}/${encodeURIComponent(folder)}`
    );
  }

  getWebAppUrl(): Observable<string> {
    return this.httpClient
      .get<{ url: string }>(`${API_BASE_URL}/web-app-url`)
      .pipe(map(res => res.url));
  }

  regenerateTextAsset(
    variantVideoPath: string,
    textAsset: VariantTextAsset,
    textAssetLanguage: string
  ): Observable<VariantTextAsset> {
    return this.httpClient.post<VariantTextAsset>(`${API_BASE_URL}/regenerate-text-asset`, {
      variantVideoPath,
      textAsset,
      textAssetLanguage,
    });
  }

  storeApprovalStatus(folder: string, combos: RenderedVariant[]): Observable<boolean> {
    return this.httpClient
      .post<{ success: boolean }>(`${API_BASE_URL}/store-approval`, { gcsFolder: folder, combos })
      .pipe(map(res => res.success));
  }

  getVideoLanguage(gcsFolder: string): Observable<string> {
    return this.httpClient
      .get<{ language: string }>(`${API_BASE_URL}/video-language/${encodeURIComponent(gcsFolder)}`)
      .pipe(map(res => res.language));
  }

  generateTextAssets(
    variantVideoPath: string,
    textAssetsLanguage: string
  ): Observable<VariantTextAsset[]> {
    return this.httpClient.post<VariantTextAsset[]>(`${API_BASE_URL}/generate-text-assets`, {
      variantVideoPath,
      textAssetsLanguage,
    });
  }

  splitSegment(gcsFolder: string, segmentMarkers: SegmentMarker[]): Observable<string> {
    return this.httpClient
      .post<{ segmentId: string }>(`${API_BASE_URL}/split-segment`, { gcsFolder, segmentMarkers })
      .pipe(map(res => res.segmentId));
  }

  updateTranscription(gcsFolder: string, transcriptionText: string): Observable<boolean> {
    return this.httpClient
      .post<{ success: boolean }>(`${API_BASE_URL}/update-transcription`, {
        gcsFolder,
        transcriptionText,
      })
      .pipe(map(res => res.success));
  }

  sendInsightsReport(payload: object): Observable<string> {
    // Retornar éxito por defecto, en Apps Script esto enviaba un email
    return of('Success');
  }

  generateYoutubeIdeas(
    gcsFolder: string,
    abcdType: string,
    customPoints: string,
    mode: string,
    selectedValue: string,
    selectedCategories?: string[],
    macroJson?: string,
    microJson?: string
  ): Observable<string> {
    const body = {
      gcsFolder,
      abcdType,
      customPoints,
      mode,
      selectedValue,
      selectedCategories,
      macroJson,
      microJson,
    };
    return this.httpClient
      .post<{ result: string }>(`${API_BASE_URL}/youtube-ideas`, body)
      .pipe(map(res => res.result));
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // COMPASS PIPELINE METHODS
  // ─────────────────────────────────────────────────────────────────────────────

  generateGeoIntelligence(
    compassContextJson: string,
    macroJson: string,
    microJson: string
  ): Observable<string> {
    return this.httpClient
      .post<{ result: string }>(`${API_BASE_URL}/compass/geo-intelligence`, {
        compassContextJson,
        macroJson,
        microJson,
      })
      .pipe(map(res => res.result));
  }

  generateChannelIntelligence(
    compassContextJson: string,
    categories: string[]
  ): Observable<string> {
    return this.httpClient
      .post<{ result: string }>(`${API_BASE_URL}/compass/channel-intelligence`, {
        compassContextJson,
        categories,
      })
      .pipe(map(res => res.result));
  }

  generatePrioritization(compassContextJson: string): Observable<string> {
    return this.httpClient
      .post<{ result: string }>(`${API_BASE_URL}/compass/prioritization`, { compassContextJson })
      .pipe(map(res => res.result));
  }
}
