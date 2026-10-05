/**
 * Tipos e interfaces compartidos del proyecto Vigenair.
 * Migrados desde ui/src/app/api-calls/api-calls.service.interface.ts
 * Se eliminó la dependencia de rxjs (Observable) ya que en el backend no se usa.
 */

/** Supported video aspect ratios. */
export type FormatType = '16:9' | '9:16' | '1:1' | '3:4' | '4:3';
/** Supported audio overlay types. */
export type OverlayType =
  | 'variant_start'
  | 'variant_end'
  | 'video_start'
  | 'video_end';
/** Supported ABCD business objective types. */
export type AbcdType = 'awareness' | 'consideration' | 'action' | 'shorts';
/** Represents an ABCD business objective configuration. */
export type AbcdBusinessObjective = {
  displayName: string;
  value: string;
  promptPart: string;
};
/** Map of ABCD business objectives. */
export type AbcdBusinessObjectives = Map<AbcdType, AbcdBusinessObjective>;

/** Brand and client configuration parameters for prompt personalization. */
export interface BrandParams {
  brandName: string;
  advertiserName?: string;
  country?: string;
  brandColor: string;
  brandColor2?: string;
  brandColor3?: string;
  communicationTone: string;
}

/** Settings for generating video variants. */
export interface GenerationSettings {
  prompt: string;
  evalPrompt: string;
  duration: number;
  demandGenAssets: boolean;
  shortenVideo: boolean;
  fullVideoAnalysis?: boolean;
  brandParams?: BrandParams;
  campaignContext?: any;
}

/** Represents an audio/video segment (frontend version). */
export interface AvSegment {
  av_segment_id: string;
  start_s: number;
  end_s: number;
  selected?: boolean;
  splitting?: boolean;
  played?: boolean;
  segment_screenshot_uri?: string;
  segment_uri?: string;
}

export interface AbcdInsightCard {
  hallazgo: string;
  valor: string;
  accion: string;
}

/** Response structure for variant generation. */
export interface GenerateVariantsResponse {
  combo_id: number;
  title: string;
  scenes: string[];
  av_segments: AvSegment[];
  description: string;
  score: number;
  abcd: {
    attention: AbcdInsightCard;
    branding: AbcdInsightCard;
    connection: AbcdInsightCard;
    direction: AbcdInsightCard;
  };
  abcd_dimensiones?: {
    attention_score: number;
    branding_score: number;
    connection_score: number;
    direction_score: number;
  };
  duration: string;
  variants?: VariantFormats;
  render_settings?: RenderSettings;
  images?: VariantImageAssets;
  texts?: VariantTextAsset[];
  original_format?: FormatType;
  strengths?: string[];
  weaknesses?: string[];
  insight_principal?: string;
  proyeccion_impacto?: string;
  formatos_wpp_sugeridos?: string[];
  creative_signals?: string[];
  elementos_visuales?: {
    producto?: string;
    branding?: string;
    messaging?: string;
  };
  scenes_and_moments?: {
    momentos_relevantes: string[];
    estructura_del_video: string;
    elementos_detectados: string[];
  };
}

export interface YoutubeIdeaItem {
  title: string;
  description: string;
  video_prompt?: string;
}

export interface GeoZoneIdea {
  title: string;
  description: string;
  video_prompt?: string;
}

export interface GeoZoneAudiencia {
  id_cluster: string;
  descripcion: string;
  coordenadas_asociadas: string[];
  sitios_aledanos: string[];
  perfil_audiencia_sugerido: string;
  ganchos_creativos_ctv: string[];
  ideas: GeoZoneIdea[];
}

export interface GeoKeyInsights {
  pais: string;
  ciudad: string;
  estrategia_geotargeting: string;
  zonas_de_audiencia: GeoZoneAudiencia[];
}

export interface YoutubeIdeasResponse {
  creative_services_script: string;
  wpp_open_prompt_json: any;
  relevant_frame_segment_indices: number[];
  insights: {
    ideas: YoutubeIdeaItem[];
    categoryIdeas?: Record<string, YoutubeIdeaItem[]>;
    geoKeyInsights?: GeoKeyInsights;
  };
}

export interface V2GeoDemografia {
  nombre: string;
  clasificacion: string;
  geo_keys_incluidas: number;
  audiencia_estimada: string;
}

export interface V2GeoCulturaLocal {
  perfil_consumidor: string;
  rutinas_intereses: string;
  vinculo_con_marca: string;
}

export interface V2GeoOportunidadCreativa {
  foco_del_problema: string;
  diagnostico_video_original: string;
  solucion_hiperlocal: string;
  formato_sugerido: string;
  elementos_de_adaptacion: string[];
}

export interface V2Territory {
  demografia: V2GeoDemografia;
  cultura_local: V2GeoCulturaLocal;
  oportunidades_creativas: V2GeoOportunidadCreativa[];
}

