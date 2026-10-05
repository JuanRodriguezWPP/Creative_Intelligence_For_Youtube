# Creative Intelligence Report v1 — Requisitos y diseño técnico

**Estado:** segunda iteración; revisada contra `design-review.json` y `design-review.md`.  
**Contrato:** `creative-intelligence-report.v1`.  
**Idioma de producto y documentación:** español.  
**Fuentes verificadas:** PDF `Creative Intelligence\u000bAdTV Youtube Draft-2.pdf` (22 páginas, extraído con PDFKit), `.agents/tasks/creative-intelligence-context.md`, backend `api-server/src/`, View 3 en `app.component.*`, design systems y componentes `ui/src/ui/src/app/report/`.

## Requisitos

### Summary

Se implementará un pipeline backend único que convierte el video analizado, el brief y el Top 5 territorial ya calculado por el formulario/H3 en un reporte JSON versionado, validado, persistido e idempotente. El reporte materializa los journeys 01–05 del PDF —Entiende, Contextualiza, Descubre, Adapta y Test & Learn— y conserva la jerarquía **Hallazgo → Evidencia → Insight → Oportunidad**. La evidencia creativa será trazable a escenas/timestamps y la territorial a fuentes públicas registradas.

El Top 5 no es una recomendación de Gemini: se captura una sola vez durante el parseo del CSV, se ordena mediante la regla existente, y después queda congelado. La IA recibe exactamente esos cinco territorios en ese orden; no puede reagrupar, reemplazar, renombrar ni recalcular ranking, H3, conteos o audiencia. Los hechos territoriales sólo se generan cuando un `GeoEvidenceProvider` entrega fuentes públicas verificables. Con el proveedor deshabilitado o sin evidencia se omite el LLM Geo y se devuelven `null`/`unknown` más `data_gaps`.

La evaluación ABCD tendrá un único dueño: `POST /api/compass/report-v1` invocará una sola vez una función backend nueva `GenerationHelper.evaluateFullVideo`. Angular dejará de llamar previamente a `/api/generate-variants` para `fullVideoAnalysis`. La función conservará sin cambios el prompt protegido, los fragmentos por objetivo y los parámetros actuales del modelo; preservará toda la salida original, incluido score, señales, elementos visuales y escenas. El endpoint legado seguirá funcionando sin cambio contractual.

### Supuestos explícitos

- La entrada Geo es México por defecto funcional, pero el contrato admite `country`; el proveedor inicial sólo declara cobertura cuando la configuración y la fuente coinciden con el país.
- Una ejecución v1 requiere exactamente cinco territorios válidos. Si el CSV no permite demostrar un Top 5 válido, Angular no llama al endpoint y muestra estado incompleto; el backend vuelve a validarlo.
- `geokeys_adults` es una estimación del CSV, no población oficial. Se presenta como `estimated_adults_from_input` y nunca como habitantes.
- La clasificación territorial se conserva si la lógica de entrada la provee; en el CSV actual no existe y por ello queda determinísticamente `null`/`unknown`, no la inventa Gemini.
- No existe hoy integración productiva de búsqueda/grounding territorial. La primera implementación incluye proveedor deshabilitado y proveedor de fixtures sólo para tests. Una integración real será una fase posterior tras confirmar endpoint, términos, identidad y cobertura.
- Las adaptaciones son especificaciones textuales; assets de catálogo no demuestran que una variante fue producida.
- No existe plataforma de medición. Todo test es diseño experimental; resultados, uplift, significancia y aprendizaje empiezan en `null`.
- `CompassData` y sus endpoints coexistirán durante el rollout. La compatibilidad es explícita y nunca se presenta un legado incompleto como v1 válido.

### Functional Requirements

- **FR-01 — Contrato canónico.** Crear JSON Schema Draft 2020-12 con `schema_version: "creative-intelligence-report.v1"`, objetos cerrados, campos requeridos, enums/límites, política nullable, fuentes, evidencias y relaciones referenciales.
- **FR-02 — Top 5 determinista.** Capturar exactamente cinco territorios una sola vez con orden estable; validar Unicode, números, H3 y consistencia de conteos/sumas tanto en Angular como backend. Ninguna etapa generativa puede alterar campos congelados.
- **FR-03 — Evaluación creativa única.** El orquestador ejecuta una sola generación ABCD con `PROMPTS.fullVideoEvaluationPrompt`, el `promptPart` protegido del objetivo y parámetros `temperature:1`, `topP:1`, `maxOutputTokens:8192`, `thinkingBudget:0`. Conserva todos los campos; output inválido falla sin repair generativo.
- **FR-04 — Score preservado y normalizado.** Guardar `raw_value`, `raw_max` y `normalized_0_100`. La normalización es presentación determinista y no recalificación. Las cuatro dimensiones ABCD se copian sin modificación.
- **FR-05 — Creative Overview y contexto.** Poblar score, ABCD+narrativa, señales, elementos visuales, escenas/momentos, fortalezas/debilidades y una lectura campaña+creatividad+Top5 con evidencia permitida.
- **FR-06 — Investigación Geo fail-closed.** Recuperar hechos sólo mediante `GeoEvidenceProvider`; conservar title, publisher, URL, `published_at`, `retrieved_at`, extract/paráfrasis, confidence y nota de licencia. Sin fuentes no se llama al LLM Geo.
- **FR-07 — Oportunidades trazables.** Por territorio producir 0–3 oportunidades con relevancia, hallazgo, evidencia, insight, oportunidad y conteo real de adaptaciones. Toda afirmación territorial requiere fuente pública; sin ella sólo se permite `claim_scope:"creative_only"`.
- **FR-08 — Adaptaciones textuales.** Por oportunidad producir 1–3 especificaciones `KEEP|EXPLORE|ADAPT`, con lógica, cambios, preservaciones, formato permitido, tags, ideal para y criterios de validación; no media.
- **FR-09 — Creative Services fijo.** Ensamblar exactamente InBanner Video, Hands-Free Carousel, Loopbook, QR Format y BrandLift desde una constante única. Gemini sólo devuelve `format_id`, relaciones y rationale.
- **FR-10 — Testing honesto.** Modelar oportunidad → original vs adaptación textual → hipótesis → KPI objetivo. `measurement_status` es `pending` y resultados permanecen `null`.
- **FR-11 — Prompts por etapas.** Separar normalización determinista, ABCD, enlace de evidencia creativa, Geo, síntesis, oportunidades, adaptaciones+catálogo, testing, ensamblado y reparación. Cada prompt nuevo tiene role, inputs, evidencia permitida, claims prohibidos, salida JSON, schema de etapa, cardinalidad, null policy y quality checks.
- **FR-12 — Runtime validation.** Validar request, cada salida de IA y reporte final con Ajv más reglas semánticas. Sólo las etapas nuevas admiten un repair; máximo uno por etapa. No se extraen objetos mediante regex como contrato primario.
- **FR-13 — API y persistencia.** Exponer `POST /api/compass/report-v1`, persistir reporte y claim idempotente en GCS con versión en ruta/metadata, y responder objetos tipados, nunca JSON dentro de strings.
- **FR-14 — Compatibilidad.** Implementar adapter de `CompassData` legado que preserve orden y marque provenance; si no puede construir v1 válido, devuelve `legacy-incomplete` con issues.
- **FR-15 — View 3 dinámica.** Poblar metadata, overview, lectura, Geo, tarjetas Top 5, modal Contexto/Oportunidades/Adaptaciones, Creative Services, Testing, fuentes y gaps desde el contrato, conservando mapa y visual actual.
- **FR-16 — Mocks explícitos.** Sólo se carga fixture sample si `environment.enableReportMocks === true` y el usuario usa `?mock=report`; producción muestra loading/empty/incomplete/error sin facts de fallback.
- **FR-17 — Entregables A–H.** Implementar documentación de arquitectura, schema+fixture, tipos+validadores, orquestación+provider, persistencia, adaptación Angular, preservación de WIP/componentes y pruebas/builds descritos por la tarea.

