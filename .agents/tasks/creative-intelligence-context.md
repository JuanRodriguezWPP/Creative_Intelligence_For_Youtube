# Informe de contexto: Creative Intelligence × Advanced TV / YouTube

## Resumen ejecutivo

El repositorio es una migración híbrida de una aplicación originalmente basada en Apps Script hacia una aplicación Angular + Express/TypeScript, con Google Cloud Storage (GCS) como persistencia de videos/resultados y Vertex AI/Gemini como motor de generación y evaluación. El flujo verificable en código cubre carga de videos, lectura de resultados producidos por el servicio Python, evaluación ABCD, generación de variantes, reframing/previews, render queue, assets de texto, ideas de YouTube y una capa Compass para geo-inteligencia/priorización.

La correspondencia con el documento funcional es parcial. La etapa 01 (Visual Intelligence / Creative Overview) es la más desarrollada: existen análisis de escenas y momentos, transcripción, señales visuales, ABCD y score. La etapa 02 (Activation Context) está representada por el formulario de campaña/marca y GeoKeys, y se inyecta en prompts. La etapa 03 (Opportunity Intelligence) y la etapa 04 (Creative Adaptation) tienen tipos, vistas y prompts/mock data, pero no existe una implementación completa y persistente del modelo Hallazgo → Evidencia → Insight → Oportunidad ni una API específica que produzca/adapte variaciones por territorio. La etapa 05 (Test & Learn) dispone de un modelo de testing y una vista de resultados, pero no se verificó activación, experimento, medición ni comparación original-versus-variante.

La principal limitación de esta investigación es que el PDF funcional solicitado no pudo extraerse localmente: se resolvió su nombre exacto como `Creative Intelligence\x0bAdTV Youtube Draft-2.pdf`, pero no están instalados `pdfinfo`/`pdftotext` ni bibliotecas Python de PDF disponibles. Por tanto, el modelo funcional usado para la comparación es el contenido funcional suministrado en la solicitud, no una lectura independiente del texto incrustado del PDF. No se modificó ningún archivo salvo este informe.

## Metodología y archivos revisados

- Documentación: `README.md`; PDF funcional con separador de control en el nombre; búsqueda de `AGENTS.md`, `CONTRIBUTING` y `.kiro/steering` (no se encontraron esos archivos); `Dockerfile` y `.gitignore`.
- Entrada/configuración: `package.json`, `tsconfig.json`, `common.ts`, `index.ts`.
- Backend completo bajo `api-server/src/`: `server.ts`, `config.ts`, `storage.ts`, `logging.ts`, `preview.ts`, `generation.ts`, `prompts.ts`, `types.ts`, `string-util.ts`, `time-util.ts`, `test.ts` y las rutas `storage.routes.ts`, `generation.routes.ts`, `data.routes.ts`, `compass.routes.ts`.
- Frontend relevante: `ui/src/ui/package.json`, `angular.json`, `app.component.ts`, `app.component.html`, `app.component.spec.ts`, `api-calls.service.ts`, `api-calls.service.interface.ts`, `api-calls.mock.service.ts`.
- Comprobaciones seguras: `git status --short`, `git ls-files` para conocer el estado inicial y búsqueda estática de símbolos/rutas. El intento de extracción PDF falló por herramientas ausentes. Los intentos de build fueron rechazados por el entorno de ejecución, por lo que no se puede afirmar un build exitoso.

## Mapa documentación → implementación

