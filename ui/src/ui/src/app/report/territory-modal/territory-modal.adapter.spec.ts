import { V2Territory } from '../../api-calls/api-calls.service.interface';
import { buildTerritoryModalViewModel } from './territory-modal.adapter';

const territory: V2Territory = {
  demografia: { nombre: 'Ciudad de México', clasificacion: 'Metropolitana', geo_keys_incluidas: 3, audiencia_estimada: '20 M' },
  cultura_local: { perfil_consumidor: 'Perfil', rutinas_intereses: 'Rutinas locales', vinculo_con_marca: 'Vínculo' },
  oportunidades_creativas: [{
    foco_del_problema: 'Branding', diagnostico_video_original: 'La marca aparece tarde',
    solucion_hiperlocal: 'Integrar códigos locales', formato_sugerido: 'Video corto',
    elementos_de_adaptacion: ['Abrir con la marca', 'Añadir señal local'],
  }],
};

describe('buildTerritoryModalViewModel', () => {
  it('maps opportunities and flattens adaptations', () => {
    const result = buildTerritoryModalViewModel(territory);
    expect(result.opportunities[0]).toEqual(jasmine.objectContaining({ finding: 'Branding', evidence: 'La marca aparece tarde', adaptationCount: 2 }));
    expect(result.adaptations.length).toBe(2);
  });

  it('uses honest empty states', () => {
    expect(buildTerritoryModalViewModel(null)).toEqual({ opportunities: [], adaptations: [] });
  });

  it('restricts adaptations to KEEP, EXPLORE and ADAPT', () => {
    const allowed = ['KEEP', 'EXPLORE', 'ADAPT'];
    expect(buildTerritoryModalViewModel(territory).adaptations.every(card => allowed.includes(card.classification))).toBeTrue();
  });
});