### Non-Functional Requirements

- **NFR-01 — Seguridad.** No enviar código, secretos ni PII a Vertex/proveedores; sanitizar entradas y logs. La ruta v1 exige capability token firmado y acotado al folder. En producción, habilitar la feature sin secret de token debe impedir el arranque.
- **NFR-02 — Límites.** Content-Type obligatorio `application/json`; body máximo 5 MB aplicado antes del parser global de 50 MB; strings, arrays, H3 y URLs tienen límites definidos en schema.
- **NFR-03 — Confiabilidad.** Timeout global 170 s, `AbortSignal`, máximo tres intentos iterativos sólo para red/429/5xx, backoff exponencial con jitter y sin recursión. Cada intento respeta el deadline de etapa y el tiempo restante global.
- **NFR-04 — Privacidad/observabilidad.** Logs estructurados sólo con `report_id`, hashes, etapa, intento, latencia, status, provider y códigos de validación. Nunca prompt, response, extractos, URLs con query, token ni brief.
- **NFR-05 — Determinismo.** IDs, orden, catálogo, score normalizado, conteos y resultados nullable se calculan fuera de Gemini; hashes usan JSON canónico y SHA-256.
- **NFR-06 — Stack bloqueado.** Node 20, Express 5.2.1, TypeScript 5.9.3, Vertex REST/Gemini, GCS, Angular 17/RxJS 7.8, MapLibre/Deck.GL existentes, `h3-js` 4.4.0, Ajv 8.17.1 y ajv-formats 3.0.1, versiones exactas nuevas.
- **NFR-07 — Regresión visual/accesibilidad.** No modificar anchos aprobados, estructura del mapa ni navegación del wizard; mantener teclado, labels, focus, estados y flechas centradas.
- **NFR-08 — WIP.** Antes de implementar se captura status, patch y hashes del working tree actual; no se hace reset, checkout ni rewrite completo de archivos modificados y se revisa el diff contra ese snapshot.

### Acceptance Criteria

1. El schema canónico acepta el fixture completo marcado `sample` y rechaza propiedades desconocidas, enums/rangos inválidos y campos requeridos ausentes.
2. Un CSV con headers ausentes, errores de PapaParse, nombre vacío, audiencia no entera/finita/negativa, H3 inválido o H3 asignado a dos identidades deja Geo `incomplete`; no convierte valores inválidos a cero.
3. La key territorial es `JSON.stringify([normalize(state),normalize(municipality)])`, donde `normalize` aplica NFC, trim, colapso de whitespace y lowercase `es-MX`; se conserva el primer display name y `source_order` mínimo.
4. El ranking usa audiencia descendente y `source_order` ascendente en empates, se captura una vez con `slice(0,5)` y nunca vuelve a ordenarse.
5. Backend valida ranks 1..5, `source_key`, `territory_id`, H3 mediante `h3.isValidCell`, cobertura exacta entre `geokeys` y `map_geokeys`, `geokey_count` y suma de audiencia; una discrepancia da 422, no se sobrescribe.
6. `evaluateFullVideo` se invoca exactamente una vez por generación no cacheada; Angular no ejecuta antes `generateVariants(...fullVideoAnalysis:true)` y la ruta legacy conserva su comportamiento.
7. La salida ABCD conserva `raw_value`; `raw_max` vale awareness=15, consideration=15, action=18, engagement=20, general=20. `normalized_0_100 = floor(raw_value/raw_max*100 + 0.5)` y no modifica las dimensiones.
8. Una salida ABCD inválida produce `422 ABCD_OUTPUT_INVALID`, sin repair ni segunda generación lógica; prompt y parámetros protegidos coinciden con los hashes del baseline WIP.
9. `creative_signals`, `visual_elements` y `scenes_moments` solicitados por el prompt protegido llegan al reporte; toda evidencia creativa usada por oportunidades referencia escena y timestamps válidos de `data.json`.
10. Con provider disabled o bundle sin fuentes, no se llama a `geo-enrichment`; `context_summary:null`, `facts_needs:[]`, métricas `value:null/status:"unknown"` y gaps `GEO_PROVIDER_DISABLED|NO_GEO_EVIDENCE` aparecen por territorio.
11. Todo `ClaimText` con `claim_scope:"territorial"` tiene al menos un evidence ID cuyo source es `TERRITORIAL_PUBLIC`; el validator rechaza texto territorial sin esa condición.
12. Una fuente pública contiene title, publisher, URL HTTPS, published_at nullable, retrieved_at, extract/paráfrasis, confidence y la nota `Content was rephrased for compliance with licensing restrictions`.
13. Sin fuente territorial, oportunidades pueden ser `creative_only` y basarse en video/campaña, pero no atribuyen demografía, hábitos, movilidad, consumo o necesidades a la zona.
14. Cada oportunidad mantiene Hallazgo → evidencia[] → Insight → Oportunidad y `adaptation_count` coincide con las adaptaciones referenciadas.
15. Cada adaptación pertenece a una oportunidad del mismo territorio, usa una clasificación y format ID permitidos, tiene cambios/preservaciones/criterios y no contiene media generada.
16. El catálogo contiene exactamente cinco entradas en el orden definido y con copy/assets/alt/availability deterministas; Gemini no puede redefinirlos.
17. Cada test referencia oportunidad y adaptación existentes, incluye original textual, variante textual, hipótesis, KPI primario/secundarios objetivo; status es pending y todos los resultados son null.
18. Cada salida nueva inválida ejecuta como máximo un repair; una segunda invalidez da `502 AI_OUTPUT_INVALID` y no persiste final parcial.
19. Vertex hace como máximo tres intentos de transporte, iterativos, abortables; 400/401/403, safety, JSON inválido y validación semántica no son transport-retryable.
20. El payload Vertex structured usa sólo `VertexResponseSchema` compatible por etapa; el reporte final siempre se valida con Draft 2020-12/Ajv. Existe contract test del payload y smoke test opt-in antes de activar structured output.
21. Antes de cualquier llamada Vertex se crea un claim `pending`. Misma key+hash complete devuelve el mismo report; misma key+hash pending devuelve 202 tras espera acotada; key+hash distinto devuelve 409 inmediatamente.
22. Un claim vencido sólo se recupera por CAS usando la generation leída; el reporte se escribe antes de CAS a complete y nunca se borra el artefacto ganador.
23. La ruta responde 415 a Content-Type incorrecto, 413 >5 MB, 401 token ausente/inválido, 403 folder distinto y 503 feature disabled, sin ejecutar Vertex.
24. En producción `CREATIVE_REPORT_V1_ENABLED=true` sin `REPORT_FOLDER_TOKEN_SECRET` falla al arrancar; el token firmado valida folder, operación y expiración con comparación timing-safe.
25. El adapter legado preserva orden y datos verificables, no convierte audiencia textual a cifra ni formatos no soportados; con menos de cinco territorios retorna `legacy-incomplete`.
26. View 3 renderiza todas las secciones desde `ReportV1PresentationAdapter`; no contiene fallbacks `21.8 M`, `92%`, `4.2 h`, `68%`, perfiles urbanos, taxonomía ni previews por índice.
27. El mapa principal recibe todos los H3 del Top 5; el modal recibe sólo `activeTerritory.map_geokeys`, aplica bounds si existen y se reinicializa al cambiar territorio/volver a Contexto.
28. Producción nunca muestra fixture; desarrollo sólo lo muestra con flag y query explícitos, rotulado “Sample / datos no factuales”.
29. Creative Services, modal, wizard, H3/mapa, estilos y widths actuales pasan smoke/regresión; no se reescribe código no relacionado ni WIP previo.
30. Pasan `npm test` y `npm run build` en `api-server`, y `npm run test -- --watch=false --browsers=ChromeHeadless` más `npm run build -- --configuration production` en Angular, sin servidor persistente.
31. Las pruebas cubren schema, Top 5, H3, catálogo, provenance, null/unknown, testing pending, adapter legado, idempotencia concurrente, autorización, payload Vertex y mapping frontend.
32. Los entregables A–H existen en las rutas fijadas, declaran schema/pipeline/prompt versions y el fixture no contiene afirmaciones presentadas como reales.

