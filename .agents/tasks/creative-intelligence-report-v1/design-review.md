# Revisión de diseño — Creative Intelligence Report v1

## Hallazgos

1. **HIGH — El diseño recalcula y reordena el Top 5 en vez de consumir el Top 5 ordenado que ya entrega la lógica de entrada.**  
   **Dónde:** `Summary`, FR-02, Acceptance Criteria 3–5 y `Request, normalización y autorización`.  
   La decisión vinculante dice que el Top 5 ordenado se enriquece, pero nunca se recalcula ni reordena. Sin embargo, el diseño vuelve a agrupar el CSV, normaliza identidades, suma audiencia, ordena por `audience desc, source_order asc` y aplica `slice(0,5)`. Eso no es sólo validación: puede cambiar miembros, nombres, empates y orden respecto del ranking que ya fluye desde el formulario. El código actual confirma que `app.component.ts` ya construye un ranking territorial (`aiArray.sort(...)` y `top30Zonas`); la nueva ruta debe capturar su salida ordenada, no ejecutar una segunda política de ranking más adelante.  
   **Fix concreto:** sustituir la sección de ranking por una captura inmutable del output existente y usar el CSV únicamente para enriquecer por identidad/H3:
   ```ts
   type OrderedTopFiveInput = readonly [
     RankedTerritoryInput, RankedTerritoryInput, RankedTerritoryInput,
     RankedTerritoryInput, RankedTerritoryInput
   ];

   // La posición proviene del ranking existente; no hay sort ni comparación de audiencia.
   const frozenTopFive = orderedRankingOutput.slice(0, 5).map((territory, index) => ({
     ...territory,
     rank: (index + 1) as 1 | 2 | 3 | 4 | 5,
   })) as OrderedTopFiveInput;
   ```
   El enrichment debe hacer un join contra estos cinco IDs/keys sin renombrarlos ni alterar su posición. Si falta o sobra correspondencia, si un H3 pertenece a dos territorios o si los totales declarados no coinciden, el resultado es `422`/`incomplete`; nunca se vuelve a agrupar o ordenar. Eliminar Acceptance Criterion 4 actual y reemplazarlo por una prueba donde las audiencias estén en orden contrario al array y la salida conserve exactamente el array recibido.

2. **HIGH — El contrato propuesto no puede cumplir la promesa de preservar íntegramente la evaluación ABCD protegida.**  
   **Dónde:** FR-03/FR-04, `Contrato canónico y tipos completos`, `Ownership de ABCD y score` y Acceptance Criteria 6–9.  
   El prompt real `PROMPTS.fullVideoEvaluationPrompt` devuelve `title`, `scenes`, `description`, `proyeccion_impacto`, `score`, `duration`, `abcd_dimensiones`, las cuatro tarjetas `{hallazgo, valor, accion}`, `strengths`, `weaknesses`, `creative_signals`, `elementos_visuales` y `scenes_and_moments`. El tipo diseñado reemplaza las tarjetas por `{score_0_100,narrative,evidence_ids}`, estructura momentos de otra forma y omite, entre otros, `title`, `scenes`, `duration`, los tres textos separados de cada tarjeta y los arrays originales de momentos/elementos. Eso contradice “conserva toda la salida original” y “las cuatro dimensiones ABCD se copian sin modificación”. El helper existente además confirma el riesgo: hoy `generateVariants()` construye un objeto nuevo y descarta `creative_signals`, `elementos_visuales` y `scenes_and_moments` aunque el prompt los solicite.  
   **Fix concreto:** añadir al schema un bloque raw validado 1:1 y separar expresamente las proyecciones derivadas:
   ```ts
   type ExistingAbcdEvaluationRaw = {
     title: string;
     scenes: string;
     description: string;
     proyeccion_impacto: string;
     score: number;
     duration: string;
     abcd_dimensiones: {
       attention_score: number; branding_score: number;
       connection_score: number; direction_score: number;
     };
     abcd: Record<'attention'|'branding'|'connection'|'direction', {
       hallazgo: string; valor: string; accion: string;
     }>;
     strengths: string[];
     weaknesses: string[];
     creative_signals: string[];
     elementos_visuales: { producto: string; branding: string; messaging: string };
     scenes_and_moments: {
       momentos_relevantes: string[];
       estructura_del_video: string;
       elementos_detectados: string[];
     };
   };

   type CreativeOverview = {
     raw_evaluation: ExistingAbcdEvaluationRaw; // copia validada, sin reescritura
     score: Score;                              // proyección determinista
     evidence_links: CreativeEvidenceLink[];    // datos añadidos, no sustitutos
     // demás proyecciones de presentación claramente documentadas
   };
   ```
   `evaluateFullVideo()` debe parsear y validar este objeto directamente, sin pasar por `GenerateVariantsResponse`, y el assembler debe demostrar con deep equality que `raw_evaluation` no cambió. Definir después, campo por campo, cómo se deriva cualquier vista normalizada sin borrar el raw.

