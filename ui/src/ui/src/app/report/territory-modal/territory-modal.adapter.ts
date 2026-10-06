import { V2Territory } from '../../api-calls/api-calls.service.interface';
import { CREATIVE_FORMATS_CATALOG, CreativeFormatId } from '../report.models';
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

function resolveFormatInfo(rawFormat: string | undefined): { name: string; previewUrl: string } {
  if (!rawFormat) return { name: NOT_AVAILABLE, previewUrl: 'assets/formats/branded_bar.png' };
  const normalized = rawFormat.toLowerCase().replace(/[-\s]+/g, '_') as CreativeFormatId;
  const catalogEntry = CREATIVE_FORMATS_CATALOG[normalized];
  if (catalogEntry) {
    return { name: catalogEntry.name, previewUrl: catalogEntry.defaultPreviewUrl };
  }
  return { name: rawFormat, previewUrl: 'assets/formats/branded_bar.png' };
}

export function buildTerritoryModalViewModel(territory: V2Territory | null): TerritoryModalViewModel {
  if (!territory) return { opportunities: [], adaptations: [] };

  const opportunities: TerritoryOpportunityViewModel[] = [];
  const adaptations: TerritoryAdaptationCardViewModel[] = [];

  const taxonomy = ['ADAPT', 'EXPLORE', 'KEEP'] as const;

  // NUEVO ESQUEMA (V3)
  if (territory.oportunidades && territory.oportunidades.length > 0) {
    territory.oportunidades.forEach((item, index) => {
      // Find associated adaptations
      const associatedAdaptations = (territory.adaptaciones || []).filter(a => a.oportunidad_id === item.id);
      const firstAdaptation = associatedAdaptations[0];
      const firstFormatInfo = firstAdaptation ? resolveFormatInfo(firstAdaptation.formato) : null;
      const rawFirstIntervention = (firstAdaptation as any)?.intervencion || (firstAdaptation as any)?.intervention;
      const firstIntervention = rawFirstIntervention
        ? (rawFirstIntervention.toLowerCase() as 'personalize' | 'amplify')
        : (firstAdaptation ? (firstAdaptation.tipo === 'ADAPT' ? 'personalize' : 'amplify') : undefined);

      opportunities.push({
        index,
        numberLabel: String(index + 1).padStart(2, '0'),
        title: valueOrFallback(item.titulo),
        finding: valueOrFallback(item.hallazgo),
        evidence: valueOrFallback(item.evidencia?.descripcion),
        evidenceObj: item.evidencia,
        insight: valueOrFallback(item.insight),
        opportunity: valueOrFallback(item.oportunidad),
        suggestedFormat: firstFormatInfo ? firstFormatInfo.name : NOT_AVAILABLE,
        intervention: firstIntervention,
        adaptationCount: associatedAdaptations.length,
        relevanceLabel: item.relevancia || (index === 0 ? 'Alta relevancia' : 'Media relevancia'),
      });

      associatedAdaptations.forEach((element, elementIndex) => {
        const formatInfo = resolveFormatInfo(element.formato);
        const rawIntervention = (element as any).intervencion || (element as any).intervention;
        const intervention: 'personalize' | 'amplify' = rawIntervention
          ? (rawIntervention.toLowerCase() as 'personalize' | 'amplify')
          : (element.tipo === 'ADAPT' ? 'personalize' : 'amplify');

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
          intervention,
          title: valueOrFallback(element.titulo),
          description: valueOrFallback(element.descripcion),
          suggestedFormat: formatInfo.name,
          tags: uniqueValues([formatInfo.name, ...(element.ideal_para || [])])
            .filter(value => value !== NOT_AVAILABLE),
          idealFor: element.ideal_para || [],
          previewUrl: formatInfo.previewUrl,
          timestamp_s: extractedTimestamp,
        });
      });
    });
  }
  // ESQUEMA VIEJO (V2 - Fallback limpio)
  else if (territory.oportunidades_creativas && territory.oportunidades_creativas.length > 0) {
    const insight = valueOrFallback(territory.cultura_local?.rutinas_intereses);
    territory.oportunidades_creativas.forEach((item, index) => {
      const formatInfo = resolveFormatInfo(item.formato_sugerido);
      opportunities.push({
        index,
        numberLabel: String(index + 1).padStart(2, '0'),
        title: valueOrFallback(item.solucion_hiperlocal),
        finding: valueOrFallback(item.foco_del_problema),
        evidence: valueOrFallback(item.diagnostico_video_original),
        insight,
        opportunity: valueOrFallback(item.solucion_hiperlocal),
        suggestedFormat: formatInfo.name,
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
          suggestedFormat: formatInfo.name,
          tags: uniqueValues([valueOrFallback(item.foco_del_problema), formatInfo.name])
            .filter(value => value !== NOT_AVAILABLE),
          idealFor: item.formato_sugerido?.trim() ? [formatInfo.name] : [],
          previewUrl: formatInfo.previewUrl,
        });
      });
    });
  }

  return { opportunities, adaptations };
}