### Out of Scope

- Recalcular/agrupar/reordenar Top 5; optimización de medios, presupuesto, segmentación o activación.
- Cambiar criterios, texto, escalas o parámetros del prompt ABCD protegido.
- Generar/renderizar videos, imágenes o previews de adaptaciones.
- Medir campañas, ingerir resultados, calcular uplift/significancia o afirmar aprendizajes observados.
- Implementar scraping o una llamada productiva de búsqueda/grounding no disponible/configurada.
- Rediseñar View 3, cambiar anchos aprobados, sustituir MapLibre/Deck.GL o refactorizar todo `AppComponent`.
- Eliminar endpoints Compass legados durante este rollout.
- Resolver autenticación global histórica, CORS o secretos anteriores, salvo el guard obligatorio del endpoint v1.

## Diseño técnico

### Overview

La solución elegida es un **orquestador backend único** y no una cadena de llamadas Angular. Centraliza ownership de ABCD, evidencia, retries, validación, idempotencia y persistencia. Angular sólo normaliza el CSV, congela el Top 5, solicita el reporte y adapta el resultado a View 3. El backend carga `data.json`/`analysis.json`, ejecuta exactamente una evaluación ABCD protegida, obtiene Geo mediante provider, genera etapas acotadas y ensambla los campos deterministas. Esta opción evita que datos parciales vivan sólo en memoria y evita que el frontend sea autoridad sobre outputs de IA.

### Stack y dependencias

Se mantienen Node 20, Express 5.2.1, TypeScript 5.9.3 CommonJS, `@google-cloud/storage` 8.0.1, `google-auth-library`, Vertex REST `streamGenerateContent`, Angular 17/RxJS 7.8, MapLibre 3.6.2 y Deck.GL 9.3.5. Se añaden con versión exacta:

- backend: `ajv: "8.17.1"`, `ajv-formats: "3.0.1"`, `h3-js: "4.4.0"`;
- frontend: dependencia directa `h3-js: "4.4.0"`, reemplazando sólo el script CDN H3 y `declare const h3`; mapa y Deck.GL no cambian.

Ajv se elige porque el contrato tiene unions, nullables, condicionales y objetos anidados; un validador manual sería más riesgoso. Las reglas relacionales se implementan aparte en `validateReportSemantics`. No se añade SDK de IA, framework de estado ni test runner externo.

### Contrato canónico y tipos completos

El schema vive en `shared/contracts/creative-intelligence-report.v1.schema.json`; fixture en `shared/contracts/fixtures/creative-intelligence-report.v1.sample.json`. El Dockerfile copia `shared/contracts` al builder y runtime. Backend y frontend mantienen tipos equivalentes porque sus `rootDir` actuales no comparten TS; el schema y fixture son la fuente contractual.

Todos los objetos siguientes son cerrados (`additionalProperties:false`). Todas las propiedades listadas son requeridas; “nullable” significa unión explícita con `null`. Colección conocida vacía usa `[]`, dato escalar desconocido usa `null`, y `unknown` sólo aparece como enum de estado.

