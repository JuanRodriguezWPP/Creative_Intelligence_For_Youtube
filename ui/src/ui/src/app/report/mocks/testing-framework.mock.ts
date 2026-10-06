import { TestingFrameworkSection } from '../report.models';

export const TESTING_FRAMEWORK_MOCK: TestingFrameworkSection = {
  tests: [
    {
      id: 'testing-framework-01',
      recommendation: 'Si incorporamos una intervención de branding y CTA sobre el asset original, podemos evaluar su impacto frente a la versión de referencia.',
      original: {
        url: 'assets/formats/testing/testing_original.png',
        type: 'image',
        alt: 'Asset original de referencia',
      },
      variant: {
        url: 'assets/formats/testing/testing_variant.png',
        type: 'image',
        alt: 'Variante ilustrativa',
      },
      variantLabel: 'Variante ilustrativa',
      illustrativeVariant: {
        label: 'Variante ilustrativa',
        preview: {
          url: 'assets/formats/testing/testing_variant.png',
          type: 'image',
          alt: 'Mockup ilustrativo de adaptación',
        },
        isMockup: true,
        interventionType: 'personalize',
      },
      hypothesis: 'Si incorporamos una intervención de branding y CTA sobre el asset original, podemos evaluar su impacto frente a la versión de referencia.',
      successMetrics: [
        'Brand Lift',
        'Ad Recall',
        'Consideración de marca',
        'VTR (Video Completion Rate)',
        'Click-Through / Conversión',
      ],
      territory: undefined,
      adaptationType: undefined,
      status: 'pending_measurement',
    },
  ],
};