3. **MEDIUM — Los máximos H3 permitidos hacen que requests válidos según schema excedan necesariamente el límite HTTP de 5 MB.**  
   **Dónde:** NFR-02, límites del schema y `ReportV1Request.top_territories`.  
   Se permiten hasta 10,000 H3 por territorio (50,000 total), pero cada celda se envía dos veces (`geokeys[]` y `map_geokeys[]`) y `map_geokeys` incluye center y boundary completos. Ese payload puede superar ampliamente 5 MB aun sin brief, por lo que el contrato aceptaría datos que el parser rechaza antes de validarlos. También obliga a confiar y revalidar geometría derivable en el cliente.  
   **Fix concreto:** hacer compacto el request y derivar geometría con la misma versión de `h3-js` en backend:
   ```ts
   type TerritoryCellInput = { h3_id: string; audience_value: number };
   type RankedTerritoryInput = {
     // identidad y posición recibidas sin cambio
     cells: TerritoryCellInput[];
     geokey_count: number;
     audience_estimate_value: number;
   };
   ```
   El backend valida IDs/duplicados/suma y calcula `center`, `boundary`, `coordinates` y `bounds`; el reporte sí puede devolver `map_geokeys`. Fijar un `maxItems` **total** medido para que el peor request serializado, más todos los demás campos, quede bajo 5 MB, y añadir un test que serialice exactamente el caso máximo.

4. **MEDIUM — La provenance territorial mezcla extracto y paráfrasis y permite una fecha de publicación ausente sin definir su consecuencia.**  
   **Dónde:** FR-06, Acceptance Criterion 12, `PublicTerritorialSource` y estrategia futura del provider.  
   La decisión vinculante exige provenance con título, publisher, URL, publish date, `retrieved_at`, extract y confidence. El diseño usa `extract/paráfrasis` como si fueran intercambiables y tipa `published_at` como `IsoDateTime|null`. Una paráfrasis no sirve para comprobar que una cifra aparece literalmente en la fuente, y muchas fuentes publican sólo `YYYY-MM-DD`, que no es un `date-time`. Tampoco se especifica si una fuente con fecha nula puede sostener un `GeoFact.status:'verified'`, pese a exigir provenance completa.  
   **Fix concreto:** separar evidencia literal de copy de presentación y escoger una regla fail-closed:
   ```ts
   type PublicTerritorialSource = {
     source_id: string;
     kind: 'TERRITORIAL_PUBLIC';
     title: string;
     publisher: string;
     url: string;
     published_on: string | null; // JSON Schema format: date
     retrieved_at: string;        // JSON Schema format: date-time
     verbatim_extract: string;
     display_paraphrase: string | null;
     confidence: number;
     license_note: 'Content was rephrased for compliance with licensing restrictions';
   };
   ```
   El validator debe exigir que números/porcentajes del fact estén soportados por `verbatim_extract`. Si `published_on` no está disponible, no se inventa: se registra `SOURCE_INCOMPLETE`; para honrar “full provenance”, esa fuente no puede respaldar un fact `verified` hasta completar la fecha (o el diseño debe elegir y documentar explícitamente una política alternativa). La nota de licencia aplica a `display_paraphrase`, no convierte el extracto en paráfrasis.

5. **MEDIUM — El comportamiento fail-closed de Geo sólo está definido para disabled, cero fuentes y timeout, no para errores o bundles inválidos.**  
   **Dónde:** `GeoEvidenceProvider y estrategia productiva`, `Secuencia, budgets y errores` y `DataGap`.  
   No hay regla para un provider que lance un error no-timeout, devuelva IDs desconocidos, HTTP redirect/host no permitido, una fuente incompleta, facts que citen sources inexistentes o contenido que no valide. Dejar estas rutas sin decisión permite tanto abortar todo el informe como pasar datos no confiables al LLM, dos interpretaciones incompatibles con fail-closed.  
   **Fix concreto:** validar `GeoEvidenceBundle` antes de cualquier prompt y añadir estados/códigos explícitos:
   ```ts
   type GeoGapCode =
     | 'GEO_PROVIDER_DISABLED' | 'NO_GEO_EVIDENCE' | 'GEO_PROVIDER_TIMEOUT'
     | 'GEO_PROVIDER_ERROR' | 'GEO_EVIDENCE_INVALID' | 'SOURCE_INCOMPLETE';
   ```
   Regla: una source/fact inválida se descarta; si un territorio queda sin sources válidas, no se llama `geo-enrichment`, sus campos quedan `null`/`[]`/`unknown` y recibe el gap correspondiente. Un throw del provider produce `complete_with_gaps`, salvo error de configuración detectado al arrancar. Añadir fixtures/tests para throw, malformed source, source ID inexistente, host/redirect rechazado y bundle parcial.