```ts
type IsoDateTime = string;
type ClaimScope = 'creative' | 'campaign' | 'territorial' | 'structural' | 'creative_only';
type Confidence = number; // 0..1

type CreativeIntelligenceReportV1 = {
  schema_version: 'creative-intelligence-report.v1';
  report_id: `rpt_${string}`;
  status: 'complete' | 'complete_with_gaps';
  data_classification: 'production' | 'sample';
  sample_disclaimer: string | null;
  generated_at: IsoDateTime;
  metadata: ReportMetadata;
  campaign_context: CampaignContext;
  creative_overview: CreativeOverview;
  contextual_creative: ContextualCreative;
  geo: GeoSection;
  territorial_opportunities: TerritorialOpportunity[];
  adaptations: Adaptation[];
  creative_services: CreativeServices;
  testing_framework: TestingFramework;
  source_registry: SourceRecord[];
  evidence_registry: EvidenceRecord[];
  warnings: WarningRecord[];
  data_gaps: DataGap[];
  generation_metadata: GenerationMetadata;
};

type ReportMetadata = {
  brand: string; campaign: string; country: string;
  objective_key: 'awareness'|'consideration'|'action'|'engagement'|'general';
  objective_label: string; activation_start: string|null; activation_end: string|null;
  video: { name:string; duration_seconds:number; source_url:string|null; gcs_folder_hash:string; data_hash:string; analysis_hash:string };
  internal_reference: string|null;
};

type CampaignContext = {
  campaign_objective:string; asset_format:string|null; asset_comments:string|null;
  business_objective:string; target_audience:string; communication_tone:string;
  description:string; brand_guidelines:string|null; special_considerations:string|null;
  market_context:string|null;
};

type Score = { raw_value:number; raw_max:15|18|20; normalized_0_100:number; normalization:'round_half_up(raw_value / raw_max * 100)' };
type AbcdDimension = { score_0_100:number; narrative:string; evidence_ids:string[] };
type CreativeSignal = { signal_id:string; label:string; description:string; evidence_ids:string[] };
type SceneMoment = { moment_id:string; scene_id:string; start_seconds:number; end_seconds:number; summary:string; detected_elements:string[]; evidence_ids:string[] };
type CreativeOverview = {
  score:Score;
  abcd:{ attention:AbcdDimension; branding:AbcdDimension; connection:AbcdDimension; direction:AbcdDimension };
  description:string; creative_signals:CreativeSignal[];
  visual_elements:{ product:string|null; branding:string|null; messaging:string|null };
  scenes_moments:SceneMoment[]; video_structure:string|null;
  strengths:string[]; weaknesses:string[]; main_insight:string|null; projected_impact:string|null;
};

type ClaimText = { text:string; claim_scope:ClaimScope; evidence_ids:string[] };
type ContextualCreative = { general_reading:ClaimText; supporting_points:ClaimText[] };

type FrozenTerritory = {
  territory_id:string; source_key:string; source_order:number; rank:1|2|3|4|5;
  name:string; state:string; municipality:string;
  classification:{ value:string|null; status:'provided'|'unknown' };
  geokeys:string[]; geokey_count:number;
  audience_estimate:{ value:number; unit:'estimated_adults_from_input'; method:'sum_validated_geokeys_adults'; status:'input_estimate' };
  coordinates:{ latitude:number; longitude:number }|null;
  bounds:{ west:number; south:number; east:number; north:number }|null;
  context_summary:ClaimText|null;
  facts_needs:GeoFact[]; metrics:GeoMetric[]; map_geokeys:MapGeokey[];
  confidence:Confidence|null; data_gap_ids:string[];
};
type GeoFact = { fact_id:string; category:'need'|'demography'|'consumption'|'mobility'|'affinity'|'habit'|'other'; statement:string; status:'verified'; source_ids:string[]; confidence:Confidence };
type GeoMetric = { metric_id:string; label:string; value:number|null; unit:string|null; status:'verified'|'unknown'; source_ids:string[]; data_gap_id:string|null };
type MapGeokey = { h3_id:string; audience_value:number; center:{latitude:number;longitude:number}; boundary:Array<{latitude:number;longitude:number}> };
type GeoSection = { ranking_policy:'provided_top5_preserved'; territories:[FrozenTerritory,FrozenTerritory,FrozenTerritory,FrozenTerritory,FrozenTerritory] };

type TerritorialOpportunity = {
  opportunity_id:string; territory_id:string; ordinal:number; title:string;
  relevance:'high'|'medium'|'low'; claim_scope:'territorial'|'creative_only';
  finding:ClaimText; evidence_ids:string[]; insight:ClaimText; opportunity:ClaimText;
  adaptation_count:number;
};
type Adaptation = {
  adaptation_id:string; opportunity_id:string; territory_id:string; ordinal:number;
  classification:'KEEP'|'EXPLORE'|'ADAPT'; title:string; rationale:ClaimText;
  recommended_changes:string[]; preserved_elements:string[];
  recommended_format_id:'inbanner-video'|'hands-free-carousel'|'loopbook'|'qr-format'|'brandlift';
  tags:string[]; ideal_for:string[]; validation_criteria:string[];
  media_asset:null;
};

type CreativeServiceCatalogItem = {
  format_id:Adaptation['recommended_format_id']; order:1|2|3|4|5; name:string;
  description:string; asset_path:string; asset_type:'image'; alt:string;
  available:true; ideal_for:string[]; related_adaptation_types:Array<'KEEP'|'EXPLORE'|'ADAPT'>;
};
type CreativeServiceRecommendation = { recommendation_id:string; format_id:CreativeServiceCatalogItem['format_id']; opportunity_id:string; adaptation_id:string|null; rationale:string };
type CreativeServices = { title:'CREATIVE SERVICES'; subtitle:string; description:string; catalog:CreativeServiceCatalogItem[]; recommendations:CreativeServiceRecommendation[] };

type TargetKpi = { name:string; role:'primary'|'secondary'; target_direction:'increase'|'decrease'|'maintain'; target_value:number|null; unit:string|null; measurement_source:null };
type TestingItem = {
  test_id:string; opportunity_id:string; adaptation_id:string; territory_id:string;
  recommendation:string; original_concept:string; textual_variant:string; hypothesis:string;
  kpis:TargetKpi[]; measurement_status:'pending';
  observed_results:null; uplift:null; statistical_significance:null; learning:null;
};
type TestingFramework = { tests:TestingItem[] };

type VideoSource = { source_id:string; kind:'VIDEO_ANALYSIS'; title:string; file_path:string; content_hash:string; retrieved_at:IsoDateTime };
type InputSource = { source_id:string; kind:'FORM_INPUT'|'H3_INPUT'|'LEGACY_IMPORT'; title:string; content_hash:string; retrieved_at:IsoDateTime };
type PublicTerritorialSource = {
  source_id:string; kind:'TERRITORIAL_PUBLIC'; title:string; publisher:string; url:string;
  published_at:IsoDateTime|null; retrieved_at:IsoDateTime; extract:string;
  confidence:Confidence; license_note:'Content was rephrased for compliance with licensing restrictions';
};
type SourceRecord = VideoSource|InputSource|PublicTerritorialSource;
type EvidenceRecord = {
  evidence_id:string; source_id:string; claim_scope:ClaimScope; statement:string;
  territory_id:string|null;
  scene:{ scene_id:string; start_seconds:number; end_seconds:number }|null;
  confidence:Confidence;
};
type WarningRecord = { warning_id:string; code:string; scope:'report'|'stage'|'territory'; territory_id:string|null; message:string; recoverable:boolean };
type DataGap = { data_gap_id:string; code:'GEO_PROVIDER_DISABLED'|'NO_GEO_EVIDENCE'|'GEO_PROVIDER_TIMEOUT'|'SOURCE_INCOMPLETE'|'LEGACY_FIELD_UNVERIFIED'; scope:'report'|'territory'; territory_id:string|null; field_path:string; explanation:string };
type StageMetadata = { stage:string; prompt_version:string|null; status:'succeeded'|'skipped'|'failed'; attempts:number; repair_used:boolean; duration_ms:number };
type GenerationMetadata = {
  model:string; model_location:string; schema_version:'creative-intelligence-report.v1';
  pipeline_version:string; prompt_bundle_version:string; structured_output:boolean;
  geo_provider:string; request_hash:string; idempotency_key_hash:string;
  stages:StageMetadata[];
};
```

Límites de schema: IDs 1..128; nombres/títulos 1..300; rationale/narrativas 1..3000; brief 0..4000 por campo; arrays textuales 0..50, cada texto 1..1000; sources máximo 100; evidence máximo 500; opportunities máximo 15; adaptations máximo 45; tests máximo 5; H3 máximo 10,000 por territorio; audience/map values enteros seguros `0..9007199254740991`; timestamps finitos dentro de `0..video.duration_seconds`; URL pública HTTPS máximo 2048 sin credenciales; extract 1..2000; confidence 0..1.

#### Diccionario campo/fuente/obligatoriedad/ejemplo

| Ruta | Tipo/semántica | Fuente y required | Ejemplo sample |
|---|---|---|---|
| raíz: `schema_version,report_id,status,data_classification,sample_disclaimer,generated_at` | versión/ID/status/clasificación/null/date-time | assembler, todos required | `creative-intelligence-report.v1`, `sample` |
| `metadata.brand,campaign,country,objective_*` | strings + objective enum | formulario, required | `Marca sample` |
| `metadata.activation_*` | date o null | formulario, required nullable | `null` |
| `metadata.video.*` | nombre, duración, URL nullable, hashes | GCS/backend, required | `video-sample.mp4`, `30` |
| `campaign_context.*` | 11 campos estratégicos; cinco admiten null | formulario, required | `Objetivo sample` |
| `creative_overview.score.*` | raw/max/0–100/fórmula | ABCD+normalizer, required | `12,15,80` |
| `creative_overview.abcd.{a,b,c,d}` | score 0–100, narrativa, evidencias | ABCD+evidence linker, required | `80` |
| `description,main_insight,projected_impact` | texto/null | ABCD, required | texto sample |
| `creative_signals[]` | ID/label/description/evidence | ABCD+linker, required array | señal sample |
| `visual_elements.*` | texto/null | ABCD, required | `null` si ausente |
| `scenes_moments[],video_structure` | escenas/timestamps/textos/null | ABCD+data.json, required | escena `1`, `0..3` |
| `strengths[],weaknesses[]` | texto | ABCD, required | `[]` permitido |
| `contextual_creative.*` | claims y soporte | synthesis, required | claim creative |
| `geo.ranking_policy` | const | assembler, required | `provided_top5_preserved` |
| `territory_id,source_key,source_order,rank` | IDs/orden frozen | normalizer, required | `ter_01_ab12` |
| `name,state,municipality` | display/input | CSV, required | `Municipio sample` |
| `classification.*` | valor nullable/status | input, required | `null,unknown` |
| `geokeys,geokey_count,map_geokeys` | H3/map determinista | CSV+h3-js, required | celdas sample válidas |
| `audience_estimate.*` | cifra estimada etiquetada | CSV, required | `1200` |
| `coordinates,bounds` | geo o null | h3-js, required nullable | center/bounds |
| `context_summary` | territorial claim o null | Geo stage, required nullable | `null` sin fuente |
| `facts_needs[]` | fact/status/source/confidence | Geo provider+stage, required | `[]` sin evidencia |
| `metrics[]` | valor nullable/status/source/gap | Geo provider+assembler, required | unknown/null |
| `confidence,data_gap_ids` | number null/refs | provider/assembler, required | `null` |
| `territorial_opportunities[]` | cadena completa y refs | opportunities, required | 0..15 |
| `adaptations[]` | spec textual y format enum | adaptations, required | `media_asset:null` |
| `creative_services.catalog[]` | cinco objetos fijos | constante backend, required | InBanner Video |
| `creative_services.recommendations[]` | refs+rationale | adaptation stage, required | `[]` permitido |
| `testing_framework.tests[]` | experimento textual | testing, required | pending/null |
| `source_registry[]` | union de tres fuentes | input/GCS/provider, required | fuente sample |
| `evidence_registry[]` | source/claim/territory/scene | normalizers/stages, required | escena sample |
| `warnings[],data_gaps[]` | diagnósticos tipados | orchestrator, required | provider disabled |
| `generation_metadata.*` | modelo/versiones/hashes/stages | orchestrator, required | `pipeline.v1` |

