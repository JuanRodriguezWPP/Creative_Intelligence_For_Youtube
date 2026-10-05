import { TestingFrameworkSection } from '../report.models';

export const TESTING_FRAMEWORK_MOCK: TestingFrameworkSection = {
  tests: [
    {
      id: 'territory-cdmx-01',
      recommendation: 'Adaptar el mensaje para conectar con rutinas urbanas y estilos de vida activos.',
      original: {
        url: 'assets/formats/original_creative.png',
        type: 'image',
        alt: 'Creatividad original de Granedoin',
      },
      variant: {
        url: 'assets/formats/variante_cdmx.png',
        type: 'image',
        alt: 'Adaptación territorial para Ciudad de México',
      },
      variantLabel: 'Variante CDMX',
      hypothesis: 'La adaptación territorial aumentará la relevancia del mensaje y la intención de consideración en CDMX.',
      successMetrics: [
        'Brand Lift',
        'Consideración de marca',
        'VTR (Video Completion Rate)',
        'Ad Recall',
        'Intent to Purchase',
      ],
      territory: 'Ciudad de México + Área Metropolitana',
      adaptationType: 'ADAPT',
      status: 'pending_measurement',
    },
  ],
};
