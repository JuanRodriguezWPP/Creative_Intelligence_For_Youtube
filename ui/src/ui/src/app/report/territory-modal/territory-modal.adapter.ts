import { V2Territory } from '../../api-calls/api-calls.service.interface';
import {
  TerritoryAdaptationCardViewModel,
  TerritoryModalViewModel,
  TerritoryOpportunityViewModel,
} from './territory-modal.models';

const NOT_AVAILABLE = 'Dato no disponible';

function valueOrFallback(value: string | null | undefined): string {
  return value?.trim() || NOT_AVAILABLE;
}

function uniqueValues(values: string[]): string[] {
  return values.filter((value, index) => value.length > 0 && values.indexOf(value) === index);
}

export function buildTerritoryModalViewModel(territory: V2Territory | null): TerritoryModalViewModel {
  if (!territory) return { opportunities: [], adaptations: [] };

  const opportunities: TerritoryOpportunityViewModel[] = [];
  const adaptations: TerritoryAdaptationCardViewModel[] = [];

  const previewAssets = [
    'assets/formats/original_creative.png',
    'assets/formats/variante_cdmx.png',
    'assets/formats/handsfree_carousel.png',
    'assets/formats/loopbook.png',
    'assets/formats/brandlift.png',
  ];
  const taxonomy = ['ADAPT', 'EXPLORE', 'KEEP'] as const;

  // NUEVO ESQUEMA (V3)
  if (territory.oportunidades && territory.oportunidades.length > 0) {
    territory.oportunidades.forEach((item, index) => {
      // Find associated adaptations
      const associatedAdaptations = (territory.adaptaciones || []).filter(a => a.oportunidad_id === item.id);
      
      opportunities.push({
        index,
        numberLabel: String(index + 1).padStart(2, '0'),
        title: valueOrFallback(item.titulo),
        finding: valueOrFallback(item.hallazgo),
        evidence: valueOrFallback(item.evidencia?.descripcion),
        evidenceObj: item.evidencia,
        insight: valueOrFallback(item.insight),
        opportunity: valueOrFallback(item.oportunidad),
        suggestedFormat: associatedAdaptations.length > 0 ? valueOrFallback(associatedAdaptations[0].formato) : NOT_AVAILABLE,
        adaptationCount: associatedAdaptations.length,
        relevanceLabel: item.relevancia || (index === 0 ? 'Alta relevancia' : 'Media relevancia'),
      });
      
      associatedAdaptations.forEach((element, elementIndex) => {
        const previewAsset = `assets/formats/${element.formato?.toLowerCase().replace(/\s+/g, '_')}.png`; // Try to use format name
        
        // Ser súper defensivos con la forma en que la IA podría retornar el segundo de la evidencia
        let extractedTimestamp: number | undefined = undefined;
        if (item.evidencia) {
          const raw = (item.evidencia as any).timestamp_s ?? (item.evidencia as any).timestamp ?? (item.evidencia as any).segundo;
          if (raw !== undefined && raw !== null) {
            extractedTimestamp = Number(raw);
          }
        }

        adaptations.push({
          id: `${index}-${elementIndex}`,
          sourceOpportunityIndex: index,
          sourceOpportunityLabel: `${String(index + 1).padStart(2, '0')} · ${item.titulo}`,
          classification: element.tipo || 'ADAPT',
          title: valueOrFallback(element.titulo),
          description: valueOrFallback(element.descripcion),
          suggestedFormat: valueOrFallback(element.formato),
          tags: uniqueValues([valueOrFallback(element.formato), ...(element.ideal_para || [])])
            .filter(value => value !== NOT_AVAILABLE),
          idealFor: element.ideal_para || [],
          previewUrl: previewAssets[(index + elementIndex) % previewAssets.length], // Defaulting to rotation for now, as format assets might not exist
          timestamp_s: extractedTimestamp,
        });
      });
    });
  } 
  // ESQUEMA VIEJO (V2 - Fallback)
  else if (territory.oportunidades_creativas && territory.oportunidades_creativas.length > 0) {
    const insight = valueOrFallback(territory.cultura_local?.rutinas_intereses);
    territory.oportunidades_creativas.forEach((item, index) => {
      opportunities.push({
        index,
        numberLabel: String(index + 1).padStart(2, '0'),
        title: valueOrFallback(item.solucion_hiperlocal),
        finding: valueOrFallback(item.foco_del_problema),
        evidence: valueOrFallback(item.diagnostico_video_original),
        insight,
        opportunity: valueOrFallback(item.solucion_hiperlocal),
        suggestedFormat: valueOrFallback(item.formato_sugerido),
        adaptationCount: item.elementos_de_adaptacion.length,
        relevanceLabel: index === 0 ? 'Alta relevancia' : 'Media relevancia',
      });
      
      item.elementos_de_adaptacion.forEach((element, elementIndex) => {
        adaptations.push({
          id: `${index}-${elementIndex}`,
          sourceOpportunityIndex: index,
          sourceOpportunityLabel: `${String(index + 1).padStart(2, '0')} · ${item.foco_del_problema}`,
          classification: taxonomy[(index + elementIndex) % taxonomy.length],
          title: valueOrFallback(element),
          description: valueOrFallback(item.solucion_hiperlocal),
          suggestedFormat: valueOrFallback(item.formato_sugerido),
          tags: uniqueValues([valueOrFallback(item.foco_del_problema), valueOrFallback(item.formato_sugerido)])
            .filter(value => value !== NOT_AVAILABLE),
          idealFor: item.formato_sugerido?.trim() ? [item.formato_sugerido.trim()] : [],
          previewUrl: previewAssets[(index + elementIndex) % previewAssets.length],
        });
      });
    });
  }

  return { opportunities, adaptations };
}
