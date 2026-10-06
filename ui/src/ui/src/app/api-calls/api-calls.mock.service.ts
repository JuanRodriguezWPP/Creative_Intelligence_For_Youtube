/**
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*       https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PreviewHelper } from '../../../../preview';
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

const HORIZONTAL_SAMPLE_FOLDER = 'horizontal.mp4--1234567890123--abcdef';
const COMBOS_FOLDER = 'Sample--1707812254000-combos';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService implements ApiCalls {
  constructor(
    private ngZone: NgZone,
    private httpClient: HttpClient
  ) { }

  async loadLocalFile(path: string) {
    const data = await lastValueFrom(
      this.httpClient.get(path, { responseType: 'text' })
    );
    return data;
  }
  loadPreviousRun(folder: string): string[] {
    return [`/assets/${folder}`, `/assets/${folder}/input.mp4`];
  }
  uploadVideo(
    file: Blob,
    analyseAudio: boolean,
    encodedUserId: string
  ): Observable<string[]> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          subscriber.next(this.loadPreviousRun(HORIZONTAL_SAMPLE_FOLDER));
          subscriber.complete();
        });
      }, 1000);
    });
  }
  deleteGcsFolder(folder: string): void { }
  getFromGcs(url: string): Observable<string> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(async () => {
          subscriber.next(await this.loadLocalFile(url));
          subscriber.complete();
        });
      }, 1000);
    });
  }
  generateVariants(
    gcsFolder: string,
    settings: GenerationSettings
  ): Observable<GenerateVariantsResponse[]> {
    console.log('[MOCK] generateVariants called — returning instant mock data');
    const mockData = [
      {
        "combo_id": 1,
        "title": "Die Welt neu entdecken",
        "description": "This combination merges the initial theme of connecting virtually with the desire to explore the world physically.",
        "duration": "0:35",
        "score": 5,
        "scenes": ["1", "2", "6"],
        "av_segments": [
          { "av_segment_id": "1", "end_s": 17, "start_s": 0, "segment_screenshot_uri": "/assets/horizontal.mp4--1234567890123--abcdef/av_segments_cuts/1.jpg" },
          { "start_s": 17.04, "av_segment_id": "2", "segment_screenshot_uri": "/assets/horizontal.mp4--1234567890123--abcdef/av_segments_cuts/2.jpg", "end_s": 26.4 },
          { "av_segment_id": "6", "segment_screenshot_uri": "/assets/horizontal.mp4--1234567890123--abcdef/av_segments_cuts/6.jpg", "end_s": 44.96, "start_s": 36.8 }
        ],
        "abcd": {
          "attention": ["Scene 1's series of fast video calls with different people immediately grabs attention."],
          "branding": ["The brand's name and logo appear in the last scene."],
          "connection": ["Scene 1 creates an immediate emotional connection with the audience."],
          "direction": ["Ends with a clear and compelling call to action."]
        },
        "abcd_dimensiones": {
          "attention_score": 85,
          "branding_score": 90,
          "connection_score": 75,
          "direction_score": 80
        },
        "strengths": ["Gancho inicial muy dinámico", "Marca visible en el cierre"],
        "weaknesses": ["La conexión emocional podría ser más fuerte"],
        "insight_principal": "El video tiene una estructura sólida y elementos diferenciales que pueden generar alto impacto si se optimiza la narrativa central."
      }
    ];
    return of(mockData as any);
  }
  generatePreviews(
    gcsFolder: string,
    analysis: any,
    segments: any,
    settings: PreviewSettings
  ): Observable<GeneratePreviewsResponse> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(async () => {
          const sourceDimensions = settings.sourceDimensions;
          const createPreview = (targetW: number, targetH: number) =>
            JSON.stringify(
              PreviewHelper.createPreview(
                segments,
                analysis,
                sourceDimensions,
                { w: targetW, h: targetH },
                settings.weights
              )
            );

          const h = sourceDimensions.h;

          const square = await this.loadLocalFile(`${gcsFolder}/square.json`);
          const vertical = await this.loadLocalFile(
            `${gcsFolder}/vertical.json`
          );

          subscriber.next({
            square,
            vertical,
            '1:1': createPreview(h, h),
            '9:16': createPreview(h * (9 / 16), h),
            '16:9': createPreview(h * (16 / 9), h),
            '3:4': createPreview(h * (3 / 4), h),
            '4:3': createPreview(h * (4 / 3), h),
          });
          subscriber.complete();
        });
      }, 1000);
    });
  }
  getRunsFromGcs(): Observable<PreviousRunsResponse> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          subscriber.next({
            runs: [HORIZONTAL_SAMPLE_FOLDER],
            encodedUserId: 'abcdef',
          });
          subscriber.complete();
        });
      }, 1000);
    });
  }
  getRendersFromGcs(gcsFolder: string): Observable<string[]> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          subscriber.next([COMBOS_FOLDER]);
          subscriber.complete();
        });
      }, 1000);
    });
  }
  renderVariants(
    gcsFolder: string,
    renderQueue: RenderQueue
  ): Observable<string> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          subscriber.next(`${gcsFolder}/${COMBOS_FOLDER}`);
          subscriber.complete();
        });
      }, 1000);
    });
  }
  getGcsFolderPath(folder: string): Observable<string> {
    return of(folder);
  }
  getWebAppUrl(): Observable<string> {
    return of('');
  }
  regenerateTextAsset(
    variantVideoPath: string,
    textAsset: VariantTextAsset,
    textAssetLanguage: string
  ): Observable<VariantTextAsset> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          subscriber.next({
            headline: `NEW - ${textAsset.headline}`,
            description: `NEW - ${textAsset.description}`,
            approved: true,
            editable: false,
          });
          subscriber.complete();
        });
      }, 1000);
    });
  }
  storeApprovalStatus(
    gcsFolder: string,
    combos: RenderedVariant[]
  ): Observable<boolean> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          subscriber.next(true);
          subscriber.complete();
        });
      }, 1000);
    });
  }
  getVideoLanguage(gcsFolder: string): Observable<string> {
    return new Observable(subscriber => {
      this.ngZone.run(() => {
        subscriber.next('German');
        subscriber.complete();
      });
    });
  }
  generateTextAssets(
    variantVideoPath: string,
    textAssetsLanguage: string
  ): Observable<VariantTextAsset[]> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          const textAssets = [];
          for (let i = 0; i < 5; i++) {
            textAssets.push({
              headline: `NEW headline ${i + 1} in ${textAssetsLanguage}.`,
              description: `NEW description ${i + 1} in ${textAssetsLanguage}`,
              approved: true,
              editable: false,
            });
          }
          subscriber.next(textAssets);
          subscriber.complete();
        });
      }, 1000);
    });
  }
  splitSegment(
    gcsFolder: string,
    segmentMarkers: SegmentMarker[]
  ): Observable<string> {
    return new Observable(subscriber => {
      setTimeout(() => {
        this.ngZone.run(() => {
          subscriber.next('split complete');
          subscriber.complete();
        });
      }, 1000);
    });
  }
  updateTranscription(
    gcsFolder: string,
    transcriptionText: string
  ): Observable<boolean> {
    return of(true);
  }
  generateYoutubeIdeas(
    gcsFolder: string,
    abcdType: string,
    customPoints: string,
    mode: string,
    selectedValue: string,
    selectedCategories?: string[]
  ): Observable<string> {
    // ── CATEGORY mode ────────────────────────────────────────────────────────
    const categoryIdeas: Record<string, Array<{ title: string; description: string; video_prompt: string }>> = {};
    const cats = selectedCategories && selectedCategories.length > 0 ? selectedCategories : [];

    for (const cat of cats) {
      categoryIdeas[cat] = [
        {
          title: `${cat} — Gancho Emocional`,
          description: `Abre con un dilema o pregunta inesperada relacionada con "${cat}". Los primeros 3 segundos deben sorprender al espectador para maximizar la retención en la categoría.`,
          video_prompt: `[0:00-0:02] Apertura impactante: plano detalle que genere curiosidad en el universo "${cat}". Sin texto, solo imagen y sonido ambiente. [0:02-0:08] Desarrollo: presenta el producto/servicio como la solución natural. Paleta de colores acorde a marca, tipografía sans-serif bold. [0:08-0:12] Super con copy emocional: máximo 5 palabras. [0:12-0:15] Logo + CTA animado. Música: ritmo medio-alto, sin letra. Formato: 15s pre-roll skippable.`
        },
        {
          title: `${cat} — Demostración de Valor`,
          description: `Muestra el producto o servicio en acción dentro del contexto de "${cat}". Usa comparativas antes/después o testimonios breves de usuarios reales para generar confianza rápidamente.`,
          video_prompt: `[0:00-0:03] Cold open con toma "antes": problema claro y reconocible para audiencia de "${cat}". [0:03-0:18] Demostración visual del producto resolviendo el problema. Usa split-screen si aplica. Texto superpuesto con datos clave (%, precio, velocidad). [0:18-0:25] Testimonio de 3 segundos (corte rápido a cámara). [0:25-0:30] Logo + CTA + URL. Paleta: neutros con acento en color primario de marca. Formato: 30s mid-roll.`
        },
        {
          title: `${cat} — Llamado a la Acción Optimizado`,
          description: `Cierra con un CTA específico y directo para la audiencia de "${cat}". El copy debe reforzar el beneficio principal y usar un lenguaje acorde al tono de esta categoría en YouTube.`,
          video_prompt: `[0:00-0:02] Plano de producto con movimiento de cámara (dolly-in). Música de crescendo. [0:02-0:05] Beneficio principal en 3 palabras sobre pantalla completa. Color de fondo: primario de marca. [0:05-0:06] Logo full-frame con tagline. CTA verbal en off: frase de urgencia o exclusividad. Texto inferior: URL o código QR. Formato: 6s bumper no-skippable. Alta energía.`
        }
      ];
    }

    // ── GEOKEY mode ──────────────────────────────────────────────────────────
    let geoKeyInsights = undefined;
    if (mode === 'geokey' && selectedValue && selectedValue.trim()) {
      const coordMatches = selectedValue.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/g) || [];
      const half = Math.ceil(coordMatches.length / 2);
      const cluster1Coords = coordMatches.slice(0, half);
      const cluster2Coords = coordMatches.slice(half);

      geoKeyInsights = {
        pais: 'México',
        ciudad: 'Ciudad de México',
        estrategia_geotargeting: 'Anuncios CTV Personalizados CDMX',
        zonas_de_audiencia: [
          {
            id_cluster: 'zona_sur_residencial',
            descripcion: 'Zona Sur Residencial (San Jerónimo, Pedregal, San Ángel)',
            coordenadas_asociadas: cluster1Coords,
            sitios_aledanos: ['Jardines del Pedregal', 'San Jerónimo Lídice', 'San Ángel', 'ARTZ Pedregal'],
            perfil_audiencia_sugerido: 'Familias consolidadas, NSE AB/C+. Buscan estilo de vida residencial, exclusividad y alta conveniencia comercial.',
            ganchos_creativos_ctv: [
              'Evocar la tranquilidad del sur o el tráfico en Periférico Sur.',
              'Mostrar estética de casas con jardines de roca volcánica y calles empedradas.'
            ],
            ideas: [
              {
                title: 'Tradición & Exclusividad',
                description: 'Abre con un plano de Avenida San Ángel al atardecer. Mensaje: la calidad que tu familia merece, sin sacrificar la conveniencia.',
                video_prompt: `[0:00-0:02] Toma aérea de Av. San Ángel al atardecer, luz cálida dorada. Sin texto. [0:02-0:08] Familia en exterior de casa estilo mexicano contemporáneo, zona Pedregal. Producto integrado naturalmente. [0:08-0:12] Super: "La calidad que el sur merece" — tipografía serif, color crema sobre oscuro. [0:12-0:15] Logo + dirección sucursal ARTZ Pedregal + CTA: "Visítanos hoy". Música: cuerdas instrumentales elegantes. Formato: 15s pre-roll. Paleta: tierra, verde oscuro, dorado.`
              }
            ]
          },
          {
            id_cluster: 'zona_corporativa_norte',
            descripcion: 'Zona Corporativa Norte (Polanco, Granada, Nuevo Polanco)',
            coordenadas_asociadas: cluster2Coords,
            sitios_aledanos: ['Museo Soumaya', 'Antara Fashion Hall', 'Bosque de Chapultepec', 'Avenida Masaryk'],
            perfil_audiencia_sugerido: 'Ejecutivos, DINKs y expatriados, NSE AB. Cosmopolitas, orientados a tendencias y experiencias premium.',
            ganchos_creativos_ctv: [
              'Referencia al "after-office en Polanquito" o "fin de semana en Antara".',
              'Estética minimalista: cristal, metal, arquitectura de vanguardia.'
            ],
            ideas: [
              {
                title: 'El Ritmo de Polanco',
                description: 'Imágenes del corredor Masaryk al mediodía, ejecutivos caminando. 3 segundos de producto en uso natural.',
                video_prompt: `[0:00-0:02] Time-lapse de Av. Masaryk a mediodía, movimiento fluido de personas. Estética cinematográfica, tono fríos azulados. [0:02-0:08] Ejecutivo 30-40 años usando el producto de manera orgánica (café en mano, tablet). [0:08-0:12] Super minimalista: "Para quienes mueven el mundo" — tipografía thin, blanco sobre negro. [0:12-0:15] Logo con animación de entrada elegante + oferta corporativa. Música: electrónica ambient de bajo perfil. Formato: 15s pre-roll.`
              }
            ]
          }
        ]
      };
    }

    // ── Build final mock JSON ────────────────────────────────────────────────
    const modeLabel = mode === 'category'
      ? `categoría(s): "${selectedValue}"`
      : mode === 'geokey'
        ? `coordenadas geo proporcionadas`
        : 'ideación general';

    const mockJson = {
      creative_services_script: `Título: La Solución Definitiva — Optimizado para ${modeLabel}\n\n[0:00 - 0:05] Escena 1 (Segmento 0): Primer plano cerrado del logo.\n[0:05 - 0:15] Escena 2 (Segmento 1): Demostración del producto.\n[0:15 - 0:25] Escena 3: Llamado a la acción.`,
      wpp_open_prompt_json: {
        role: 'Ingeniero de Prompts Avanzado',
        objective: `Generar copy optimizado para ${modeLabel}.`,
        brand_context: 'Tono lúdico, moderno y atractivo.',
        target_audience: 'Gen Z y Millennials interesados en trucos rápidos.',
        visual_cues: 'Colores vibrantes, transiciones rápidas, tipografía clara.',
        expected_deliverables: '3 guiones por zona seleccionada.'
      },
      relevant_frame_segment_indices: [0, 1],
      insights: {
        ideas: cats.length > 0
          ? cats.flatMap(cat => categoryIdeas[cat])
          : geoKeyInsights
            ? []
            : [
              {
                title: 'Idea General 1 — Gancho de Impacto',
                description: 'El gancho principal debe presentar el problema en los primeros 3 segundos con una imagen sorpresiva.',
                video_prompt: '[0:00-0:03] Cold open: imagen impactante sin texto, solo música. [0:03-0:10] Presentación del producto con copy de beneficio principal. [0:10-0:14] Testimonio corto o dato estadístico en pantalla. [0:14-0:15] Logo + CTA. Formato: 15s pre-roll.'
              },
              {
                title: 'Idea General 2 — Demostración Narrativa',
                description: `Contenido diseñado para ${modeLabel}. Adaptar el tono y ángulos creativos para resonar con la audiencia.`,
                video_prompt: '[0:00-0:05] Escena problema: situación cotidiana que el producto resuelve. [0:05-0:20] Demostración natural del producto, tomas variadas. Texto superpuesto con beneficios clave. [0:20-0:28] Momento de satisfacción del personaje. [0:28-0:30] Logo + URL + CTA de urgencia. Formato: 30s mid-roll.'
              },
              {
                title: 'Idea General 3 — CTA Directo',
                description: 'Cierra con un CTA directo y memorable que refuerce el beneficio principal.',
                video_prompt: '[0:00-0:02] Plano de producto sobre color sólido (primario de marca). Animación de entrada. [0:02-0:05] Beneficio en 3 palabras, tipografía bold sobre el color. [0:05-0:06] Logo + CTA verbal + URL. Formato: 6s bumper. Sin voz en off — solo música y texto.'
              }
            ],
        categoryIdeas: cats.length > 0 ? categoryIdeas : undefined,
        geoKeyInsights: geoKeyInsights
      }
    };

    return of(JSON.stringify(mockJson)).pipe(delay(2000));
  }

  sendInsightsReport(payload: object): Observable<string> {
    return new Observable<string>(subscriber => {
      setTimeout(() => {
        subscriber.next(JSON.stringify({
          success: true,
          report_url: 'https://cdn.nexus-creative-solutions.com/LATAM/applications/vigen-insights/report.php?id=MOCK_REPORT_123'
        }));
        subscriber.complete();
      }, 1500);
    });
  }

  generateGeoIntelligence(
    compassContextJson: string,
    macroJson: string,
    microJson: string
  ): Observable<string> {
    return new Observable<string>(subscriber => {
      setTimeout(() => {
        subscriber.next(JSON.stringify({
          resumen_ejecutivo: "El video construye una narrativa de alivio y bienestar desde situaciones cotidianas, con un tono cercano y optimista. En el contexto de activación definido, esta propuesta adquiere distintos matices de relevancia al conectarla con las rutinas de movilidad y consumo de cada territorio.",
          datos_clave: [
            { icono: "bar_chart", valor: "88%", titulo: "Conectividad urbana", subtitulo: "Acceso móvil constante" },
            { icono: "commute", valor: "3.8h", titulo: "Movilidad diaria", subtitulo: "Tiempo en transporte" },
            { icono: "devices", valor: "72%", titulo: "Consumo multipantalla", subtitulo: "CTV + Móvil simultáneo" }
          ],
          territorios: [
            {
              territorio_id: "T01",
              nombre: "Ciudad de México - Cuauhtémoc",
              resumen: "Zona de alta densidad urbana y movilidad continua con consumidores que priorizan soluciones rápidas y prácticas durante sus traslados.",
              caracteristicas_clave: [
                { icono: "location_city", titulo: "Densidad urbana", descripcion: "Alta concentración de actividad laboral y comercial" },
                { icono: "commute", titulo: "Movilidad intensa", descripcion: "Desplazamientos recurrentes en transporte y vía pública" },
                { icono: "devices", titulo: "Conexión digital", descripcion: "Consumo de video en múltiples pantallas a lo largo del día" },
                { icono: "directions_run", titulo: "Rutinas activas", descripcion: "Búsqueda constante de conveniencia y bienestar práctico" }
              ],
              indicadores_cualitativos: [
                { etiqueta: "Movilidad urbana", nivel: 5 },
                { etiqueta: "Sensibilidad a conveniencia", nivel: 4 },
                { etiqueta: "Adopción digital", nivel: 5 }
              ],
              temas_mapa: ["Movilidad", "Bienestar Urbano"],
              oportunidades: [
                {
                  id: "Oportunidad-01",
                  titulo: "Conexión con rutinas urbanas matutinas",
                  descripcion: "Alinear el mensaje de bienestar con el inicio de la jornada laboral y desplazamientos diarios.",
                  relevancia: "Alta",
                  hallazgo: "El producto se introduce en un contexto cotidiano pero la marca tarda en consolidar su llamado.",
                  evidencia: {
                    descripcion: "Escena de inicio con preparación matutina",
                    timestamp_s: 4,
                    tags: ["Rutina", "Inicio"]
                  },
                  insight: "En CDMX la atención compite con desplazamientos rápidos; se requiere claridad visual inmediata.",
                  oportunidad: "Incorporar una barra persistente con llamado a la acción enfocado en conveniencia y disponibilidad inmediata."
                },
                {
                  id: "Oportunidad-02",
                  titulo: "Activación omnicanal en puntos de conveniencia",
                  descripcion: "Facilitar la conversión y ubicación de producto en farmacias y tiendas locales en zonas de tránsito.",
                  relevancia: "Media",
                  hallazgo: "El cierre no ofrece un canal inmediato de compra o consulta rápida.",
                  evidencia: {
                    descripcion: "Cierre del video con imagen de producto",
                    timestamp_s: 26,
                    tags: ["Cierre", "Packshot"]
                  },
                  insight: "Los usuarios urbanos valoran la activación rápida vía móvil durante su trayecto.",
                  oportunidad: "Agregar código QR interactivo para compra inmediata o geolocalización de tiendas cercanas."
                }
              ],
              adaptaciones: [
                {
                  oportunidad_id: "Oportunidad-01",
                  tipo: "ADAPT",
                  intervencion: "personalize",
                  titulo: "Barra de conveniencia matutina",
                  descripcion: "Intervención con Branded Bar destacando beneficios inmediatos durante horarios de transporte.",
                  formato: "branded_bar",
                  ideal_para: ["Atención", "Branding"]
                },
                {
                  oportunidad_id: "Oportunidad-02",
                  tipo: "EXPLORE",
                  intervencion: "amplify",
                  titulo: "Activador QR de farmacias cercanas",
                  descripcion: "Overlay QR interactivo al cierre vinculado a geolocalización en CDMX.",
                  formato: "qr_code",
                  ideal_para: ["Dirección", "Conversión"]
                }
              ]
            },
            {
              territorio_id: "T02",
              nombre: "Guadalajara - Zapopan",
              resumen: "Hub metropolitano con alta adopción digital y balance entre vida familiar y laboral, con fuerte afinidad por productos de salud y bienestar integral.",
              caracteristicas_clave: [
                { icono: "groups", titulo: "Enfoque familiar", descripcion: "Decisiones de compra orientadas al bienestar del hogar" },
                { icono: "devices", titulo: "Alta digitalización", descripcion: "Uso intensivo de plataformas de streaming y YouTube en CTV" },
                { icono: "favorite", titulo: "Estilo de vida saludable", descripcion: "Creciente interés en prevención y autocuidado" },
                { icono: "location_city", titulo: "Comercio de proximidad", descripcion: "Preferencia por canales locales y supermercados modernos" }
              ],
              indicadores_cualitativos: [
                { etiqueta: "Consumo CTV", nivel: 5 },
                { etiqueta: "Afinidad a salud", nivel: 4 },
                { etiqueta: "Interacción digital", nivel: 4 }
              ],
              temas_mapa: ["Bienestar Familiar", "Hogar Conectado"],
              oportunidades: [
                {
                  id: "Oportunidad-03",
                  titulo: "Enfoque en bienestar compartido para el hogar",
                  descripcion: "Amplificar los beneficios de alivio en contextos de descanso y convivencia en el hogar.",
                  relevancia: "Alta",
                  hallazgo: "La narrativa se centra en un individuo pero puede conectar con el entorno familiar.",
                  evidencia: {
                    descripcion: "Escena de resolución en espacio doméstico",
                    timestamp_s: 15,
                    tags: ["Hogar", "Resolución"]
                  },
                  insight: "En Guadalajara el consumo en CTV reúne audiencias familiares buscando soluciones confiables.",
                  oportunidad: "Reforzar la tarjeta final con mensajes dirigidos a la protección y cuidado familiar."
                }
              ],
              adaptaciones: [
                {
                  oportunidad_id: "Oportunidad-03",
                  tipo: "ADAPT",
                  intervencion: "personalize",
                  titulo: "Video Card Bienestar Familiar",
                  descripcion: "Adaptación con Video Card destacando la tranquilidad en el hogar.",
                  formato: "video_card",
                  ideal_para: ["Conexión", "Branding"]
                }
              ]
            }
          ],
          testing_framework: [
            {
              recomendacion: "Testear variante con Branded Bar matutino vs Asset Original para medir impacto en Ad Recall en CDMX.",
              variante: "Asset Original vs Branded Bar CDMX",
              hipotesis: "La presencia temprana de marca y beneficios urbanos elevará la retención en los primeros 5 segundos en un 15%.",
              metricas_exito: ["Ad Recall", "VTR", "Attention Score"],
              territorio: "T01",
              adaptationType: "ADAPT",
              formato: "branded_bar"
            },
            {
              recomendacion: "Evaluar QR interactivo de geolocalización al cierre vs llamada tradicional a la acción.",
              variante: "Asset Original vs QR Code Proximidad",
              hipotesis: "El facilitador de acción directa incrementará el CTR en dispositivos móviles y Connected TV.",
              metricas_exito: ["CTR", "Direction Score", "Engagement Rate"],
              territorio: "T01",
              adaptationType: "EXPLORE",
              formato: "qr_code"
            }
          ]
        }));
        subscriber.complete();
      }, 1000);
    });
  }

  generateChannelIntelligence(
    compassContextJson: string,
    categories: string[]
  ): Observable<string> {
    return new Observable<string>(subscriber => {
      setTimeout(() => {
        subscriber.next(JSON.stringify([{
          dimension: "In-Market",
          audiencia_especifica: "Amantes de los viajes",
          afinidad: "Alta",
          insights: ["Insight 1 relacionado a viajes"],
          evidencias: ["Evidencia 1"],
          recomendaciones: ["Recomendación 1"],
          ideacion_adaptacion: ["Adaptar el inicio con un gancho tecnológico", "Usar jerga de la categoría"]
        }]));
        subscriber.complete();
      }, 1000);
    });
  }

  generatePrioritization(compassContextJson: string): Observable<string> {
    return new Observable<string>(subscriber => {
      setTimeout(() => {
        subscriber.next(JSON.stringify({
          testing_framework: [{
            id: 'territory-cdmx-01',
            recomendacion: 'Adaptar el mensaje para conectar con rutinas urbanas y estilos de vida activos.',
            original: {
              url: 'assets/formats/original_creative.png',
              type: 'image',
              alt: 'Creatividad original de Granedoin'
            },
            variant: {
              url: 'assets/formats/variante_cdmx.png',
              type: 'image',
              alt: 'Adaptación territorial para Ciudad de México'
            },
            variant_label: 'Variante CDMX',
            hipotesis: 'La adaptación territorial aumentará la relevancia del mensaje y la intención de consideración en CDMX.',
            metricas_exito: [
              'Brand Lift',
              'Consideración de marca',
              'VTR (Video Completion Rate)',
              'Ad Recall',
              'Intent to Purchase'
            ],
            territorio: 'Ciudad de México + Área Metropolitana',
            adaptation_type: 'ADAPT',
            status: 'pending_measurement'
          }]
        }));
        subscriber.complete();
      }, 1000);
    });
  }
}


