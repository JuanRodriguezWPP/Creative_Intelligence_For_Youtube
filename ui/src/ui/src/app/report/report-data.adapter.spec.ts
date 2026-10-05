import {
  resolveReportSection,
  validateCreativeServicesResponse,
  validateTestingFrameworkResponse,
} from './report-data.adapter';
import { CREATIVE_SERVICES_MOCK } from './mocks/creative-services.mock';
import { TESTING_FRAMEWORK_MOCK } from './mocks/testing-framework.mock';

describe('report data adapters', () => {
  it('validates the five Creative Services formats fixture', () => {
    const raw = {
      ...CREATIVE_SERVICES_MOCK,
      formats: CREATIVE_SERVICES_MOCK.formats.map(format => ({
        ...format,
        previewUrl: format.preview.url,
        previewType: format.preview.type,
        previewAlt: format.preview.alt,
        relatedOpportunityType: format.relatedOpportunityType,
        idealFor: format.idealFor,
      })),
    };

    const result = validateCreativeServicesResponse(raw);
    expect(result.valid).toBeTrue();
    expect(result.data?.formats.length).toBe(5);
  });

  it('rejects an incomplete Creative Services response', () => {
    const result = validateCreativeServicesResponse({ title: 'CREATIVE SERVICES', formats: [] });
    expect(result.valid).toBeFalse();
    expect(result.empty).toBeFalse();
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('normalizes the historical testing_framework wrapper', () => {
    const test = TESTING_FRAMEWORK_MOCK.tests[0];
    const result = validateTestingFrameworkResponse({
      testing_framework: {
        testing_framework: [{
          id: test.id,
          recomendacion: test.recommendation,
          original: test.original,
          variant: test.variant,
          variant_label: test.variantLabel,
          hipotesis: test.hypothesis,
          metricas_exito: test.successMetrics,
          territorio: test.territory,
          adaptation_type: test.adaptationType,
        }],
      },
    });

    expect(result.valid).toBeTrue();
    expect(result.data?.tests[0].adaptationType).toBe('ADAPT');
  });

  it('rejects missing metrics and invalid adaptation types', () => {
    const test = TESTING_FRAMEWORK_MOCK.tests[0];
    const result = validateTestingFrameworkResponse([{
      recommendation: test.recommendation,
      original: test.original,
      variant: test.variant,
      variantLabel: test.variantLabel,
      hypothesis: test.hypothesis,
      successMetrics: [],
      adaptationType: 'CHANGE',
    }]);

    expect(result.valid).toBeFalse();
    expect(result.issues.join(' ')).toContain('successMetrics');
    expect(result.issues.join(' ')).toContain('KEEP, EXPLORE o ADAPT');
  });

  it('uses mocks only when explicitly enabled', () => {
    const local = resolveReportSection(null, validateTestingFrameworkResponse, TESTING_FRAMEWORK_MOCK, true);
    const production = resolveReportSection(null, validateTestingFrameworkResponse, TESTING_FRAMEWORK_MOCK, false);

    expect(local.state).toBe('mock');
    expect(local.source).toBe('mock');
    expect(production.state).toBe('empty');
    expect(production.data).toBeNull();
  });
});