### Catálogo fijo único

`CREATIVE_SERVICE_CATALOG` vive sólo en `api-server/src/report-v1/creative-services.catalog.ts`; frontend consume sus valores del reporte y no mantiene otro copy productivo.

| order / format_id | name / asset / alt | description | ideal_for / tipos / available |
|---|---|---|---|
| 1 `inbanner-video` | InBanner Video; `assets/formats/inbanner_video.png`; `Vista previa de InBanner Video` | Video dentro de una unidad display que permite extender el mensaje sin abandonar la página. | Atención, storytelling; ADAPT; true |
| 2 `hands-free-carousel` | Hands-Free Carousel; `assets/formats/handsfree_carousel.png`; alt homólogo | Carrusel de reproducción automática para secuenciar varios mensajes o beneficios en una unidad. | Educación, beneficios; EXPLORE/ADAPT; true |
| 3 `loopbook` | Loopbook; `assets/formats/loopbook.png`; alt homólogo | Experiencia vertical por capítulos para explorar historias, productos o atributos. | Consideración, exploración; EXPLORE; true |
| 4 `qr-format` | QR Format; `assets/formats/qr_format.png`; alt homólogo | Unidad con QR que conecta la exposición en pantalla con un siguiente paso medible. | Acción, engagement; ADAPT; true |
| 5 `brandlift` | BrandLift; `assets/formats/brandlift.png`; `Vista previa de BrandLift` | Formato interactivo orientado a plantear medición futura de percepción de marca; no implica resultados existentes. | Awareness, hipótesis de marca; KEEP/EXPLORE; true |

Gemini recibe sólo `{format_id, ideal_for, related_adaptation_types}` y retorna `{format_id, opportunity_ordinal, adaptation_ordinal|null, rationale}`. El assembler resuelve IDs y descarta/repara referencias no permitidas.

### Request, normalización y autorización

`POST /api/compass/report-v1` recibe:

```ts
type ReportV1Request = {
  schema_version:'creative-intelligence-report.v1';
  idempotency_key:string; // 8..128
  gcs_folder:string;      // 1..512
  metadata:{ brand:string; campaign:string; country:string; objective_key:ReportMetadata['objective_key']; objective_label:string; activation_start:string|null; activation_end:string|null; video_name:string; video_duration_seconds:number; video_source_url:string|null; internal_reference:string|null };
  campaign_context:CampaignContext;
  brand_parameters:{ advertiser_name:string|null; primary_color:string|null; secondary_color:string|null; tertiary_color:string|null };
  top_territories:Array<{
    source_key:string; source_order:number; rank:1|2|3|4|5;
    state:string; municipality:string; name:string; classification:string|null;
    geokeys:string[]; geokey_count:number; audience_estimate_value:number;
    coordinates:{latitude:number;longitude:number}|null;
    bounds:{west:number;south:number;east:number;north:number}|null;
    map_geokeys:Array<{h3_id:string;audience_value:number;center:{latitude:number;longitude:number};boundary:Array<{latitude:number;longitude:number}>}>;
  }>;
};
```

Angular parsea con PapaParse y `h3-js`. Required headers: `geokey`, `geokeys_adults`, `geolookup_Estado`, `geolookup_Municipio`. Cada row exige H3 válido y audiencia con regex decimal entera, `Number.isSafeInteger` y `>=0`; no usa `parseInt` parcial ni `||0`. Para fail-closed, cualquier row inválida deja toda la carga Geo incompleta, pues no puede demostrarse que no afectaría Top 5. Duplicados H3 se suman sólo si comparten identidad normalizada; conflicto de identidad invalida el CSV.

La identidad aplica `NFC → trim → whitespace interno único → toLocaleLowerCase('es-MX')` a estado y municipio; `source_key` es el JSON del par, no concatenación con delimitador. Se conserva el primer spelling no vacío y `source_order` de la primera row. La agregación usa sort estable `audience desc, source_order asc`; `frozenTopTerritories` se asigna una vez. El request builder sólo serializa ese array; no ordena.

Backend repite normalización y valida igualdad exacta de source key, ranks, orden, H3 únicos, geokey/map coverage, count, suma, centers/boundaries y bounds (con tolerancia `1e-6` sólo para flotantes derivados). No corrige discrepancias. `territory_id = ter_${rank}_${sha256(source_key).slice(0,12)}`.

La ruta requiere `X-Report-Folder-Token`. Se elige capability token HMAC-SHA256 sin dependencia nueva: payload base64url `{folder,operations:["report:v1"],iat,exp,nonce}`, firma con `REPORT_FOLDER_TOKEN_SECRET`, y verificación timing-safe. `/api/get-upload-url` sólo emite token para un folder nuevo/empty junto con la signed URL; el frontend lo conserva en `sessionStorage` por folder. No se emite capability para un folder ya existente mediante input arbitrario. Los reportes históricos sin capability quedan `incomplete/auth-required` hasta un flujo autenticado futuro. En `NODE_ENV=production`, `CREATIVE_REPORT_V1_ENABLED=true` exige secret de al menos 32 bytes; si falta, `createApp` lanza error al arrancar. Esto no pretende resolver auth global, pero impide que conocer un folder permita ejecutar el endpoint costoso.

`server.ts` monta primero `/api/compass/report-v1` con guard de Content-Type y `express.json({limit:'5mb',strict:true})`; después instala el parser global legado de 50 MB. Errores de body se traducen a 413/400 sin llegar al handler.

### Ownership de ABCD y score

`generation.ts` añade:

```ts
static evaluateFullVideo(
  gcsFolder:string,
  settings:Readonly<FullVideoEvaluationSettings>,
  signal:AbortSignal,
): Promise<ExistingAbcdEvaluationRaw>
```

`FullVideoEvaluationSettings` se construye sólo en backend desde request: objective key resuelve exactamente `CONFIG.vertexAi.abcdBusinessObjectives[key].promptPart`; campaign y brand params alimentan `resolveGenerationPrompt`; duración sale de `data.json`. La función usa el prompt resuelto existente y exactamente los model params actuales. Realiza una generación lógica; los hasta tres intentos son del mismo request por fallas de transporte y no regeneraciones por parse. Acepta sólo un documento JSON completo (se permite retirar un único fence exterior), no busca substrings con regex. Valida que sea array de un elemento y conserva `creative_signals`, `elementos_visuales`, `scenes_and_moments` además de campos actuales. JSON/schema inválido produce `ABCD_OUTPUT_INVALID`; no repair.

