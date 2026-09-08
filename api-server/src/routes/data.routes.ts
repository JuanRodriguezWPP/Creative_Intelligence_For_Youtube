import { Router, Request, Response } from 'express';
import { StorageManager } from '../storage';
import { CONFIG } from '../config';
import { RenderedVariant, SegmentMarker } from '../types';

const router = Router();

// POST /api/store-approval — Guarda el estado de aprobación de variantes
router.post('/store-approval', async (req: Request, res: Response) => {
  try {
    const { gcsFolder, combos } = req.body as {
      gcsFolder: string;
      combos: RenderedVariant[];
    };
    // Reemplazo de Utilities.base64Encode → Buffer
    const encodedJson = Buffer.from(JSON.stringify(combos), 'utf-8').toString('base64');
    await StorageManager.uploadFile(
      encodedJson, gcsFolder,
      CONFIG.cloudStorage.files.approval, 'application/json'
    );
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error in POST /api/store-approval:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/split-segment — Divide un segmento
router.post('/split-segment', async (req: Request, res: Response) => {
  try {
    const { gcsFolder, segmentMarkers } = req.body as {
      gcsFolder: string;
      segmentMarkers: SegmentMarker[];
    };
    const encodedJson = Buffer.from(JSON.stringify(segmentMarkers), 'utf-8').toString('base64');

    await StorageManager.renameFile(
      `${gcsFolder}/${CONFIG.cloudStorage.files.data}`,
      `${gcsFolder}/${CONFIG.cloudStorage.files.presplit}`
    );
    await StorageManager.uploadFile(
      encodedJson, gcsFolder,
      `${Date.now()}${CONFIG.cloudStorage.files.split}`, 'application/json'
    );
    res.json({ segmentId: String(segmentMarkers[0].av_segment_id) });
  } catch (error: any) {
    console.error('Error in POST /api/split-segment:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/update-transcription — Actualiza la transcripción VTT
router.post('/update-transcription', async (req: Request, res: Response) => {
  try {
    const { gcsFolder, transcriptionText } = req.body as {
      gcsFolder: string;
      transcriptionText: string;
    };

    // Guardar VTT
    const encodedVtt = Buffer.from(transcriptionText, 'utf-8').toString('base64');
    await StorageManager.uploadFile(encodedVtt, gcsFolder, 'input.vtt', 'text/vtt');

    // Parsear VTT y actualizar data.json
    const transcriptionData = parseVttText(transcriptionText);
    await updateDataJsonWithTranscription(gcsFolder, transcriptionData);

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error in POST /api/update-transcription:', error);
    res.status(500).json({ error: error.message });
  }
});

// ── Funciones auxiliares para transcripción ──

interface VttSegment {
  start: number;
  end: number;
  text: string;
}

function parseVttText(vttText: string): VttSegment[] {
  const segments: VttSegment[] = [];
  const lines = vttText.split('\n');
  let i = 0;
  while (i < lines.length && !lines[i].includes('-->')) i++;

  while (i < lines.length) {
    const line = lines[i].trim();
    const timestampMatch = line.match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/);
    if (timestampMatch) {
      const startTime = parseVttTimestamp(timestampMatch[1]);
      const endTime = parseVttTimestamp(timestampMatch[2]);
      const textLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== '' && !lines[i].includes('-->')) {
        textLines.push(lines[i].trim());
        i++;
      }
      if (textLines.length > 0) {
        segments.push({ start: startTime, end: endTime, text: textLines.join(' ') });
      }
    }
    i++;
  }
  return segments;
}

function parseVttTimestamp(timestamp: string): number {
  const parts = timestamp.split(':');
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);
  const secondsParts = parts[2].split('.');
  const seconds = Number(secondsParts[0]);
  const ms = Number(secondsParts[1]);
  return hours * 3600 + minutes * 60 + seconds + ms / 1000;
}

async function updateDataJsonWithTranscription(gcsFolder: string, transcriptionData: VttSegment[]) {
  const dataJson = await StorageManager.loadFile(`${gcsFolder}/data.json`, true) as string;
  if (!dataJson) throw new Error('data.json not found');

  const avSegments = JSON.parse(dataJson);
  for (const avSegment of avSegments) {
    const segmentStart = avSegment.start_s;
    const segmentEnd = avSegment.end_s;
    const overlappingTranscripts = transcriptionData.filter(
      (t: VttSegment) => t.start < segmentEnd && t.end > segmentStart
    );
    avSegment.transcript = overlappingTranscripts.map((t: VttSegment) => t.text);
  }

  const encodedJson = Buffer.from(JSON.stringify(avSegments), 'utf-8').toString('base64');
  await StorageManager.uploadFile(encodedJson, gcsFolder, 'data.json', 'application/json');
}

export default router;
