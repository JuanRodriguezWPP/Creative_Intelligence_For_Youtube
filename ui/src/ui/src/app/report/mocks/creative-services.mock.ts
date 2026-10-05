import { CreativeServicesSection } from '../report.models';

export const CREATIVE_SERVICES_MOCK: CreativeServicesSection = {
  title: 'CREATIVE SERVICES',
  subtitle: 'De la oportunidad a la ejecución creativa.',
  description: 'Formatos diseñados para activar las oportunidades identificadas en cada territorio. Todos los formatos pueden ser producidos con Creative Services.',
  formats: [
    {
      id: 'inbanner-video',
      name: 'InBanner Video',
      description: 'Video en display que se activa dentro del banner, generando mayor atención sin salir de la página.',
      preview: { url: 'assets/formats/inbanner_video.png', type: 'image', alt: 'Preview de InBanner Video' },
      idealFor: ['Atención', 'Storytelling'],
      relatedOpportunityType: 'ADAPT',
      available: true,
    },
    {
      id: 'hands-free-carousel',
      name: 'Hands-Free Carousel',
      description: 'Carrusel de video que se reproduce automáticamente, permitiendo mostrar diferentes mensajes en una sola unidad.',
      preview: { url: 'assets/formats/handsfree_carousel.png', type: 'image', alt: 'Preview de Hands-Free Carousel' },
      idealFor: ['Educación', 'Beneficios'],
      relatedOpportunityType: 'EXPLORE',
      available: true,
    },
    {
      id: 'loopbook',
      name: 'Loopbook',
      description: 'Experiencia interactiva en formato vertical que permite explorar diferentes capítulos o productos.',
      preview: { url: 'assets/formats/loopbook.png', type: 'image', alt: 'Preview de Loopbook' },
      idealFor: ['Consideración', 'Exploración'],
      relatedOpportunityType: 'EXPLORE',
      available: true,
    },
    {
      id: 'qr-format',
      name: 'QR Format',
      description: 'Conecta el mundo digital con experiencias offline a través de un código QR.',
      preview: { url: 'assets/formats/qr_format.png', type: 'image', alt: 'Preview de QR Format' },
      idealFor: ['Conversión', 'Engagement'],
      relatedOpportunityType: 'ADAPT',
      available: true,
    },
    {
      id: 'brand-lift',
      name: 'BrandLift',
      description: 'Formato en CTV que combina video e interacción para medir incremento de percepción de marca.',
      preview: { url: 'assets/formats/brandlift.png', type: 'image', alt: 'Preview de BrandLift' },
      idealFor: ['Awareness', 'Impacto de marca'],
      relatedOpportunityType: 'KEEP',
      available: true,
    },
  ],
};