| Elemento funcional del documento | Evidencia en código | Estado verificable |
|---|---|---|
| Cadena Advanced TV (datos/audiencias/territorios/activación) → Creative Intelligence → Creative Services → Activación | Formulario Compass y campos de GeoKeys en `ui/src/ui/src/app/app.component.html`; procesamiento H3/PapaParse en `app.component.ts`; `generateYoutubeIdeas` y prompts de Creative Services en `api-server/src/generation.ts`/`prompts.ts`; render queue en `generation.routes.ts`. | Parcial: la UI y algunos prompts existen; no hay prueba de una cadena completa end-to-end ni una activación de medios.
| 01 Entiende / Visual Intelligence | `service/main.py` es el motor Python descrito por `README.md`; consume/produce `analysis.json`, `data.json`, VTT y segmentos. `preview.ts` interpreta Video Intelligence; `generation.ts` crea `videoScript`; prompts ABCD y `fullVideoEvaluationPrompt` en `prompts.ts`; `CompassData.evaluacion_creativa` en `types.ts`. | Parcialmente implementado y dependiente de resultados externos en GCS. No se verificó ejecución con un video real.
| Creative Overview, ABCD Score y Atención/Branding/Conexión/Dirección | `GenerateVariantsResponse`, `CompassData.evaluacion_creativa`, `CompassAbcdDimensiones` en `types.ts`; prompts exigen una tarjeta ABCD por dimensión; UI muestra score, fortalezas, oportunidades y dimensiones en `app.component.ts/html`. | Implementado como contrato y presentación; el resultado real depende de Vertex y del JSON que entregue.
| 02 Contextualiza / Activation Context | Campos de marca, campaña, objetivo, audiencia, tono, mercado y consideraciones en `app.component.ts/html`; `GenerationHelper.resolveGenerationPrompt` inyecta `campaignContext` y `brandParams`; `CompassData.contexto_campania`. | Implementado en UI/prompt; no hay esquema runtime ni almacenamiento específico del brief salvo el objeto de sesión/informe.
| GeoKeys, agrupación territorial y territorios prioritarios | `onGeoCsvSelected` usa PapaParse y H3: agrupa geokeys, municipios, top 30 zonas y top 20 clusters; `GeoKeyInsights`, `V2GeoIntelligence` y `V2Territory` en tipos; endpoint `/api/compass/geo-intelligence`. | Parcial: agrupación local y generación de texto existen; calidad geográfica, validación de CSV y persistencia no están cubiertas por tests.
| 03 Descubre / Opportunity Intelligence | `generateGeoIntelligence`, `generatePrioritization` y `V2GeoOportunidadCreativa`; prompts Compass; pestañas de contexto/oportunidades/adaptaciones en el modal territorial. | Parcial/prototipo: no existe endpoint de “opportunity intelligence” independiente ni un modelo explícito general de Hallazgo/Evidencia/Insight/Oportunidad. La priorización devuelve texto JSON de Vertex y la UI lo interpreta.
| 04 Adapta / KEEP, EXPLORE, ADAPT | La UI y mock de `generateGeoIntelligence` usan `do`, `keep`, `explore`; `V2GeoOportunidadCreativa` contiene diagnóstico, solución, formato y elementos de adaptación; generación real produce variantes por escenas y formatos. | No equivalente completo: KEEP/EXPLORE aparecen en mocks, pero no se encontró una taxonomía `ADAPT`, workflow de aprobación territorial ni endpoint que materialice una variación territorial específica.
| Creative Services/formats y preview | `RenderSettings`, formatos `16:9`, `9:16`, `1:1`, `3:4`, `4:3`; `PreviewHelper` crea crop analysis; `render-variants` escribe cola y comandos de crop; assets de formatos/territorios en UI. | Implementado para reframing/render pipeline; Creative Services del documento no está conectado a una catalogación/entrega formal de formatos.
| 05 Test & Learn | `V2TestingFrameworkItem` con `variante`, `hipotesis`, `metricas_exito`; `CompassData.testing_framework`; procesamiento en `app.component.ts`; pestaña de testing en HTML. | Parcial, analítico: no se encontraron endpoints de activación, exposición de variantes, ingestión de KPI, experimento ni comparación cuantitativa.
| Reporte con tabs Contexto, Oportunidades, Adaptaciones | Estado `activeTerritoryTab`, `CompassData`, métodos de edición/restauración y exportación `buildInsightsPayload` en `app.component.ts`; modal territorial en `app.component.html`. | Presentación/exportación parcial; no se verificó un reporte remoto. `sendInsightsReport` retorna `of('Success')` en el servicio real.

## Arquitectura actual y entry points

