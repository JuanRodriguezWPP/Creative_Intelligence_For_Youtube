import {
  AdaptationType,
  CreativeServiceFormat,
  CreativeServicesSection,
  PreviewAsset,
  PreviewType,
  RawCreativeServiceFormat,
  RawCreativeServicesSection,
  RawTestingFrameworkItem,
  ReportSectionViewModel,
  TestingFrameworkItem,
  TestingFrameworkSection,
  TestingStatus,
  ValidationResult,
} from './report.models';

const ADAPTATION_TYPES: AdaptationType[] = ['KEEP', 'EXPLORE', 'ADAPT'];
const PREVIEW_TYPES: PreviewType[] = ['image', 'gif', 'video'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const strings = value
    .map(asNonEmptyString)
    .filter((item): item is string => item !== null);
  return strings.length === value.length && strings.length > 0 ? strings : null;
}

function asAdaptationType(value: unknown): AdaptationType | undefined {
  const normalized = asNonEmptyString(value)?.toUpperCase() as AdaptationType | undefined;
  return normalized && ADAPTATION_TYPES.includes(normalized) ? normalized : undefined;
}

function asPreviewType(value: unknown): PreviewType | null {
  const normalized = asNonEmptyString(value)?.toLowerCase() as PreviewType | undefined;
  return normalized && PREVIEW_TYPES.includes(normalized) ? normalized : null;
}

function asPreview(value: unknown, fallbackAlt?: string): PreviewAsset | null {
  if (typeof value === 'string') {
    const url = asNonEmptyString(value);
    return url && fallbackAlt ? { url, type: 'image', alt: fallbackAlt } : null;
  }
  if (!isRecord(value)) return null;
  const url = asNonEmptyString(value['url']);
  const type = asPreviewType(value['type']);
  const alt = asNonEmptyString(value['alt']) ?? fallbackAlt ?? null;
  const posterUrl = asNonEmptyString(value['posterUrl']) ?? undefined;
  return url && type && alt ? { url, type, alt, posterUrl } : null;
}

function normalizeCreativeServiceFormat(raw: unknown, index: number): ValidationResult<CreativeServiceFormat> {
  if (!isRecord(raw)) {
    return { valid: false, empty: false, issues: [`formats[${index}] debe ser un objeto.`] };
  }
  const value = raw as RawCreativeServiceFormat;
  const id = asNonEmptyString(value.id);
  const name = asNonEmptyString(value.name);
  const description = asNonEmptyString(value.description);
  const previewUrl = asNonEmptyString(value.previewUrl);
  const previewType = asPreviewType(value.previewType);
  const previewAlt = asNonEmptyString(value.previewAlt) ?? (name ? `Preview de ${name}` : null);
  const idealFor = asStringArray(value.idealFor);
  const relatedOpportunityType = asAdaptationType(value.relatedOpportunityType);
  const issues: string[] = [];

  if (!id) issues.push(`formats[${index}].id es obligatorio.`);
  if (!name) issues.push(`formats[${index}].name es obligatorio.`);
  if (!description) issues.push(`formats[${index}].description es obligatorio.`);
  if (!previewUrl) issues.push(`formats[${index}].previewUrl es obligatorio.`);
  if (!previewType) issues.push(`formats[${index}].previewType debe ser image, gif o video.`);
  if (!previewAlt) issues.push(`formats[${index}].previewAlt es obligatorio.`);
  if (!idealFor) issues.push(`formats[${index}].idealFor debe contener etiquetas.`);
  if (value.relatedOpportunityType && !relatedOpportunityType) {
    issues.push(`formats[${index}].relatedOpportunityType debe ser KEEP, EXPLORE o ADAPT.`);
  }
  if (typeof value.available !== 'boolean') issues.push(`formats[${index}].available debe ser booleano.`);

  if (issues.length || !id || !name || !description || !previewUrl || !previewType || !previewAlt || !idealFor) {
    return { valid: false, empty: false, issues };
  }

  return {
    valid: true,
    empty: false,
    issues: [],
    data: {
      id,
      name,
      description,
      preview: { url: previewUrl, type: previewType, alt: previewAlt },
      idealFor,
      relatedOpportunityType,
      available: value.available as boolean,
    },
  };
}

export function validateCreativeServicesResponse(raw: unknown): ValidationResult<CreativeServicesSection> {
  if (raw == null) return { valid: false, empty: true, issues: [] };
  if (!isRecord(raw)) return { valid: false, empty: false, issues: ['Creative Services debe ser un objeto.'] };

  const value = raw as RawCreativeServicesSection;
  const title = asNonEmptyString(value.title);
  const subtitle = asNonEmptyString(value.subtitle);
  const description = asNonEmptyString(value.description);
  const formats = Array.isArray(value.formats) ? value.formats : null;
  const issues: string[] = [];

  if (!title) issues.push('title es obligatorio.');
  if (!subtitle) issues.push('subtitle es obligatorio.');
  if (!description) issues.push('description es obligatorio.');
  if (!formats?.length) issues.push('formats debe contener al menos un formato.');

  const normalizedFormats: CreativeServiceFormat[] = [];
  formats?.forEach((format, index) => {
    const result = normalizeCreativeServiceFormat(format, index);
    issues.push(...result.issues);
    if (result.data) normalizedFormats.push(result.data);
  });

  if (issues.length || !title || !subtitle || !description || !formats?.length) {
    return { valid: false, empty: false, issues };
  }
  return {
    valid: true,
    empty: false,
    issues: [],
    data: { title, subtitle, description, formats: normalizedFormats },
  };
}