`raw_max` se deriva del objective map verificado en prompts. `raw_value` debe estar en `0..raw_max`. La función `normalizeScore` usa `Math.floor(raw/rawMax*100+0.5)`. Las dimensiones ya solicitadas 0–100 se copian; no se escalan con `raw_max`. `score_label` es presentación frontend por normalized thresholds 82/65/47 y no forma parte de la verdad generativa.

Para trazabilidad, `creative-evidence-linking.v1` no puntúa ni reescribe ABCD: recibe statements existentes y escenas compactas, y sólo devuelve asociaciones statement key → scene IDs. El assembler crea EvidenceRecords con timestamps de `data.json`. Si una asociación no existe, ese statement no puede usarse en oportunidades y genera warning; score y texto original permanecen. Así se preserva ABCD sin inventar provenance.

### GeoEvidenceProvider y estrategia productiva

```ts
interface GeoEvidenceProvider {
  readonly name:string;
  enrich(territories:readonly FrozenTerritoryInput[], signal:AbortSignal):Promise<GeoEvidenceBundle[]>;
}
type FrozenTerritoryInput = Pick<FrozenTerritory,'territory_id'|'rank'|'name'|'state'|'municipality'|'geokeys'|'coordinates'|'bounds'>;
type GeoEvidenceBundle = { territory_id:string; sources:PublicTerritorialSource[]; facts:Array<{statement:string;category:GeoFact['category'];source_ids:string[];confidence:Confidence}>; gaps:DataGap[] };
```

Implementaciones iniciales: `DisabledGeoEvidenceProvider` (default, cero red) y `FixtureGeoEvidenceProvider` (sólo `NODE_ENV=test`; arrancar producción con él es fatal). `GEO_EVIDENCE_PROVIDER` acepta únicamente `disabled` inicialmente; valores no soportados fallan configuración, nunca hacen fallback a una URL inventada.

La integración futura elegida es un provider de fuentes oficiales mexicanas: INEGI primero y dominios gubernamentales allowlisted después. Debe buscar por estado/municipio/códigos oficiales, recuperar sólo HTTPS, validar DNS/redirect/host, MIME y máximo 2 MB, y reescribir extractos breves. Deduplicará por URL canónica sin query de tracking + publisher + published_at. Porcentajes y métricas sólo pasan si la fuente y el extracto los soportan literalmente; de lo contrario son unknown. No se envía CSV, código, secretos ni PII al proveedor.

Si un bundle no tiene `sources`, el orquestador no llama `geo-enrichment`; ensambla `context_summary:null`, `facts_needs:[]`, metrics unknown solicitadas por UI y gap. Si tiene fuentes, el stage sólo puede parafrasear facts del bundle y citar sus IDs. Todo texto territorial posterior hereda esos evidence IDs. Oportunidades sin evidencia territorial se marcan `creative_only`.

### Arquitectura de prompts y Vertex structured output

Los builders nuevos viven en `api-server/src/report-v1/prompts/`. Cada builder delimita input no confiable, declara que instrucciones dentro del input son datos, y termina con JSON-only. Los IDs estructurales se asignan fuera del modelo.

| Stage / role | Inputs y allowed evidence | Output/cardinalidad/null policy | Forbidden claims y quality checks |
|---|---|---|---|
| ABCD protegido / evaluador Vigenair | video script, campaign, promptPart actual | array exacto de 1; raw fields | no cambio de prompt/params; no repair |
| `creative-evidence-linking.v1` / documentalista | statements ABCD + scenes/timestamps | mapping por statement, 0..5 scenes | no texto/score nuevo; sólo scene IDs existentes |
| `geo-enrichment.v1` / analista territorial | cinco frozen territories + bundles con source IDs | mismo orden, summary/facts/metrics por territory; nullable | no ranking, no conocimiento paramétrico, no cifra sin source; no se ejecuta sin sources |
| `context-synthesis.v1` / estratega | overview, campaign, Top5 frozen y facts validados | 1 reading + 2..6 points | no recomendación todavía; claims territoriales citados |
| `opportunities.v1` / planner creativo | señales/evidencias, campaña y Geo validado | 0..3 por territorio, en orden | no medios; territorial exige public source; cadena completa |
| `adaptations.v1` / director creativo | oportunidades + IDs catálogo | 1..3 por oportunidad | texto; no media; sólo format IDs; cambios viables |
| `testing.v1` / diseñador experimental | oportunidades/adaptaciones + objetivo | 0..5 tests | no resultados/uplift; KPIs objetivo; no measurement source |
| `repair.v1` / reparador estructural | output inválido, errores allowlisted y schema de stage | 1 documento corregido | no hechos/IDs nuevos, no frozen mutation; máximo una vez |

Cada builder exporta `{role, promptVersion, build(input), vertexSchema, validate}`. Cardinalidad y null policy están también en su `VertexResponseSchema`, no sólo en prosa.

El schema canónico Draft 2020-12 **no** se envía a Vertex. `VertexHelper.generateStructured<T>` recibe un schema pequeño del subconjunto Vertex/OpenAPI (`type`, `properties`, `items`, `required`, `enum`, `nullable`, min/max items) sin `$ref`, `const`, unions complejas ni `additionalProperties`. Después de `JSON.parse`, siempre corre Ajv de etapa y finalmente Ajv canónico+semántica. `VERTEX_STRUCTURED_OUTPUT` inicia false; habilitarlo requiere contract test del body REST y `REPORT_VERTEX_SMOKE_TEST=true npm run test:vertex-smoke` contra el modelo configurado. Si Vertex devuelve 400 por schema es fatal de configuración; no hay fallback silencioso. Con structured output false se exige JSON completo más la misma validación, nunca extracción heurística.

### Secuencia, budgets y errores

1. Guard de feature, Content-Type, 5 MB y capability token.
2. Ajv request + normalización Top5; carga `data.json`/`analysis.json`, validación, hashes y video evidence. No se llama Vertex aún.
3. Canonicalización excluye token e idempotency key pero incluye request normalizado, `data_hash`, `analysis_hash`, schema/pipeline/prompt versions; se calcula `request_hash` y `report_id`.
4. Se crea claim idempotente `pending` antes de Vertex.
5. En paralelo: `evaluateFullVideo` y Geo provider. Si provider tiene fuentes, Geo enrichment puede iniciar sin esperar ABCD; si no, se ensambla gap sin LLM.
6. Se normaliza ABCD, se enlaza evidencia creativa y se valida.
7. Context synthesis.
8. Opportunities para los cinco territorios en un request, preservando orden.
9. Adaptations + recomendaciones de catálogo.
10. Testing.
11. Assembler fija IDs, counts, catálogo, null de resultados, warnings/gaps y metadata.
12. Ajv final + `validateReportSemantics` comprueban referencias, source requirements, Top5 y catálogo.
13. Se escribe reporte con create-only, se relee/valida y el claim cambia por CAS a complete.

Timeout global 170 s. Cada llamada tiene timeout de intento máximo 25 s y deadline de etapa 40 s; Geo provider 8 s. Las ramas ABCD/Geo son paralelas. Los retries 2 y 3 sólo ocurren si queda budget global/etapa, con delays base 500 ms y 1,000 ms + jitter 0..250. Un stage no amplía el deadline global.