1. **Orquestador raíz de despliegue.** `index.ts` solicita proyecto GCP, regiones, despliegue de componentes y UI; `common.ts` ejecuta `gcloud`, Terraform/script de servicio y `clasp`. `package.json` raíz usa `npm run build` para compilar ese orquestador a `dist`.
2. **Frontend.** Angular 17 en `ui/src/ui`; `main.ts` y `app.config.ts` son entry points Angular. `AppComponent` concentra gran parte de la UI, estado del flujo, Compass, mapas, carga, evaluación, render y exportación. `angular.json` define `ng build`, `ng test` y assets.
3. **Backend.** `api-server/src/server.ts` crea Express, carga dotenv, CORS y JSON de hasta 50 MB, sirve Angular desde `public`, expone `/api/health`, monta cuatro routers y arranca en `PORT || 3000`. El Dockerfile compila Angular, compila el backend y sirve ambos en una imagen Node 20.
4. **Persistencia.** `storage.ts` inicializa `new Storage()` y un bucket configurado por `GCS_BUCKET`; lee/escribe/lista/mueve/borra objetos. La carpeta de cada video y sus JSON funcionan como modelo de datos implícito.
5. **IA.** `vertex.ts` construye el endpoint REST de Vertex, obtiene ADC con `google-auth-library`, llama `streamGenerateContent`, adjunta `gs://` de video o CSV inline y reintenta 429 recursivamente. `generation.ts` compone prompts, lee `data.json`/`analysis.json`, parsea JSON de Gemini, genera variants, assets de texto, ideas, geo-intelligence y priorización.
6. **Procesamiento de video.** Según `README.md` y `service/main.py`, una Cloud Function Python reacciona a objetos GCS y ejecuta extracción de audio/video, transcripción, Video Intelligence, segmentación y render. El backend Node no realiza esa extracción: consume sus artefactos.

## Responsabilidades y rutas API

### `storage.routes.ts`

- `GET /api/runs`: lista carpetas raíz y usa `x-user-id` o `default-user`; no hay autenticación/autoridad de usuario en backend.
- `GET /api/renders/:gcsFolder`: lista subcarpetas `*-combos`.
- `DELETE /api/folder/:folder`: elimina todos los archivos de una carpeta.
- `GET /api/video-language/:gcsFolder`: lee `language.txt`.
- `GET /api/gcs-file?path=...`: descarga cualquier ruta recibida al bucket configurado.
- `POST /api/get-upload-url`: crea signed URL de escritura por 15 minutos.
- `POST /api/upload`: fallback de subida base64.

### `generation.routes.ts`

- `POST /api/generate-variants`: genera combinaciones con Vertex a partir de escenas y contexto.
- `POST /api/generate-previews`: crea análisis de recorte square/vertical y ratios soportados.
- `POST /api/render-variants`: escribe crop commands y `render.json` en una nueva carpeta de combos; el render real lo ejecuta el servicio Python por eventos GCS.
- `POST /api/regenerate-text-asset` y `POST /api/generate-text-assets`: generan copy vía Vertex.

### `data.routes.ts`

- `POST /api/store-approval`: escribe `approval.json`.
- `POST /api/split-segment`: renombra `data.json` a `presplit_data.json` y escribe un `_split.json` con markers.
- `POST /api/update-transcription`: escribe VTT y sustituye transcripciones solapadas en `data.json`.

### `compass.routes.ts`

- `POST /api/youtube-ideas`: genera ideas generales, por categoría o GeoKey.
- `POST /api/compass/geo-intelligence`: genera inteligencia territorial con contexto y JSON macro/micro.
- `POST /api/compass/prioritization`: genera priorización.
- El frontend declara `generateChannelIntelligence()` y el health check anuncia `POST /api/compass/channel-intelligence`, pero `compass.routes.ts` no registra esa ruta y `generation.ts` no implementa el método correspondiente. Esto es una discrepancia concreta frontend/backend.

## Modelos y flujo de datos