export function normalizeCreativeServicesResponse(raw: unknown): CreativeServicesSection | null {
  return validateCreativeServicesResponse(raw).data ?? null;
}

function extractTestingItems(raw: unknown): unknown[] | null {
  if (Array.isArray(raw)) return raw;
  if (!isRecord(raw)) return null;
  const direct = raw['testing_framework'];
  if (Array.isArray(direct)) return direct;
  if (isRecord(direct) && Array.isArray(direct['testing_framework'])) return direct['testing_framework'];
  const tests = raw['tests'];
  return Array.isArray(tests) ? tests : null;
}

function normalizeTestingItem(raw: unknown, index: number): ValidationResult<TestingFrameworkItem> {
  if (!isRecord(raw)) {
    return { valid: false, empty: false, issues: [`tests[${index}] debe ser un objeto.`] };
  }
  const value = raw as RawTestingFrameworkItem;
  const recommendation = asNonEmptyString(value.recommendation) ?? asNonEmptyString(value.recomendacion);
  const hypothesis = asNonEmptyString(value.hypothesis) ?? asNonEmptyString(value.hipotesis);
  const metricsRaw = value.successMetrics ?? value.success_metrics ?? value.metricas_exito;
  const successMetrics = asStringArray(metricsRaw);
  const territory = asNonEmptyString(value.territory) ?? asNonEmptyString(value.territorio) ?? undefined;
  const adaptationRaw = value.adaptationType ?? value.adaptation_type;
  const adaptationType = asAdaptationType(adaptationRaw);
  const variantLabel = asNonEmptyString(value.variantLabel)
    ?? asNonEmptyString(value.variant_label)
    ?? asNonEmptyString(value.variante);
  const originalUrl = value.originalPreviewUrl ?? value.original_preview_url;
  const variantUrl = value.variantPreviewUrl ?? value.variant_preview_url;
  const original = asPreview(value.original, 'Creatividad original')
    ?? asPreview(originalUrl, 'Creatividad original');
  const variant = asPreview(value.variant, variantLabel ? `Adaptación ${variantLabel}` : 'Adaptación territorial')
    ?? asPreview(variantUrl, variantLabel ? `Adaptación ${variantLabel}` : 'Adaptación territorial');
  const statusValue = asNonEmptyString(value.status);
  const status: TestingStatus = statusValue === 'ready' ? 'ready' : 'pending_measurement';
  const issues: string[] = [];

  if (!recommendation) issues.push(`tests[${index}].recommendation es obligatorio.`);
  if (!original) issues.push(`tests[${index}].original es obligatorio.`);
  if (!variant) issues.push(`tests[${index}].variant es obligatorio.`);
  if (!variantLabel) issues.push(`tests[${index}].variantLabel es obligatorio.`);
  if (!hypothesis) issues.push(`tests[${index}].hypothesis es obligatorio.`);
  if (!successMetrics) issues.push(`tests[${index}].successMetrics debe contener métricas objetivo.`);
  if (adaptationRaw && !adaptationType) {
    issues.push(`tests[${index}].adaptationType debe ser KEEP, EXPLORE o ADAPT.`);
  }

  if (issues.length || !recommendation || !original || !variant || !variantLabel || !hypothesis || !successMetrics) {
    return { valid: false, empty: false, issues };
  }

  return {
    valid: true,
    empty: false,
    issues: [],
    data: {
      id: asNonEmptyString(value.id) ?? `test-${index + 1}`,
      recommendation,
      original,
      variant,
      variantLabel,
      hypothesis,
      successMetrics,
      territory,
      adaptationType,
      status,
    },
  };
}

export function validateTestingFrameworkResponse(raw: unknown): ValidationResult<TestingFrameworkSection> {
  if (raw == null) return { valid: false, empty: true, issues: [] };
  const items = extractTestingItems(raw);
  if (!items) return { valid: false, empty: false, issues: ['Testing Framework debe contener tests o testing_framework.'] };
  if (!items.length) return { valid: false, empty: true, issues: [] };

  const tests: TestingFrameworkItem[] = [];
  const issues: string[] = [];
  items.forEach((item, index) => {
    const result = normalizeTestingItem(item, index);
    issues.push(...result.issues);
    if (result.data) tests.push(result.data);
  });

  return issues.length
    ? { valid: false, empty: false, issues }
    : { valid: true, empty: false, data: { tests }, issues: [] };
}

export function normalizeTestingFrameworkResponse(raw: unknown): TestingFrameworkSection | null {
  return validateTestingFrameworkResponse(raw).data ?? null;
}

export function resolveReportSection<T>(
  raw: unknown,
  validate: (value: unknown) => ValidationResult<T>,
  mock: T | null,
  mocksEnabled: boolean,
): ReportSectionViewModel<T> {
  const realResult = validate(raw);
  if (realResult.valid && realResult.data) {
    return { state: 'ready', source: 'api', data: realResult.data, issues: [] };
  }
  if (mocksEnabled && mock) {
    return { state: 'mock', source: 'mock', data: mock, issues: realResult.issues };
  }
  return {
    state: realResult.empty ? 'empty' : 'incomplete',
    source: 'none',
    data: null,
    issues: realResult.issues,
  };
}