```ts
type ReportV1ErrorCode =
 | 'FEATURE_DISABLED'|'UNSUPPORTED_MEDIA_TYPE'|'PAYLOAD_TOO_LARGE'
 | 'AUTH_REQUIRED'|'FOLDER_FORBIDDEN'|'REPORT_INPUT_INVALID'|'TOP_FIVE_REQUIRED'
 | 'VIDEO_EVIDENCE_NOT_FOUND'|'VIDEO_EVIDENCE_INVALID'|'ABCD_OUTPUT_INVALID'
 | 'IDEMPOTENCY_CONFLICT'|'REPORT_IN_PROGRESS'|'AI_STAGE_UNAVAILABLE'
 | 'AI_STAGE_BLOCKED'|'AI_OUTPUT_INVALID'|'REPORT_PERSISTENCE_FAILED'|'REPORT_TIMEOUT';
type ReportV1ErrorResponse = { code:ReportV1ErrorCode; message:string; issues:Array<{path:string;rule:string}>; report_id:string|null; retry_after_seconds:number|null };
```

| Operación/falla | Recoverable | Caller | Log |
|---|---|---|---|
| feature/config | no | 503; startup fatal si prod unsafe | error sin secret |
| type/body/input/H3 | no | 415/413/400/422 | warn paths/rules |
| token/folder | no | 401/403 | warn token hash/folder hash |
| GCS absent/corrupt | no | 404/422 | error file kind+folder hash |
| ABCD invalid/safety | no | 422 | warn code; nunca prompt |
| Geo disabled/empty/timeout | sí | 200 complete_with_gaps | info/warn territory ID |
| Vertex red/429/5xx | retry acotado; luego no | 503 | stage/attempt/status |
| output nuevo inválido | un repair; luego no | 502 | códigos Ajv, no body |
| claim pending | sí | 202 + retry-after | info |
| key conflict | no | 409 | warn key hash |
| persist/CAS | recuperación definida; luego no | 500 | error object path hash |
| global abort | no | 504 | stage y elapsed |

No se persiste reporte final parcial. El claim puede quedar failed/expired para recuperación, pero no contiene prompt ni contenido.

### Idempotencia y persistencia sin carrera

Rutas:

- reporte: `<gcs_folder>/reports/creative-intelligence-report.v1/<report_id>.json`;
- claim: `<gcs_folder>/reports/creative-intelligence-report.v1/idempotency/<sha256(idempotency_key)>.json`.

```ts
type IdempotencyClaim = {
  request_hash:string; report_id:string; state:'pending'|'complete'|'failed';
  created_at:string; updated_at:string; expires_at:string;
  report_path:string|null; failure_code:string|null;
};
```

`StorageManager` añade métodos que propagan errores: `loadJsonWithGeneration`, `saveJsonCreateOnly` (`ifGenerationMatch:0`) y `saveJsonCompareAndSwap(expectedGeneration)`. GCS metadata del reporte: `schema-version`, `pipeline-version`, `prompt-version`, `request-hash`, `status`; content type JSON.

Claim inicial usa create-only y expira a 10 min. Ante precondition 412 se lee claim+generation: hash distinto → 409; mismo hash complete → carga, valida y devuelve; mismo hash pending no vencido → poll 3 veces durante máximo 3 s y después 202; failed o pending vencido → CAS a un nuevo pending con la generation observada. Si CAS pierde, se repite una sola lectura/decisión, no loop ilimitado.

El reporte se escribe antes de completar claim. Si el create-only del reporte da 412, se carga el objeto existente y sólo se acepta si schema, report ID y request hash coinciden; de otro modo persistence failure. Después se hace CAS del claim pending a complete usando su generation. Si CAS falla, se lee: complete con mismo hash/reporte es éxito; hash distinto es conflicto interno fatal. Nunca se devuelve el reporte de otro hash ni se borra un ganador.

### Compatibilidad con CompassData

`adaptLegacyCompassData(input, context)` valida shape legado y devuelve union:

```ts
type LegacyAdapterResult =
 | {kind:'v1'; report:CreativeIntelligenceReportV1}
 | {kind:'legacy-incomplete'; view_model:LegacyReportViewModel; issues:Array<{path:string;rule:string}>};
```

Mapea meta/contexto/ABCD sin recalificar y preserva exactamente el orden de cinco territorios. `audiencia_estimada` textual queda null/gap; diagnósticos legacy son `LEGACY_IMPORT`, no evidencia pública; formatos Skin/Card/Lower Bar quedan warning y adaptación no convertible. Si faltan cinco territorios, evidencia, campos requeridos o links, no persiste como v1. Endpoints legacy no cambian.

### Integración Angular View 3

Se añade `ReportV1PresentationAdapter` puro. `AppComponent` conserva upload, polling de análisis, wizard, mapa y estilos; al disponer de `data.json` y `frozenTopTerritories`, llama `ApiCallsService.generateCreativeIntelligenceReport(request, token)`. Estado: `idle|loading|ready|incomplete|error|mock`; errores 202 muestran “en proceso” y permiten retry con misma key; 422 muestra issues accionables.

El adapter produce `ReportV1ViewModel` y colecciones indexadas por IDs. `compassData` queda sólo para legado; View 3 selecciona explícitamente `reportVm` o `legacyVm`, sin cast `as any` ni conversión silenciosa.

| Vista | Binding v1 |
|---|---|
| header/meta | `metadata` |
| score/ABCD | normalized score y cuatro dimensiones |
| señales/visuales/momentos | `creative_overview` |
| Lectura general | `contextual_creative` |
| mapa general | concatenación de `territories[].map_geokeys` |
| tarjetas Top 5 | tuple de territories en rank; opportunity/adaptation counts |
| modal Contexto | active territory summary/facts/verified metrics/gaps/citations |
| modal Oportunidades | opportunities por `territory_id` |
| modal Adaptaciones | adaptations por opportunity; spec textual, sin duración/play falso |
| Creative Services | catálogo y recomendaciones del contrato |
| Testing | tests pending, conceptos textuales y KPI objetivo |
| fuentes | source/evidence registry y badges de confidence |

`territory-modal.adapter.ts` deja de asignar relevance, taxonomía y preview por índice. La tarjeta de adaptación elimina play y `0:15`; usa asset del formato sólo rotulado como “Referencia de formato”, no variante. El template elimina facts hardcodeados y renderiza métrica sólo con `verified`+sources; unknown muestra “Dato no disponible” y gap. El modal map usa sólo H3 activos y `fitBounds`; el mapa general conserva los cinco. No cambian widths ni clases estructurales salvo bindings/estados.

### Archivos específicos

**Documentación/contrato nuevos:**
- `.agents/tasks/creative-intelligence-report-v1/creative-intelligence-report-v1.md`
- `shared/contracts/creative-intelligence-report.v1.schema.json`
- `shared/contracts/fixtures/creative-intelligence-report.v1.sample.json`
- `.agents/tasks/creative-intelligence-report-v1/baseline/{wip-status.txt,pre-implementation.patch,protected-prompts.sha256.json}`

**Backend nuevos:**
- `api-server/src/app.ts` (factory testeable; `server.ts` sólo listen)
- `api-server/src/routes/report-v1.routes.ts`
- `api-server/src/report-v1/{report-v1.types,report-input.validator,report.validator,report.normalizer,report.assembler,report.orchestrator,report.errors,legacy-compass.adapter,creative-services.catalog}.ts`
- `api-server/src/report-v1/auth/folder-capability.ts`
- `api-server/src/report-v1/idempotency/idempotency.store.ts`
- `api-server/src/report-v1/geo/{geo-evidence.provider,disabled-geo-evidence.provider,fixture-geo-evidence.provider}.ts`
- `api-server/src/report-v1/prompts/{creative-evidence,geo-enrichment,context-synthesis,opportunities,adaptations,testing,repair}.prompt.ts`
- `api-server/test/*.test.ts`, `api-server/test/fixtures/*`, `api-server/tsconfig.test.json`

