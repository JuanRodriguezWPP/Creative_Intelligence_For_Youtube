import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

// Importar rutas
import storageRoutes from './routes/storage.routes';
import generationRoutes from './routes/generation.routes';
import dataRoutes from './routes/data.routes';
import compassRoutes from './routes/compass.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta donde vivirá el build de Angular después del Docker multi-stage build
const ANGULAR_DIST = path.join(__dirname, '..', 'public');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ── Servir archivos estáticos de Angular ──────────────────────────────────
// Express sirve los archivos JS/CSS/HTML compilados de Angular
app.use(express.static(ANGULAR_DIST));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    bucket: process.env.GCS_BUCKET,
    routes: [
      'GET  /api/runs',
      'GET  /api/renders/:gcsFolder',
      'GET  /api/video-language/:gcsFolder',
      'GET  /api/gcs-file?path=...',
      'GET  /api/web-app-url',
      'DELETE /api/folder/:folder',
      'POST /api/upload',
      'POST /api/generate-variants',
      'POST /api/generate-previews',
      'POST /api/render-variants',
      'POST /api/regenerate-text-asset',
      'POST /api/generate-text-assets',
      'POST /api/store-approval',
      'POST /api/split-segment',
      'POST /api/update-transcription',
      'POST /api/youtube-ideas',
      'POST /api/compass/geo-intelligence',
      'POST /api/compass/channel-intelligence',
      'POST /api/compass/prioritization',
    ]
  });
});

// Registrar rutas de API
app.use('/api', storageRoutes);
app.use('/api', generationRoutes);
app.use('/api', dataRoutes);
app.use('/api', compassRoutes);

// Misc endpoints
app.get('/api/web-app-url', (req, res) => {
  const url = process.env.WEB_APP_URL || `http://localhost:${PORT}`;
  res.json({ url });
});

// ── Catch-all: devuelve index.html para cualquier ruta no-API ─────────────
// Esto permite que Angular Router maneje las rutas del lado del cliente.
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(ANGULAR_DIST, 'index.html'));
  } else {
    next();
  }
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`🚀 API Server corriendo en http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Bucket: ${process.env.GCS_BUCKET}`);
  console.log(`🤖 Vertex AI Model: ${process.env.VERTEX_AI_MODEL}`);
});