export interface V2GeoIntelligence {
  resumen_ejecutivo: string;
  territorios: V2Territory[];
}


export interface V2TestingFrameworkItem {
  recomendacion: string;
  variante: string;
  hipotesis: string;
  metricas_exito: string[];
}

export interface CompassAbcdDimensiones {
  attention_score: number;
  branding_score: number;
  connection_score: number;
  direction_score: number;
}

export interface CompassData {
  meta: {
    brand: string;
    campaign: string;
    country: string;
    objective: string;
    date: string;
    video_name: string;
    video_duration: string;
    video_url?: string | null;
    internal_ref: string;
  };
  contexto_campania: {
    nombre_campania: string;
    objetivo_campania: string;
    formato_asset: string;
    comentarios_asset: string;
    objetivo_negocio: string;
    audiencia: string;
    tono: string;
    descripcion: string;
    lineamientos_marca: string;
    consideraciones: string;
    contexto_mercado: string;
  };
  evaluacion_creativa: {
    score: number;
    score_max: number;
    score_label: string;
    abcd_dimensiones?: CompassAbcdDimensiones;
    abcd: {
      attention: AbcdInsightCard;
      branding: AbcdInsightCard;
      connection: AbcdInsightCard;
      direction: AbcdInsightCard;
      [key: string]: any;
    };
    strengths: string[];
    weaknesses: string[];
    formatos_wpp_sugeridos?: string[];
    descripcion: string;
    insight_principal?: string;
    proyeccion_impacto?: string;
    creative_signals?: string[];
    elementos_visuales?: {
      producto?: string;
      branding?: string;
      messaging?: string;
    };
    scenes_and_moments?: {
      momentos_relevantes: string[];
      estructura_del_video: string;
      elementos_detectados: string[];
    };
  } | null;
  geo_intelligence: V2GeoIntelligence | null;

  testing_framework: {
    testing_framework: V2TestingFrameworkItem[];
  } | null;
}

export interface PreviousRunsResponse {
  encodedUserId: string;
  runs: string[];
}

export interface RenderSettings {
  generate_image_assets: boolean;
  generate_text_assets: boolean;
  formats: FormatType[];
  use_music_overlay: boolean;
  use_continuous_audio: boolean;
  fade_out: boolean;
  overlay_type?: OverlayType;
  use_blanking_fill?: boolean;
}

export interface RenderQueue {
  queue: RenderQueueVariant[];
  queueName: string;
  previewAnalyses: Record<string, unknown>;
  sourceDimensions: { w: number; h: number };
}

export interface RenderQueueVariant {
  original_variant_id: number;
  av_segments: AvSegment[];
  title: string;
  description: string;
  score: number;
  abcd: {
    attention: AbcdInsightCard[];
    branding: AbcdInsightCard[];
    connection: AbcdInsightCard[];
    direction: AbcdInsightCard[];
  };
  render_settings: RenderSettings;
  duration: string;
  userSelection: boolean;
  scenes: string;
}

export interface EntityApproval {
  entity: string;
  approved: boolean;
}

export interface VariantFormats {
  '16:9'?: EntityApproval;
  '9:16'?: EntityApproval;
  '1:1'?: EntityApproval;
  '3:4'?: EntityApproval;
  '4:3'?: EntityApproval;
  [key: string]: EntityApproval | undefined;
}

export interface VariantImageAssets {
  '16:9'?: EntityApproval[];
  '9:16'?: EntityApproval[];
  '1:1'?: EntityApproval[];
  '3:4'?: EntityApproval[];
  '4:3'?: EntityApproval[];
  [key: string]: EntityApproval[] | undefined;
}

export interface VariantTextAsset {
  headline: string;
  description: string;
  approved?: boolean;
  editable?: boolean;
}

export interface RenderedVariant {
  variant_id: number;
  av_segments: Record<string, AvSegment>;
  title: string;
  description: string;
  score: number;
  abcd: {
    attention: string;
    branding: string;
    connection: string;
    direction: string;
  };
  variants?: VariantFormats;
  duration: string;
  scenes: string;
  render_settings: RenderSettings;
  images?: VariantImageAssets;
  texts?: VariantTextAsset[];
  original_format?: FormatType;
}

export interface GeneratePreviewsResponse {
  square?: string;
  vertical?: string;
  '16:9'?: string;
  '9:16'?: string;
  '1:1'?: string;
  '3:4'?: string;
  '4:3'?: string;
}

export interface PreviewWeights {
  text: number;
  face: number;
  objects: {
    person: number;
  };
}

export interface PreviewSettings {
  sourceDimensions: { w: number; h: number };
  weights: PreviewWeights;
}

export interface SegmentMarker {
  av_segment_id: string;
  marker_cut_time_s: number;
  canvas_position: number;
}