- El artefacto base es un folder GCS por ejecución. `CONFIG.cloudStorage.files` define `analysis.json`, `data.json`, `input.vtt`, `presplit_data.json`, `_split.json`, `render.json`, `approval.json` y archivos de formatos.
- `AvSegment` en `generation.ts` incluye descripción, shots, transcript, labels, objects, text, logos, keywords y tiempos. `createVideoScript()` transforma esos campos en el guion textual que alimenta Gemini.
- `GenerationSettings` combina prompt libre, prompt ABCD, duración, recorte, brand params y `campaignContext`. `resolveGenerationPrompt()` decide entre prompt de acortamiento, aspect ratio o evaluación completa.
- `GenerateVariantsResponse` conserva escenas, score, ABCD, duración, fortalezas, debilidades, insight y proyección. `CompassData` agrega `meta`, `contexto_campania`, `evaluacion_creativa`, `geo_intelligence` y `testing_framework`.
- La UI arma inicialmente un `CompassData` con campos nulos, carga el análisis completo y luego llama geo/testing. En `app.component.ts` se observan comentarios explícitos de “INYECTAR MOCK DATA PARA GEO_INTELLIGENCE Y TESTING FRAMEWORK”, por lo que una pantalla puede mostrar datos aunque la API no haya producido esos resultados.

## Estado por etapa del journey

### 01 — Entiende / Visual Intelligence

**Hechos verificados:** el servicio Python está documentado para extraer escenas, audio, transcripción y Video Intelligence. `preview.ts` procesa shots, caras, objetos y texto con bounding boxes y confianza. `generation.ts` lee `data.json`, genera un guion de escenas y ejecuta evaluación completa mediante `fullVideoEvaluationPrompt`. `prompts.ts` exige score ABCD, tarjetas de cuatro dimensiones, fortalezas, oportunidades, insight y proyección.

**Inferencia:** esto puede producir un Creative Overview funcional cuando el bucket contiene los artefactos esperados y Vertex responde con JSON válido.

**No verificable:** no se ejecutó contra un video/GCS real, no se confirmó que la Cloud Function esté desplegada ni que el JSON producido por ella coincida siempre con las interfaces.

### 02 — Contextualiza / Activation Context

**Hechos verificados:** el formulario solicita marca, campaña, país, solicitante, fecha, objetivo, objetivo de negocio, audiencia, tono, descripción, comentarios, lineamientos y consideraciones. GeoKeys se procesa con PapaParse/H3. `campaignContext` y `brandParams` se inyectan en el prompt de evaluación/generación.

**Vacíos:** `campaignContext` es `any`; no hay validación de esquema servidor; el tipo formato está oculto en el HTML aunque el documento lo considera parte del contexto; no hay persistencia transaccional del brief como entidad propia.

### 03 — Descubre / Opportunity Intelligence

**Hechos verificados:** hay prompts Compass, geo-intelligence, priorización, territorios, audiencia, recomendaciones y tarjetas de oportunidades en mocks/tipos. La UI calcula rankings macro y clusters micro.

**Vacíos:** la cadena del documento Hallazgo → Evidencia → Insight → Oportunidad no tiene un contrato común ni un endpoint separado. El modelo territorial sí contiene diagnóstico y solución, pero no requiere evidencia trazable a timestamp/escena, confidence, fuente o KPI. La respuesta de Vertex se limpia de Markdown pero no se valida con un schema.

### 04 — Adapta / Creative Adaptation

**Hechos verificados:** existe generación de variantes por selección de escenas y duración, adaptación de aspect ratio, crop analysis y formatos. Existen ejemplos visuales de territories/formats y campos `formato_sugerido`/`elementos_de_adaptacion`.

**Vacíos:** el pipeline de variantes no recibe territorio como dimensión de primera clase; `generateVariants` recibe folder/settings y no una oportunidad territorial estructurada. KEEP/EXPLORE aparecen en mocks y prompts, mientras ADAPT no aparece como estado formal. No hay vínculo persistido entre una oportunidad, una recomendación, una variante y su preview/aprobación territorial.

### 05 — Test & Learn

**Hechos verificados:** `V2TestingFrameworkItem` expresa recomendación, variante, hipótesis y métricas de éxito; la UI intenta obtener este framework mediante Vertex y lo muestra/exporta.

**Vacíos:** no se encontró modelo de experimento, asignación de tráfico, integración de plataforma de activación, captura de impresiones/views/KPI, significancia, comparación original/variante o aprendizaje retroalimentado al prompt. `sendInsightsReport` en `api-calls.service.ts` devuelve éxito local mediante `of('Success')` y no envía un reporte.

## Discrepancias, placeholders y acoplamientos

