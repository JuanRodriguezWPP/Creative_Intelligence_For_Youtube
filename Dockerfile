# ═══════════════════════════════════════════════════════════════════════════════
# ETAPA 1: Compilar el Frontend de Angular
# ═══════════════════════════════════════════════════════════════════════════════
FROM node:20-slim AS angular-builder

WORKDIR /app/ui

# Copiar archivos de dependencias primero (para aprovechar la caché de Docker)
COPY ui/src/ui/package*.json ./
RUN npm ci

# Copiar todos los archivos compartidos que Angular necesita (.ts en la raíz de src)
COPY ui/src/*.ts ../

# Copiar el resto del código de Angular
COPY ui/src/ui/ ./

# Compilar Angular en modo producción
RUN npx ng build --configuration production

# ═══════════════════════════════════════════════════════════════════════════════
# ETAPA 2: Compilar el Backend de Node.js (TypeScript → JavaScript)
# ═══════════════════════════════════════════════════════════════════════════════
FROM node:20-slim AS node-builder

WORKDIR /app/api

# Copiar archivos de dependencias primero
COPY api-server/package*.json ./
RUN npm ci

# Copiar el código TypeScript y compilarlo
COPY api-server/tsconfig.json ./
COPY api-server/src/ ./src/
RUN npx tsc

# ═══════════════════════════════════════════════════════════════════════════════
# ETAPA 3: Imagen Final de Producción (solo lo necesario, sin node_modules de dev)
# ═══════════════════════════════════════════════════════════════════════════════
FROM node:20-slim AS production

WORKDIR /app

# Copiar el backend compilado (JS puro, sin TypeScript)
COPY --from=node-builder /app/api/dist ./dist

# Instalar solo dependencias de producción (sin devDependencies)
COPY api-server/package*.json ./
RUN npm ci --omit=dev

# Copiar el build de Angular a la carpeta 'public' que el servidor Express sirve
COPY --from=angular-builder /app/ui/dist/ui/browser ./public

# Exponer el puerto que usará Cloud Run (Cloud Run lee la var PORT automáticamente)
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "dist/server.js"]