6. **MEDIUM — El claim idempotente declara el estado `failed`, pero no especifica ninguna transición hacia él ni el replay de fallos.**  
   **Dónde:** `Secuencia, budgets y errores` e `Idempotencia y persistencia sin carrera`.  
   El documento crea `pending` antes de Vertex y dice que el claim “puede quedar failed/expired”, pero no indica qué errores ejecutan CAS `pending → failed`. También dice que cualquier `failed` vuelve inmediatamente a `pending`, lo que regeneraría indefinidamente un fallo determinista como `ABCD_OUTPUT_INVALID`. Tras un 422/502/timeout, el claim puede quedar `pending` diez minutos y responder 202 a un retry que ya no está procesándose.  
   **Fix concreto:** definir y probar la máquina de estados:
   ```ts
   type ClaimFailure = {
     code: ReportV1ErrorCode;
     retryable: boolean;
     http_status: number;
     failed_at: string;
   };
   ```
   Todo catch posterior a crear el claim intenta CAS de su generación `pending → failed`. Para el mismo hash: `failed + retryable:false` reproduce el mismo código/status sin Vertex; `failed + retryable:true` permite CAS a un nuevo `pending`; `pending` sólo retorna 202 si conserva lease vigente; `complete` devuelve el reporte validado. Definir qué códigos son retryable y el resultado si el CAS de fallo pierde contra `complete` u otro owner.

7. **MEDIUM — La cobertura de objetivos ABCD no coincide con los objetivos reales y deja ambiguo el adapter legacy.**  
   **Dónde:** `ReportMetadata.objective_key`, fórmula de score, Acceptance Criterion 7 y `Compatibilidad con CompassData`.  
   El source real contiene `PROMPTS.abcdBusinessObjectives.shorts` con máximo 17 y los tipos frontend/backend existentes aceptan `shorts`; el formulario actual también usa `engagement`, mientras el fallback usa `general`. El diseño declara sólo `awareness|consideration|action|engagement|general`, afirma haber verificado el objective map y no dice qué pasa si un `CompassData` histórico trae `shorts`. Por tanto el adapter puede rechazar silenciosamente una entrada hoy válida o asignar un máximo incorrecto.  
   **Fix concreto:** definir una tabla canónica única y cubrir todos los keys runtime existentes:
   ```ts
   const OBJECTIVES = {
     awareness: { rawMax: 15 }, consideration: { rawMax: 15 },
     action: { rawMax: 18 }, shorts: { rawMax: 17 },
     engagement: { rawMax: 20 }, general: { rawMax: 20 },
   } as const;
   ```
   Derivar de ella el enum/schema, `raw_max` y tests. Si producto decide excluir `shorts` de v1, el diseño debe escogerlo expresamente y el adapter debe devolver `legacy-incomplete` con `LEGACY_OBJECTIVE_UNSUPPORTED`, nunca inferir `general`.

8. **MEDIUM — El prompt ABCD protegido contiene un catálogo de formatos incompatible con el catálogo fijo nuevo y no existe una regla para impedir que se filtre al reporte.**  
   **Dónde:** `Catálogo fijo único`, `Ownership de ABCD` y arquitectura de prompts.  
   El prompt real protegido pide sugerir Branded Bar, Video Card, Canvas, Amplification y QR Code dentro de tarjetas ABCD/fortalezas/debilidades. El diseño simultáneamente prohíbe modificar ese prompt, promete conservar su salida y exige que las únicas recomendaciones de formato sean InBanner Video, Hands-Free Carousel, Loopbook, QR Format y BrandLift. Sin una frontera explícita, nombres legacy pueden aparecer como recomendaciones renderizadas aunque el array `creative_services.catalog` sea correcto.  
   **Fix concreto:** declarar que el raw ABCD es evidencia inmutable, no autoridad de catálogo. Sólo estos campos pueden expresar una recomendación de formato: `Adaptation.recommended_format_id` y `CreativeServiceRecommendation.format_id`, ambos validados contra la constante fija. Los stages downstream deben recibir del ABCD únicamente señales/textos sin extraer formatos; cualquier `formatos_wpp_sugeridos` legacy se conserva sólo dentro de `raw_evaluation` y `ReportV1PresentationAdapter` no lo renderiza como servicio/adaptación. Añadir un test con “Canvas” y “Video Card” en el raw que confirme que no aparecen en catálogo, recomendaciones ni tarjetas de adaptación.

