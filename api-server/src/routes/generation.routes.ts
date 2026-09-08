import { Router, Request, Response } from 'express';
import { GenerationHelper } from '../generation';
import { PreviewHelper, VideoIntelligence } from '../preview';
import { StorageManager } from '../storage';
import { CONFIG } from '../config';
import {
  GenerationSettings,
  PreviewSettings,
  GeneratePreviewsResponse,
  RenderQueue,
  VariantTextAsset,
} from '../types';

const router = Router();

// POST /api/generate-variants
router.post('/generate-variants', async (req: Request, res: Response) => {
  try {
    const { gcsFolder, settings } = req.body as {
      gcsFolder: string;
      settings: GenerationSettings;
    };
    console.log('Starting generateVariants for folder:', gcsFolder);
    const variants = await GenerationHelper.generateVariants(gcsFolder, settings);
    res.json(variants);
  } catch (error: any) {
    console.error('Error in POST /api/generate-variants:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/generate-previews
router.post('/generate-previews', async (req: Request, res: Response) => {
  try {
    const { analysis, segments, settings } = req.body as {
      analysis: VideoIntelligence;
      segments: any[];
      settings: PreviewSettings;
    };
    const sourceDimensions = settings.sourceDimensions;
    const h = sourceDimensions.h;

    const createPreview = (targetW: number, targetH: number) =>
      JSON.stringify(
        PreviewHelper.createPreview(segments, analysis, sourceDimensions, { w: targetW, h: targetH }, settings.weights)
      );

    const squarePreview = PreviewHelper.createPreview(segments, analysis, sourceDimensions, { w: h, h }, settings.weights);
    const verticalPreview = PreviewHelper.createPreview(segments, analysis, sourceDimensions, { w: h * (9 / 16), h }, settings.weights);

    const result: GeneratePreviewsResponse = {
      square: JSON.stringify(squarePreview),
      vertical: JSON.stringify(verticalPreview),
      '1:1': createPreview(h, h),
      '9:16': createPreview(h * (9 / 16), h),
      '16:9': createPreview(h * (16 / 9), h),
      '3:4': createPreview(h * (3 / 4), h),
      '4:3': createPreview(h * (4 / 3), h),
    };
    res.json(result);
  } catch (error: any) {
    console.error('Error in POST /api/generate-previews:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/render-variants
router.post('/render-variants', async (req: Request, res: Response) => {
  try {
    const { gcsFolder, renderQueue } = req.body as {
      gcsFolder: string;
      renderQueue: RenderQueue;
    };

    const queueNamePrefix = renderQueue.queueName
      ? `${renderQueue.queueName}${CONFIG.videoFolderNameSeparator}`
      : '';
    const folder = `${gcsFolder}/${queueNamePrefix}${Date.now()}-combos`;

    const formatMapping: Record<string, string> = {
      '1:1': 'square', '9:16': 'vertical', '16:9': 'horizontal',
      '3:4': '3_4', '4:3': '4_3',
    };

    const useBlankingFill = renderQueue.queue[0]?.render_settings?.use_blanking_fill;
    if (renderQueue.previewAnalyses && !useBlankingFill) {
      for (const [format, analysis] of Object.entries(renderQueue.previewAnalyses)) {
        const [wRatio, hRatio] = format.split(':').map(Number);
        const targetH = renderQueue.sourceDimensions.h;
        const targetW = targetH * (wRatio / hRatio);

        const cropCommands = PreviewHelper.generateCropCommands(
          analysis as unknown as [{ frames: { time: number; x: number }[] }],
          { w: targetW, h: targetH },
          CONFIG.defaultVideoHeight
        );
        // Reemplazo de Utilities.base64Encode → Buffer.from().toString('base64')
        const encodedCropCommands = Buffer.from(cropCommands, 'utf-8').toString('base64');
        await StorageManager.uploadFile(
          encodedCropCommands, folder,
          `crop_${formatMapping[format] || format}.txt`, 'text/plain'
        );
      }
    }

    const encodedRenderQueueJson = Buffer.from(
      JSON.stringify(renderQueue.queue), 'utf-8'
    ).toString('base64');
    await StorageManager.uploadFile(
      encodedRenderQueueJson, folder,
      CONFIG.cloudStorage.files.render, 'application/json'
    );

    res.json({ folder });
  } catch (error: any) {
    console.error('Error in POST /api/render-variants:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/regenerate-text-asset
router.post('/regenerate-text-asset', async (req: Request, res: Response) => {
  try {
    const { variantVideoPath, textAsset, textAssetLanguage } = req.body as {
      variantVideoPath: string;
      textAsset: VariantTextAsset;
      textAssetLanguage: string;
    };
    const result = await GenerationHelper.generateTextAsset(variantVideoPath, textAsset, textAssetLanguage);
    res.json(result);
  } catch (error: any) {
    console.error('Error in POST /api/regenerate-text-asset:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/generate-text-assets
router.post('/generate-text-assets', async (req: Request, res: Response) => {
  try {
    const { variantVideoPath, textAssetsLanguage } = req.body as {
      variantVideoPath: string;
      textAssetsLanguage: string;
    };
    const result = await GenerationHelper.generateTextAssets(variantVideoPath, textAssetsLanguage);
    res.json(result);
  } catch (error: any) {
    console.error('Error in POST /api/generate-text-assets:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
