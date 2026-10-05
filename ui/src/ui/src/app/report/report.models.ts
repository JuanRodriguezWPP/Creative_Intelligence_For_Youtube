export type AdaptationType = 'KEEP' | 'EXPLORE' | 'ADAPT';

export type PreviewType = 'image' | 'gif' | 'video';

export interface PreviewAsset {
  url: string;
  type: PreviewType;
  alt: string;
  posterUrl?: string;
}

export interface CreativeServiceFormat {
  id: string;
  name: string;
  description: string;
  preview: PreviewAsset;
  idealFor: string[];
  relatedOpportunityType?: AdaptationType;
  available: boolean;
}

export interface CreativeServicesSection {
  title: string;
  subtitle: string;
  description: string;
  formats: CreativeServiceFormat[];
}

export type TestingStatus = 'ready' | 'pending_measurement';

export interface TestingFrameworkItem {
  id: string;
  recommendation: string;
  original: PreviewAsset;
  variant: PreviewAsset;
  variantLabel: string;
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
  previewUrl?: unknown;
  previewType?: unknown;
  previewAlt?: unknown;
  idealFor?: unknown;
  relatedOpportunityType?: unknown;
  available?: unknown;
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