9. **MEDIUM — El contrato de métricas Geo sin evidencia es contradictorio y deja al implementador inventar qué tarjetas crear.**  
   **Dónde:** Acceptance Criterion 10, `GeoMetric`, diccionario de campos e integración View 3.  
   El schema permite `metrics: []`, pero el criterio exige “métricas `value:null/status:'unknown'`” y el texto habla de “metrics unknown solicitadas por UI” sin enumerar IDs, labels o unidades. La View 3 actual tiene hardcodes concretos (`Habitantes`, `92% Conexión digital`, `4.2 h Consumo de video diario`, `68% Interés en bienestar`), y además etiqueta erróneamente la audiencia CSV como habitantes. Un coder podría mantener esos cuatro labels con null, inventar otro catálogo o devolver `[]`; todas caben en el diseño.  
   **Fix concreto:** escoger una política. La opción más honesta sin catálogo de métricas confirmado es:
   ```ts
   // Sin evidencia pública válida:
   territory.metrics = [];
   territory.data_gap_ids.push(noGeoEvidenceGapId);
   // audience_estimate se muestra aparte como “Adultos estimados del input”, nunca “Habitantes”.
   ```
   View 3 muestra un único estado “No hay métricas territoriales verificadas” y sólo crea una tarjeta por cada `GeoMetric.status === 'verified'` con sources válidas. Actualizar AC-10 y los tests para exigir `[]`, no slots desconocidos. Si se prefieren slots fijos, el diseño debe listar exhaustivamente `metric_id`, label, unit y source policy de cada uno.

10. **MEDIUM — El adapter legacy referencia tipos y fuentes de contexto no definidos, por lo que el entregable C aún requiere decisiones de diseño.**  
    **Dónde:** `Compatibilidad con CompassData` y archivos del frontend.  
    `adaptLegacyCompassData(input, context)` no define `context`, `LegacyReportViewModel` ni qué campos puede aportar el contexto externo para H3, provenance, IDs y timestamps. El `CompassData` real sólo contiene meta/contexto, ABCD, territorios textuales y testing; no tiene los H3 completos, source registry, evidence registry ni links requeridos por v1. Decir “si faltan, legacy-incomplete” es correcto, pero no basta para construir la vista coexistente ni para saber cuándo el union puede devolver `kind:'v1'`.  
    **Fix concreto:** añadir tipos y una tabla de mapeo total:
    ```ts
    type LegacyAdapterContext = {
      imported_at: string;
      input_source: InputSource;
      ordered_top_five: OrderedTopFiveInput | null;
      video_evidence: VideoSource | null;
    };
    type LegacyReportViewModel = {
      metadata: LegacyMetadataVm;
      overview: LegacyOverviewVm | null;
      territories: LegacyTerritoryVm[];
      issues: Array<{ path: string; rule: string }>;
    };
    ```
    Para cada propiedad v1, marcar `legacy path`, `context path`, `deterministic constant` o `not derivable`. Sólo devolver `kind:'v1'` si el schema final y `validateReportSemantics` pasan; en cualquier otro caso View 3 usa exclusivamente el `LegacyReportViewModel` honesto. Añadir contract tests con 4/5 territorios, audiencia textual, objetivo `shorts`, formatos legacy y ausencia de provenance.

## Supuestos verificados