1. **Ruta declarada pero inexistente:** `server.ts` anuncia `/api/compass/channel-intelligence`; el contrato Angular la invoca; `compass.routes.ts` no la implementa. Una llamada real recibe el catch-all no-API? Al estar bajo `/api`, termina en el siguiente middleware sin respuesta explícita, por lo que debe corregirse antes de considerar completo el pipeline.
2. **Mock data en la ruta principal:** `app.component.ts` inyecta datos de geo/testing para que la vista renderice aunque la API no responda. Esto puede ocultar fallos y hace incorrecta la afirmación de que el reporte refleja datos reales.
3. **Contrato divergente:** `CompassData` exige `meta` con un conjunto fijo de campos, pero el mock observado incluye propiedades adicionales y se fuerza con `as any`. La respuesta de Gemini se parsea dinámicamente, sin `zod`/JSON Schema ni validación de tipos.
4. **Backend y frontend desacoplados en modelos:** hay duplicación de tipos en `api-server/src/types.ts` y `ui/src/ui/src/app/api-calls/api-calls.service.interface.ts`; pueden divergir (por ejemplo, frontend tiene `PreviousRender`, backend no lo usa). `AvSegment` del backend es rico y el contrato UI es más reducido.
5. **Migración incompleta de Apps Script:** comentarios y métodos conservan compatibilidad, pero `sendInsightsReport` es placeholder; `getUserAuthToken` devuelve un token dummy; identificación por `x-user-id` no reemplaza autenticación.
6. **Generación frágil:** `generation.ts` acepta el primer bloque que parezca `[...]`, convierte campos con `String/Number` y reintenta hasta cinco veces; no valida que todos los campos ABCD, escenas, score y duración cumplan un schema. `vertex.ts` reintenta 429 recursivamente sin límite explícito de intentos.
7. **Semántica de preview susceptible a errores:** `getFrameObjectInfo` divide por `windowDuration`, que puede ser cero; `getAllTextFrames` fuerza `rotated_bounding_box`; `generate-previews` produce `square`/`vertical` con JSON serializado y además ratios equivalentes, lo que requiere contrato claro en el consumidor.
8. **El render es asíncrono externo:** `/render-variants` solo escribe la cola/commands; el resultado depende de la Cloud Function Python. No existe endpoint de estado de render ni error callback.
9. **UI muy concentrada:** `AppComponent` contiene formulario, carga CSV, mapas externos, análisis, Compass, edición, exportación y render. Esto dificulta pruebas aisladas y hace que mocks y lógica de presentación alteren la evaluación funcional.

## Riesgos y limitaciones

- **Credenciales:** existe `api-server/.env` con configuración de GCP y referencia a `GOOGLE_APPLICATION_CREDENTIALS`, y existe `api-server/gcp-key.json` con material de cuenta de servicio. `git ls-files` confirmó ambos nombres como archivos versionados. No se imprimen valores sensibles en este informe. Debe asumirse exposición potencial: revocar/rotar la cuenta, eliminar secretos del historial, agregar exclusiones específicas y usar Secret Manager/Workload Identity.
- **Defaults peligrosos:** `api-server/src/config.ts` incluye defaults concretos para proyecto y bucket cuando faltan variables. En un entorno mal configurado podría leer/escribir el bucket equivocado.
- **CORS y acceso:** `server.ts` usa `cors()` abierto; rutas destructivas y de descarga no muestran autenticación ni autorización por folder. `/api/gcs-file` acepta una ruta arbitraria del bucket configurado y `DELETE /folder` elimina recursivamente.
- **Signed URLs:** `/get-upload-url` acepta folder, filename y content type del cliente sin límites visibles de extensión, prefijo de usuario o autorización; una URL de escritura de 15 minutos puede ser abusada.
- **Logs y datos:** `generation.ts` registra prompts/respuestas completas de Gemini con `AppLogger.info`; puede incluir video context, briefs, datos territoriales o PII. `CONFIG.debug` está en `true`.
- **Entrada grande:** `express.json({limit:'50mb'})` conserva un fallback base64 costoso; aunque la UI usa signed upload, el endpoint sigue expuesto.
- **Dependencia de red/CDN:** la UI carga mapas/scripts externos desde `unpkg.com` y recursos de CDN; esto afecta reproducibilidad, CSP y privacidad.
- **Verificación limitada:** `api-server/package.json` define `test` como comando que falla intencionalmente (`no test specified`). Angular tiene specs mínimos y `ng test` requiere navegador/Karma. No hay evidencia de pruebas end-to-end, contratos, fixtures de Vertex/GCS o pruebas del servicio Python.
- **Estado de trabajo previo:** al iniciar la investigación `git status` ya mostraba modificaciones en varios archivos de backend/frontend y PDFs/assets no rastreados. No se alteraron ni revirtieron esos cambios; cualquier implementación posterior debe preservar y revisar ese baseline.