**Backend modificados localmente, sin full rewrite:**
- `api-server/package.json`, lockfile; `Dockerfile`
- `api-server/src/config.ts`, `server.ts`, `vertex.ts`, `generation.ts`, `storage.ts`
- `api-server/src/routes/compass.routes.ts` sólo si se comparte export/health; la ruta v1 se monta separada antes del parser global
- `api-server/src/types.ts` sólo para compatibilidad/export
- `api-server/src/prompts.ts` queda protegido: no modificar `fullVideoEvaluationPrompt` ni `abcdBusinessObjectives.promptPart`.

**Frontend nuevos/modificados:**
- `ui/src/ui/src/app/report-v1/{report-v1.models,report-v1-request.builder,report-v1-presentation.adapter}.ts` y specs
- `api-calls.service.interface.ts`, `api-calls.service.ts`, mock service
- `app.component.ts/html`; CSS/design systems sólo si estados lo exigen, sin widths
- `report/report.models.ts`, `report-data.adapter.ts`, `report/territory-modal/*`
- componentes `creative-services-section/*`, `testing-framework-section/*`
- environments mantienen mocks false prod/true dev; dev exige query explícita
- `ui/src/ui/package.json`, lockfile e `index.html/app.component.ts` para import directo h3-js.

### Preservación del WIP

Antes del primer edit de implementación se captura `git status --short`, `git diff --binary` y los SHA-256 de los valores runtime de `PROMPTS.fullVideoEvaluationPrompt` y cada `abcdBusinessObjectives[key].promptPart`. Esos archivos se escriben bajo `baseline/` y constituyen el baseline, no HEAD. El test importa el módulo compilado y compara cada valor contra el JSON capturado. La implementación usa ediciones localizadas, nunca reset/checkout/amend, y el review final compara el diff con `pre-implementation.patch` para separar WIP previo de líneas v1.

### Pruebas y comandos

Backend usa `node:test` y `node:assert`, sin framework adicional. `tsconfig.test.json` extiende el actual, usa `rootDir:"."`, `outDir:"dist-test"`, incluye `src/**/*.ts` y `test/**/*.ts`. El script limpia con Node portable, compila y ejecuta tests planos:

```json
{
  "test:build": "node -e \"require('fs').rmSync('dist-test',{recursive:true,force:true})\" && tsc -p tsconfig.test.json",
  "test": "npm run test:build && node --test dist-test/test/*.test.js",
  "test:vertex-smoke": "node --test dist-test/test/vertex-smoke.test.js"
}
```

Las dependencias se inyectan por constructor/factory: `fetch`, auth token provider, sleep, clock, random jitter, Storage gateway, Geo provider y Vertex client. Fixtures no hacen red.

- Unit backend: request/schema; Unicode/order/ties/H3; sums; score formula por objetivo; preservación raw; sources/claims; catálogo; links/counts; null results; legacy; repair once; retries/abort; Vertex payload; token; claim state machine/CAS.
- Integration backend con `createApp`: 415/413/401/403/422, happy path fake, Geo disabled, 202 pending, 409 conflict, concurrent requests, invalid AI, no partial persistence.
- Unit frontend: frozen request builder, no re-sort, adapter completo, unknown/citations, active H3, spec textual, catálogo/testing, mocks flag+query.
- Angular integration: fixture renderiza cinco cards y tres tabs; estados; cambia subset mapa; no contiene fallbacks factuales.
- Smoke opt-in Vertex: sólo manual/CI autorizado, sin video/PII, valida que modelo configurado acepta cada stage schema antes de `VERTEX_STRUCTURED_OUTPUT=true`.
- Validación final: `cd api-server && npm test && npm run build`; `cd ui/src/ui && npm run test -- --watch=false --browsers=ChromeHeadless && npm run build -- --configuration production`.

### Observabilidad, seguridad, rollout y entregables

Eventos: `report_claimed`, `stage_started/succeeded/repaired/skipped/failed`, `report_persisted`, `claim_completed`, con IDs/hash, duración y counts. Métricas: éxito por stage, retries, validation failures, reports with gaps, idempotency hits/conflicts/pending y latency. Se redactan tokens, folder, prompt, response, brief, extracts y URLs.

Rollout: (0) snapshot WIP; (1) schema/types/tests; (2) endpoint con feature false, provider disabled y structured false; (3) Angular dev con sample explícito; (4) smoke Vertex y feature gradual sólo con capability secret; (5) provider oficial tras revisión legal/técnica; (6) deprecación legacy tras paridad. Rollback desactiva `CREATIVE_REPORT_V1_ENABLED`; objetos v1 permanecen separados y producción no cae a mocks.

El entregable A documentará business rules, diccionario completo, arquitectura, prompts, secuencia, mapping View 3, Geo, riesgos, observabilidad, seguridad y rollout. Si incluye fuentes web, se citarán inline y se añadirá exactamente: **Content was rephrased for compliance with licensing restrictions**. B–H corresponden respectivamente al schema/fixture; tipos/validators/adapter; prompts/orquestador/API/provider; persistencia; Angular; preservación de componentes/WIP; tests/builds.

## Respuesta a hallazgos de revisión

1. **HIGH — ABCD sin camino de datos:** resuelto. Backend es único dueño mediante `evaluateFullVideo`; Angular elimina la llamada ABCD previa; `generation.ts` está incluido y conserva todos los campos.
2. **HIGH — carrera idempotente:** resuelto. Claim pending create-only ocurre antes de Vertex; 412 diferencia hash, 202/409/complete, recovery CAS y finalización CAS.
3. **MEDIUM — score ambiguo:** resuelto con raw/max/normalized y fórmula round-half-up; máximos por objetivo y dimensiones intactas.
4. **MEDIUM — Geo no fail-closed:** resuelto. Sin sources se omite LLM Geo; territorial claims requieren source público; sólo creative_only sin fuente.
5. **MEDIUM — tipos incompletos:** resuelto con árbol/tipos completos, unions de sources, evidence, KPI, gaps, warnings, stages y límites.
6. **MEDIUM — schema Vertex no verificado:** resuelto separando `VertexResponseSchema` pequeño de Ajv canónico, contract tests y smoke opt-in.
7. **MEDIUM — normalización/H3:** resuelto con NFC/case/whitespace, key estructural, source_order, stable tie, fail-closed rows, `h3.isValidCell` y rechazo de discrepancias.
8. **MEDIUM — retries/logs ABCD:** resuelto con una generación lógica, retry iterativo acotado/abort, no repair y sin contenido en logs/errores.
9. **MEDIUM — 5 MB/ownership:** resuelto montando parser v1 primero y capability token HMAC; feature productiva falla al arrancar sin secret.
10. **MEDIUM — baseline WIP:** resuelto con status, binary patch y hashes del working tree actual, tests runtime y regla de edits localizados.
11. **MEDIUM — runner backend:** resuelto con `node:test`, `tsconfig.test.json`, scripts ejecutables e inyección completa de dependencias.
12. **MEDIUM — catálogo incompleto:** resuelto con tabla única de IDs, orden, copy, assets, alt, availability, ideal_for y tipos; Gemini sólo relaciona IDs.
