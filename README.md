# ViGenAiR — Guía de Despliegue Completa

> **ViGenAiR** (Video Generation with AI for Recrafting) es una herramienta que usa Inteligencia Artificial para analizar videos publicitarios, extraer sus escenas, generar variantes optimizadas y crear activos de texto para campañas de Demand Gen.

---

## Tabla de Contenidos

1. [¿Cómo funciona el proyecto?](#1-cómo-funciona-el-proyecto)
2. [Requisitos previos](#2-requisitos-previos)
3. [Estructura del proyecto](#3-estructura-del-proyecto)
4. [Parte 1 — Desplegar la infraestructura y el motor Python](#4-parte-1--desplegar-la-infraestructura-y-el-motor-python)
5. [Parte 2 — Desplegar la aplicación web (Node.js + Angular)](#5-parte-2--desplegar-la-aplicación-web-nodejs--angular)
6. [Desarrollo local](#6-desarrollo-local)
7. [Actualizar producción](#7-actualizar-producción)
8. [Variables de entorno](#8-variables-de-entorno)
9. [Solución de problemas comunes](#9-solución-de-problemas-comunes)

---

## 1. ¿Cómo funciona el proyecto?

ViGenAiR tiene **dos partes** que trabajan juntas a través de un Bucket de Google Cloud Storage (GCS):

### Motor de Procesamiento de Video (Python)
- **Carpeta:** `service/`
- **Se despliega como:** Google Cloud Function (Gen 2)
- **¿Qué hace?** Está "dormido" esperando. Cuando un usuario sube un video al Bucket, esta función se despierta automáticamente y:
  1. Extrae el audio del video
  2. Transcribe el audio usando Whisper o Gemini
  3. Analiza el video con la API de Video Intelligence (detección de objetos, escenas, etc.)
  4. Divide el video en segmentos (escenas)
  5. Guarda todos los resultados como archivos `.json` de vuelta en el Bucket

### Aplicación Web (Node.js + Angular)
- **Carpeta:** `api-server/` (backend) y `ui/` (frontend)
- **Se despliega como:** Google Cloud Run (un contenedor Docker)
- **¿Qué hace?** Es la interfaz que ve el usuario. Le permite:
  1. Subir videos al Bucket (lo que activa automáticamente el motor Python)
  2. Ver los resultados del análisis (los `.json` que generó Python)
  3. Generar variantes de video con IA (usando Vertex AI / Gemini)
  4. Previsualizar y renderizar los videos finales
  5. Generar ideas de YouTube y análisis de competencia (Compass)

### Diagrama simplificado del flujo

```
Usuario                                              
  │                                                   
  │  Abre la URL                                      
  ▼                                                   
┌──────────────────────────────────┐                  
│  Cloud Run (Node.js + Angular)   │                  
│  - Muestra la interfaz           │                  
│  - Recibe peticiones del usuario │                  
│  - Llama a Vertex AI (Gemini)    │                  
│  - Lee/escribe en el Bucket      │                  
└───────────────┬──────────────────┘                  
                │                                      
                │  Sube un video                       
                ▼                                      
┌──────────────────────────────────┐                  
│  Google Cloud Storage (Bucket)    │                  
│  - Almacena videos y resultados  │                  
└───────────────┬──────────────────┘                  
                │                                      
                │  Se activa automáticamente            
                ▼                                      
┌──────────────────────────────────┐                  
│  Cloud Function (Python)          │                  
│  - Extrae audio y escenas         │                  
│  - Transcribe con Whisper/Gemini  │                  
│  - Analiza con Video Intelligence │                  
│  - Guarda resultados (.json)      │                  
└──────────────────────────────────┘                  
```

---

## 2. Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente:

| Requisito | ¿Para qué? | ¿Cómo instalarlo? |
|-----------|-----------|-------------------|
| **Cuenta de Google Cloud** | Alojar toda la infraestructura | [console.cloud.google.com](https://console.cloud.google.com) |
| **gcloud CLI** | Ejecutar comandos de despliegue desde tu terminal | `curl https://sdk.cloud.google.com \| bash` |
| **Terraform** (opcional pero recomendado) | Automatizar la creación de infraestructura | [terraform.io/downloads](https://www.terraform.io/downloads) |
| **Node.js v20+** | Solo para desarrollo local | [nodejs.org](https://nodejs.org) |

### Configuración inicial de gcloud

Una vez instalado `gcloud`, abre tu terminal y ejecuta:

```bash
# 1. Inicia sesión (abre el navegador para autenticarte)
gcloud auth login

# 2. Configura tu proyecto (reemplaza con tu ID de proyecto)
gcloud config set project TU-PROJECT-ID
```

---

## 3. Estructura del proyecto

```
vigenair_migration_node/
│
├── api-server/              ← Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── server.ts        ← Archivo principal del servidor
│   │   ├── routes/          ← Endpoints de la API (/api/...)
│   │   ├── vertex.ts        ← Conexión con Gemini (Vertex AI)
│   │   ├── storage.ts       ← Conexión con Google Cloud Storage
│   │   └── generation.ts    ← Lógica de generación de variantes
│   ├── package.json         ← Dependencias de Node.js
│   └── tsconfig.json        ← Configuración de TypeScript
│
├── ui/                      ← Frontend (Angular)
│   └── src/
│       └── ui/
│           ├── src/app/     ← Componentes y servicios de Angular
│           └── package.json ← Dependencias de Angular
│
├── service/                 ← Motor de procesamiento (Python)
│   ├── main.py              ← Punto de entrada de la Cloud Function
│   ├── deploy.sh            ← Script de despliegue manual
│   ├── .env.yaml            ← Variables de entorno para Python
│   ├── requirements.txt     ← Dependencias de Python
│   ├── extractor/           ← Extracción de audio y video
│   ├── combiner/            ← Renderizado y combinación de video
│   └── storage/             ← Operaciones con Cloud Storage
│
├── terraform/               ← Infraestructura como código
│   ├── main.tf              ← Configuración principal
│   ├── cloud_functions.tf   ← Define la Cloud Function
│   ├── gcs.tf               ← Define el Bucket
│   ├── service_agents.tf    ← Permisos y Service Accounts
│   └── terraform.tfvars.template  ← Plantilla de variables
│
├── Dockerfile               ← Receta para empaquetar Node+Angular
└── .dockerignore             ← Archivos que NO se suben a la nube
```

---

## 4. Parte 1 — Desplegar la infraestructura y el motor Python

> **¿Qué hace este paso?** Crea todo lo necesario en Google Cloud: el Bucket de almacenamiento, habilita las APIs (Vertex AI, Video Intelligence, etc.), configura los permisos de seguridad y despliega la Cloud Function de Python que procesa los videos.

### Opción A: Usando Terraform (recomendado para empresas)

Terraform lee archivos de configuración y crea toda la infraestructura automáticamente. Si algo sale mal, puedes destruir todo con un solo comando.

**Paso 1.** Abre tu terminal y entra a la carpeta de Terraform:

```bash
cd terraform
```

**Paso 2.** Copia la plantilla de variables y editala con los datos de tu proyecto:

```bash
cp terraform.tfvars.template terraform.tfvars
```

Abre `terraform.tfvars` en tu editor y reemplaza los valores:

```hcl
project_id   = "tu-project-id-de-gcp"
region       = "us-central1"
gcs_location = "us-central1"
```

**Paso 3.** Configura las variables de entorno de Python. Abre `service/.env.yaml` y reemplaza:

```yaml
GCP_PROJECT_ID: 'tu-project-id-de-gcp'
GCP_LOCATION: 'us-central1'
```

**Paso 4.** Ejecuta el script de preparación (da permisos iniciales):

```bash
chmod +x pre_deploy.sh
./pre_deploy.sh
```

**Paso 5.** Inicializa, revisa y despliega:

```bash
# Descarga los plugins necesarios
terraform init

# Muestra un resumen de lo que va a crear (solo lectura, no cambia nada)
terraform plan

# Crea toda la infraestructura (te pedirá confirmación)
terraform apply
```

> **Nota:** Este proceso tarda entre 3-5 minutos. Al terminar, verás un resumen de todo lo que se creó.

---

### Opción B: Usando el script bash (alternativa manual)

Si no tienes Terraform instalado, puedes usar el script que viene incluido.

**Paso 1.** Entra a la carpeta del servicio:

```bash
cd service
```

**Paso 2.** Abre `deploy.sh` en tu editor y busca/reemplaza estas etiquetas con los valores reales de tu proyecto:

| Etiqueta en el archivo | Reemplazar con | Ejemplo |
|----------------------|---------------|---------|
| `<gcp-project-id>` | El ID de tu proyecto de GCP | `mi-empresa-prod-12345` |
| `<gcs-bucket>` | El nombre que quieras para el bucket | `mi-empresa-prod-12345-vigenair` |
| `<gcs-location>` | La ubicación del bucket | `us-central1` |
| `<gcp-region>` | La región de Cloud Functions | `us-central1` |

**Paso 3.** Haz lo mismo con `service/.env.yaml`:

```yaml
GCP_PROJECT_ID: 'mi-empresa-prod-12345'
GCP_LOCATION: 'us-central1'
```

**Paso 4.** Dale permisos de ejecución y corre el script:

```bash
chmod +x deploy.sh
./deploy.sh
```

> **¿Qué hace `deploy.sh` por dentro?**
> 1. Configura tu proyecto de GCP
> 2. Crea el Bucket de almacenamiento
> 3. Habilita todas las APIs necesarias (Vertex AI, Storage, Video Intelligence, etc.)
> 4. Crea las cuentas de servicio y les asigna los permisos correctos
> 5. Despliega la Cloud Function de Python llamada `vigenair`

### ¿Cómo verifico que Python quedó bien?

1. Ve a la [Consola de Google Cloud](https://console.cloud.google.com)
2. En el menú lateral, busca **"Cloud Functions"**
3. Deberías ver una función llamada **`vigenair`** con estado **Activo**
4. En **"Cloud Storage" → "Buckets"** deberías ver tu bucket creado

---

## 5. Parte 2 — Desplegar la aplicación web (Node.js + Angular)

> **¿Qué hace este paso?** Empaqueta tu frontend (Angular) y tu backend (Node.js) en un solo contenedor Docker y lo sube a Google Cloud Run. Cloud Run lo publicará en una URL pública.

> **Importante:** Asegúrate de haber completado la Parte 1 primero. La aplicación web necesita que el Bucket y las APIs ya existan.

**Paso 1.** Abre tu terminal y ubícate en la raíz del proyecto (donde está el `Dockerfile`):

```bash
cd /ruta/a/vigenair_migration_node
```

**Paso 2.** Ejecuta el comando de despliegue. Reemplaza las variables con los datos de tu proyecto:

```bash
gcloud run deploy vigneair-node \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --set-env-vars="GCP_PROJECT_ID=tu-project-id,GCS_BUCKET=tu-nombre-de-bucket,VERTEX_AI_LOCATION=us-central1,VERTEX_AI_MODEL=gemini-2.5-flash"
```

**¿Qué hace cada parámetro?**

| Parámetro | Explicación |
|-----------|-------------|
| `--source .` | Le dice a Google: "toma todos los archivos de esta carpeta y construye el contenedor" |
| `--region us-central1` | La región donde vivirá tu aplicación |
| `--allow-unauthenticated` | Permite que cualquiera acceda a la URL (sin login de Google) |
| `--memory 1Gi` | Le asigna 1 GB de RAM al contenedor |
| `--set-env-vars` | Las variables de configuración que tu código de Node.js necesita para funcionar |

**Paso 3.** Espera a que termine (entre 2-4 minutos). Verás un progreso como este:

```
✓ Uploading sources...
✓ Building Container...
✓ Creating Revision...
✓ Routing traffic...
Done.
Service URL: https://vigneair-node-XXXXX.us-central1.run.app   ← ¡Esta es tu URL!
```

**Paso 4.** Abre la URL en tu navegador. ¡Deberías ver la interfaz de ViGenAiR funcionando!

### ¿Qué pasó por detrás? (El Dockerfile explicado)

Cuando ejecutaste el comando, Google Cloud hizo lo siguiente:

1. **Leyó el `.dockerignore`** y descartó las carpetas que no necesita (Python, Terraform, credenciales, imágenes).
2. **Subió los archivos restantes** a Cloud Build (los servidores de compilación de Google).
3. **Ejecutó el `Dockerfile`**, que tiene 3 etapas:
   - **Etapa 1:** Instala Angular, copia el código del frontend y lo compila a archivos estáticos (HTML/CSS/JS optimizados).
   - **Etapa 2:** Instala las dependencias de Node.js y compila el TypeScript a JavaScript puro.
   - **Etapa 3:** Crea una imagen final súper ligera. Copia solo lo compilado de las etapas 1 y 2, descartando todo lo que ya no necesita (código fuente, herramientas de compilación, etc.).
4. **Subió la imagen** al Artifact Registry (un repositorio privado de contenedores).
5. **Creó una Revisión** en Cloud Run y le redirigió todo el tráfico.

---

## 6. Desarrollo local

Para hacer cambios y probarlos en tu computadora antes de subir a producción:

### Backend (Node.js)

```bash
# 1. Entra a la carpeta del backend
cd api-server

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Crea un archivo .env con tus configuraciones
#    (copia este contenido y reemplaza los valores)
cat > .env << EOF
GCP_PROJECT_ID=tu-project-id
GCS_BUCKET=tu-nombre-de-bucket
VERTEX_AI_LOCATION=us-central1
VERTEX_AI_MODEL=gemini-2.5-flash
EOF

# 4. Arranca el servidor en modo desarrollo (se reinicia al guardar cambios)
npm run dev
```

El backend estará disponible en `http://localhost:3000`.

### Frontend (Angular)

```bash
# 1. Entra a la carpeta del frontend
cd ui/src/ui

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Arranca Angular en modo desarrollo
npx ng serve
```

El frontend estará disponible en `http://localhost:4200`.

> **Nota:** En desarrollo, Angular corre en el puerto 4200 y Node en el 3000. El archivo `environment.development.ts` ya está configurado para que Angular sepa que debe hablar con `http://localhost:3000/api/...`.

---

## 7. Actualizar producción

Cuando hagas cambios en el código y quieras publicar una nueva versión, simplemente ejecuta el mismo comando de despliegue:

```bash
cd /ruta/a/vigenair_migration_node

gcloud run deploy vigneair-node \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --set-env-vars="GCP_PROJECT_ID=tu-project-id,GCS_BUCKET=tu-nombre-de-bucket,VERTEX_AI_LOCATION=us-central1,VERTEX_AI_MODEL=gemini-2.5-flash"
```

Esto **no crea un servicio nuevo**. Cloud Run crea una nueva **Revisión** (como un historial de versiones) y redirige el tráfico automáticamente a la versión más reciente. La URL no cambia.

### Actualizar solo el motor Python

Si cambiaste algo en la carpeta `service/`:

**Con Terraform:**
```bash
cd terraform
terraform apply
```

**Con el script manual:**
```bash
cd service
./deploy.sh
```

---

## 8. Variables de entorno

### Para la aplicación web (Node.js) — Cloud Run

Estas se pasan con `--set-env-vars` en el comando de despliegue:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `GCP_PROJECT_ID` | ID del proyecto de Google Cloud | `mi-empresa-12345` |
| `GCS_BUCKET` | Nombre del bucket de almacenamiento | `mi-empresa-12345-vigenair` |
| `VERTEX_AI_LOCATION` | Región de Vertex AI | `us-central1` |
| `VERTEX_AI_MODEL` | Modelo de Gemini a utilizar | `gemini-2.5-flash` |

### Para el motor Python — Cloud Function

Estas se configuran en el archivo `service/.env.yaml`:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `GCP_PROJECT_ID` | ID del proyecto de Google Cloud | `mi-empresa-12345` |
| `GCP_LOCATION` | Región del proyecto | `us-central1` |
| `CONFIG_TEXT_MODEL` | Modelo para análisis de texto | `gemini-2.5-flash` |
| `CONFIG_VISION_MODEL` | Modelo para análisis visual | `gemini-2.5-flash` |
| `CONFIG_TRANSCRIPTION_MODEL_WHISPER` | Tamaño del modelo Whisper | `small` |
| `CONFIG_TRANSCRIPTION_MODEL_GEMINI` | Modelo Gemini para transcripción | `gemini-2.5-flash` |

---

## 9. Solución de problemas comunes

### "command not found: gcloud"
El CLI de Google Cloud no está instalado o tu terminal no lo reconoce.
```bash
# Instalar
curl https://sdk.cloud.google.com | bash

# Recargar tu terminal
source ~/.zshrc    # en Mac
source ~/.bashrc   # en Linux
```

### "Build failed" durante el despliegue
Revisa los logs de compilación:
```bash
# Reemplaza BUILD_ID con el ID que aparece en el error
gcloud builds log BUILD_ID --region=us-central1
```

### "Container failed to start on PORT 8080"
Tu servidor Node.js debe escuchar en el puerto que Cloud Run le asigna. Verifica que `server.ts` use:
```typescript
const PORT = process.env.PORT || 3000;
```
Cloud Run envía la variable `PORT` automáticamente (generalmente 8080). Tu código ya está preparado para leerla.

### La página carga pero la consola muestra errores de Angular
Asegúrate de que el archivo `ui/src/ui/src/environments/environment.ts` tiene configurado el `provideRouter`:
```typescript
import { provideRouter } from '@angular/router';
```

### La Cloud Function no se activa cuando subo un video
Verifica que:
1. El nombre del bucket en la configuración de Eventarc coincida con tu bucket real
2. El video tenga un formato soportado (.mp4, .mov, .avi, etc.)
3. Revisa los logs en **Cloud Console → Cloud Functions → vigenair → Logs**