## Recomendaciones priorizadas

### P0 — Seguridad y operabilidad

1. Revocar/rotar inmediatamente la cuenta de servicio referenciada por `api-server/gcp-key.json`; retirar `.env` y la clave del repositorio/historial si corresponde; usar Secret Manager o identidad del runtime. Añadir reglas `.gitignore` para `.env*` y claves, sin depender solo de convenciones.
2. Añadir autenticación/autorización server-side y control de prefijos por usuario/campaña para `runs`, `gcs-file`, signed uploads y delete. Restringir CORS, validar filename/folder y aplicar tamaño/tipo permitido.
3. Eliminar defaults de proyecto/bucket reales y fallar al arrancar si faltan variables requeridas. Desactivar logs de prompts/respuestas y `debug` en producción; redactar PII.

### P1 — Cerrar el contrato Creative Intelligence

4. Definir un schema versionado único para `CompassData` y separar entidades `CreativeOverview`, `ActivationContext`, `Opportunity`, `Adaptation`, `Experiment` y `Evidence`. Compartir tipos generados o un paquete común, evitando duplicación frontend/backend.
5. Implementar `/api/compass/channel-intelligence` o eliminarlo de interfaz/health check; después añadir validación de request/response y pruebas de contrato.
6. Sustituir la inyección automática de mock data por estados explícitos `loading/success/error/empty`. Conservar mocks únicamente detrás de un modo de desarrollo visible y no mezclar resultados sintéticos con reportes reales.
7. Añadir evidencia trazable a cada insight/oportunidad: escenas, timestamps, señales detectadas, fuente (`analysis.json`/GeoKeys), confianza y KPI relacionado. Formalizar estados KEEP/EXPLORE/ADAPT y su relación con preview, formato, aprobación y variante.

### P2 — Completar adaptación y medición

8. Crear una operación de adaptación territorial que reciba una oportunidad aprobada, contexto/territorio, formato y reglas de marca, y que devuelva variante, preview, assets y metadata de lineage. Persistir la relación entre original, oportunidad y variante.
9. Modelar Test & Learn como experimento: hipótesis, control, variante(s), audiencia/territorio, ventana, KPI, fuente de medición, resultados y aprendizaje. Integrar el sistema de activación/medición o dejar explícitamente el módulo como export-only.
10. Implementar reporte real o marcar exportación como local; `sendInsightsReport` debe tener un backend definido si el producto requiere entrega remota.

### P3 — Calidad técnica

11. Separar `AppComponent` en servicios/componentes de formulario, Compass, mapas, resultados y render; añadir tests unitarios para parsing VTT, agrupación H3, previews, prompts y normalización de Vertex.
12. Añadir validación robusta de JSON de Gemini, límites de reintento/backoff, timeouts, idempotencia de render y endpoint de estado. Ejecutar y documentar `npm run build` raíz, `npm run build` backend, `npm run build` Angular y suites de tests en CI.

## Conclusión

El proyecto ya contiene una base de producto convincente para Creative Intelligence: análisis ABCD y de escenas, contexto de campaña, GeoKeys/H3, priorización, generación de variantes, formatos y una UI de reporte. Sin embargo, la evidencia del repositorio corresponde a una migración/prototipo en evolución, no a la implementación completa del journey del documento. Para llegar a “from signals to creative decisions” verificable, la prioridad es asegurar el runtime, eliminar mocks silenciosos, cerrar los contratos/API discrepantes y construir el lineage explícito entre evidencia, oportunidad, adaptación y experimento medido.
