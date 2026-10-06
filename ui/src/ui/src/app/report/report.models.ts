export type AdaptationType = 'KEEP' | 'EXPLORE' | 'ADAPT';

export type PreviewType = 'image' | 'gif' | 'video';

export type CreativeFormatId = 'branded_bar' | 'video_card' | 'canvas' | 'qr_code';

export interface PreviewAsset {
  url: string;
  type: PreviewType;
  alt: string;
  posterUrl?: string;
}

export interface CreativeFormatDefinition {
  id: CreativeFormatId;
  name: string;
  description: string;
  defaultPreviewUrl: string;
  idealFor: string[];
  capabilities?: string[];
}

export const CREATIVE_FORMATS_CATALOG: Record<CreativeFormatId, CreativeFormatDefinition> = {
  branded_bar: {
    id: 'branded_bar',
    name: 'Branded Bar',
    description: 'Barra lateral o inferior con branding persistente, llamada a la acción y elementos de marca.',
    defaultPreviewUrl: 'assets/formats/Formats Gifs/BrandedBar.gif',
    idealFor: ['Branding', 'CTA Claro', 'Consideración'],
    capabilities: ['personalize', 'amplify'],
  },
  video_card: {
    id: 'video_card',
    name: 'Video Card',
    description: 'Tarjeta de video interactiva o complementaria para destacar mensajes clave y beneficios.',
    defaultPreviewUrl: 'assets/formats/Formats Gifs/VideoCard.gif',
    idealFor: ['Educación de Producto', 'Storytelling', 'Engagement'],
    capabilities: ['personalize', 'amplify'],
  },
  canvas: {
    id: 'canvas',
    name: 'Canvas',
    description: 'Lienzo creativo ampliado para enriquecer la experiencia visual del anuncio.',
    defaultPreviewUrl: 'assets/formats/Formats Gifs/Canvas.gif',
    idealFor: ['Exploración', 'Impacto Visual', 'Inmersión'],
    capabilities: ['amplify'],
  },
  qr_code: {
    id: 'qr_code',
    name: 'QR Code',
    description: 'Código QR dinámico e interactivo para conectar la experiencia de video con conversión o activación móvil.',
    defaultPreviewUrl: 'assets/formats/Formats Gifs/QR_Code.gif',
    idealFor: ['Conversión Directa', 'Conexión Omnicanal', 'Activación'],
    capabilities: ['personalize'],
  },
};

export interface CreativeServiceFormat {
  id: CreativeFormatId | string;
  name: string;
  description: string;
  preview: PreviewAsset;
  idealFor: string[];
  relatedOpportunityType?: AdaptationType;
  available: boolean;
  capabilities?: string[];
}

export interface CreativeServicesSection {
  title: string;
  subtitle: string;
  description: string;
  formats: CreativeServiceFormat[];
}

export type TestingStatus = 'ready' | 'pending_measurement';

export interface IllustrativeVariant {
  label: string;
  preview: PreviewAsset;
  isMockup: true;
  interventionType?: 'personalize' | 'amplify';
}

export interface TestingFrameworkItem {
  id: string;
  recommendation: string;
  original: PreviewAsset;
  variant: PreviewAsset;
  variantLabel: string;
  illustrativeVariant?: IllustrativeVariant;
  hypothesis: string;
  successMetrics: string[];
  territory?: string;
  adaptationType?: AdaptationType;
  status: TestingStatus;
}

export interface TestingFrameworkSection {
  tests: TestingFrameworkItem[];
}

export type ReportSectionState =
  | 'loading'
  | 'ready'
  | 'incomplete'
  | 'empty'
  | 'error'
  | 'mock';

export type ReportDataSource = 'api' | 'mock' | 'none';

export interface ValidationResult<T> {
  valid: boolean;
  empty: boolean;
  data?: T;
  issues: string[];
}

export interface ReportSectionViewModel<T> {
  state: ReportSectionState;
  source: ReportDataSource;
  data: T | null;
  issues: string[];
}

export interface RawCreativeServiceFormat {
  id?: unknown;
  name?: unknown;
  description?: unknown;
  preview?: unknown;
  previewUrl?: unknown;
  previewType?: unknown;
  previewAlt?: unknown;
  idealFor?: unknown;
  relatedOpportunityType?: unknown;
  available?: unknown;
  capabilities?: unknown;
}

export interface RawCreativeServicesSection {
  title?: unknown;
  subtitle?: unknown;
  description?: unknown;
  formats?: unknown;
}

export interface RawTestingFrameworkItem {
  id?: unknown;
  recomendacion?: unknown;
  recommendation?: unknown;
  variante?: unknown;
  variant?: unknown;
  variantLabel?: unknown;
  variant_label?: unknown;
  original?: unknown;
  originalPreviewUrl?: unknown;
  original_preview_url?: unknown;
  variantPreviewUrl?: unknown;
  variant_preview_url?: unknown;
  illustrativeVariant?: unknown;
  illustrative_variant?: unknown;
  is_mockup?: unknown;
  intervention_type?: unknown;
  hipotesis?: unknown;
  hypothesis?: unknown;
  metricas_exito?: unknown;
  successMetrics?: unknown;
  success_metrics?: unknown;
  territorio?: unknown;
  territory?: unknown;
  adaptationType?: unknown;
  adaptation_type?: unknown;
  status?: unknown;
}
