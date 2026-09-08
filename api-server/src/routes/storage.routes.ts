import { Router, Request, Response } from 'express';
import { StorageManager } from '../storage';
import { GenerationHelper } from '../generation';
import { StringUtil } from '../string-util';
import { CONFIG } from '../config';

const router = Router();

// GET /api/runs — Lista las carpetas de video del bucket
router.get('/runs', async (req: Request, res: Response) => {
  try {
    const runs = await StorageManager.listObjects();
    // En Node.js no tenemos Session.getActiveUser(), usamos un ID del header o env
    const encodedUserId = req.headers['x-user-id'] as string || 'default-user';
    res.json({ encodedUserId: StringUtil.gcsSanitise(encodedUserId), runs });
  } catch (error: any) {
    console.error('Error in GET /api/runs:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/renders/:gcsFolder — Lista los renders de una carpeta
router.get('/renders/:gcsFolder', async (req: Request, res: Response) => {
  try {
    const gcsFolder = decodeURIComponent(req.params.gcsFolder as string);
    const combosFolders = await StorageManager.listObjects('/', `${gcsFolder}/`);
    const filtered = combosFolders.filter((name: string) => name.endsWith('-combos'));
    res.json(filtered);
  } catch (error: any) {
    console.error('Error in GET /api/renders:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/folder/:folder — Elimina una carpeta del bucket
router.delete('/folder/:folder', async (req: Request, res: Response) => {
  try {
    const folder = decodeURIComponent(req.params.folder as string);
    await StorageManager.deleteFolder(folder);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error in DELETE /api/folder:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/video-language/:gcsFolder — Obtiene el idioma del video
router.get('/video-language/:gcsFolder', async (req: Request, res: Response) => {
  try {
    const gcsFolder = decodeURIComponent(req.params.gcsFolder as string);
    const language = await GenerationHelper.getVideoLanguage(gcsFolder);
    res.json({ language });
  } catch (error: any) {
    console.error('Error in GET /api/video-language:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/gcs-file — Descarga un archivo del bucket
router.get('/gcs-file', async (req: Request, res: Response) => {
  try {
    const filePath = req.query.path as string;
    if (!filePath) {
      res.status(400).json({ error: 'Missing "path" query parameter' });
      return;
    }
    const content = await StorageManager.loadFile(filePath, true);
    if (content === null) {
      res.status(404).json({ error: 'File not found' });
      return;
    }
    res.send(content);
  } catch (error: any) {
    console.error('Error in GET /api/gcs-file:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/upload — Sube un archivo al bucket (base64)
router.post('/upload', async (req: Request, res: Response) => {
  try {
    const { base64Content, folder, filename, contentType } = req.body;
    await StorageManager.uploadFile(base64Content, folder, filename, contentType);
    res.json({ success: true, path: `${folder}/${filename}` });
  } catch (error: any) {
    console.error('Error in POST /api/upload:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