- El PDF citado existe, PDFKit lo abre, tiene 22 páginas y sus primeras secciones confirman el journey Entiende → Contextualiza → Descubre → Adapta → Test & Learn, el cruce creatividad/territorio/campaña, KEEP/EXPLORE/ADAPT y comparación original/adapted.
- `PROMPTS.fullVideoEvaluationPrompt` existe y solicita exactamente un array JSON con score raw, cuatro tarjetas ABCD, fortalezas/debilidades, señales, elementos visuales y escenas/momentos. `CONFIG.vertexAi.modelParams` confirma `temperature:1`, `topP:1`, `maxOutputTokens:8192` y `thinkingBudget:0`.
- La llamada ABCD actual vive en Angular: `app.component.ts` invoca `generateVariants(... fullVideoAnalysis:true)`. El backend actual no tiene `evaluateFullVideo`; `generateVariants()` usa regex, hasta cinco generaciones lógicas y no copia al response varios campos pedidos por el prompt. La propuesta de un owner backend único sí es necesaria, pero debe aplicar el fix del hallazgo 2.
- El contrato legacy `CompassData` y los endpoints `/api/compass/geo-intelligence` y `/api/compass/prioritization` existen. Las respuestas Compass actuales son strings JSON de Vertex y no están validadas por schema.
- El parser Geo actual usa `parseInt(...) || 0`, agrupa por `${estado}-${municipio}`, ordena por audiencia y genera Top 30; no tiene la validación estricta propuesta. Esto confirma la necesidad de separar validación/enrichment de la captura del ranking ya decidido.
- View 3 contiene datos factuales hardcodeados y mocks en la ruta normal, y `territory-modal.adapter.ts` inventa relevancia, taxonomía y preview por índice. El modal map usa hoy el `h3MapData` global. Los cambios de adapter/empty states y subset de mapa descritos por el diseño son necesarios.
- Los cinco assets del catálogo fijo existen en `ui/src/ui/src/assets/formats/`: `inbanner_video.png`, `handsfree_carousel.png`, `loopbook.png`, `qr_format.png` y `brandlift.png`.
- Producción ya configura `enableReportMocks:false`; development usa `enableReportMocks:true` y sustituye el servicio real por el mock. Por ello la condición adicional `?mock=report` debe aplicarse a **todos** los fallbacks de sección, no sólo al auto-salto inicial.
- El backend actual usa Express 5.2.1, TypeScript 5.9.3, GCS y Vertex REST; `server.ts` instala hoy el parser global de 50 MB, `storage.ts` no tiene operaciones CAS/create-only y `vertex.ts` reintenta 429 recursivamente. Los cambios técnicos propuestos en esas áreas son factibles y necesarios.
- Angular carga actualmente H3 4.1.0 desde CDN mediante `declare const h3`; MapLibre 3.6.2 y Deck.GL 9.3.5 también se cargan en runtime. Añadir `h3-js` directo sin sustituir mapa/Deck.GL es compatible con la preservación solicitada.

## Supuestos no verificados o incorrectos

- **Incorrecto:** “el Top 5 se captura durante el parseo del CSV” no honra la decisión confirmada. El ranking debe llegar ya ordenado desde la lógica de entrada y el CSV sólo debe enriquecer/validar.
- **Incorrecto:** “se conserva toda la salida ABCD” no es cierto con el árbol contractual escrito; faltan campos raw y las tarjetas se transforman.
- **Incorrecto:** el objective map descrito como verificado está incompleto porque omite `shorts`/17, presente en prompts y tipos existentes.
- **Incorrecto:** 10,000 H3 por territorio con geometría duplicada no es compatible con un body máximo de 5 MB.
- **No verificado:** no hay evidencia de que una fuente con `published_at:null` satisfaga la provenance completa ni una regla que impida usarla para facts verificados.
- **No verificado:** no está definido que cualquier excepción o bundle inválido del futuro provider termine de forma fail-closed; sólo disabled/empty/timeout tienen comportamiento escrito.
- **No verificado:** no existe transición especificada que garantice que un claim deje `pending` después de errores terminales.
- **No verificado:** no se define el origen concreto y el shape de `LegacyAdapterContext`, por lo que no puede comprobarse cuándo un `CompassData` legacy alcanza un v1 válido.
- **Verificado como ausente en la implementación actual:** todavía no existen schema v1, fixture, Ajv, provider Geo, endpoint v1, CAS GCS ni tests backend. Esto es esperable antes de implementación, pero obliga a que los contratos corregidos sean la fuente de verdad y no se apoyen en helpers existentes como si ya ofrecieran esas garantías.

## Cobertura de decisiones vinculantes y entregables A–H

- El diseño cubre correctamente, sujeto a los hallazgos, el contrato versionado `creative-intelligence-report.v1`, catálogo fijo de cinco formatos, adaptaciones textuales, testing pendiente con resultados null, provider disabled/fixture sin llamadas productivas falsas, estados honestos de View 3, preservación de mapa/modal/H3/wizard/WIP y coexistencia legacy.
- La arquitectura separa normalización determinista de stages generativos, exige JSON-only, valida con schema/Ajv y limita transport retries y repair. El vacío de excepciones Geo del hallazgo 5 debe cerrarse para que esa garantía sea total.
- A–H tienen rutas y responsabilidades concretas: A documentación; B schema/fixture; C tipos/validadores/adapter; D prompts/orquestador/API/provider; E persistencia; F Angular; G preservación WIP/componentes; H tests/builds. Los hallazgos 1–10 afectan principalmente B–F y H y deben incorporarse antes de codificar para que esos entregables sean inequívocos y buildables.
