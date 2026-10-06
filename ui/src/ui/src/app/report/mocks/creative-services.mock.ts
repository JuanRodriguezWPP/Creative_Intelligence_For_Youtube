import { CreativeServicesSection } from '../report.models';

export const CREATIVE_SERVICES_MOCK: CreativeServicesSection = {
  title: 'Creative Solutions',
  subtitle: 'De la oportunidad a la ejecución creativa.',
  description: 'Formatos diseñados para activar las oportunidades identificadas en cada territorio. Todos los formatos pueden ser producidos con Creative Services.',
  formats: [
    {
      id: 'branded_bar',
      name: 'Branded Bar',
      description: 'Barra lateral o inferior con branding persistente, llamada a la acción y elementos de marca.',
      preview: { url: 'assets/formats/Formats Gifs/BrandedBar.gif', type: 'gif', alt: 'Preview de Branded Bar' },
      idealFor: ['Branding', 'CTA Claro', 'Consideración'],
      relatedOpportunityType: 'ADAPT',
      available: true,
      capabilities: ['personalize', 'amplify'],
    },
    {
      id: 'video_card',
      name: 'Video Card',
      description: 'Tarjeta de video interactiva o complementaria para destacar mensajes clave y beneficios.',
      preview: { url: 'assets/formats/Formats Gifs/VideoCard.gif', type: 'gif', alt: 'Preview de Video Card' },
      idealFor: ['Educación de Producto', 'Storytelling', 'Engagement'],
      relatedOpportunityType: 'EXPLORE',
      available: true,
      capabilities: ['personalize', 'amplify'],
    },
    {
      id: 'canvas',
      name: 'Canvas',
      description: 'Lienzo creativo ampliado para enriquecer la experiencia visual del anuncio.',
      preview: { url: 'assets/formats/Formats Gifs/Canvas.gif', type: 'gif', alt: 'Preview de Canvas' },
      idealFor: ['Exploración', 'Impacto Visual', 'Inmersión'],
      relatedOpportunityType: 'EXPLORE',
      available: true,
      capabilities: ['amplify'],
    },
    {
      id: 'qr_code',
      name: 'QR Code',
      description: 'Código QR dinámico e interactivo para conectar la experiencia de video con conversión o activación móvil.',
      preview: { url: 'assets/formats/Formats Gifs/QR_Code.gif', type: 'gif', alt: 'Preview de QR Code' },
      idealFor: ['Conversión Directa', 'Conexión Omnicanal', 'Activación'],
      relatedOpportunityType: 'ADAPT',
      available: true,
      capabilities: ['personalize'],
    },
  ],
};
