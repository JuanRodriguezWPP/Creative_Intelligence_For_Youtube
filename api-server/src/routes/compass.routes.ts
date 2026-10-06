import { Router, Request, Response } from 'express';
import { GenerationHelper } from '../generation';

const router = Router();

// POST /api/youtube-ideas (Legacy alias)
router.post('/youtube-ideas', async (req: Request, res: Response) => {
  try {
    const {
      gcsFolder, abcdType, customPoints, mode, selectedValue,
      selectedCategories, macroJson, microJson
    } = req.body;
    console.log('[Legacy Route] /api/youtube-ideas called');
    const result = await GenerationHelper.generateYoutubeIdeas(
      gcsFolder, abcdType, customPoints, mode, selectedValue,
      selectedCategories, macroJson, microJson
    );
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/youtube-ideas:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/compass/geo-intelligence (Legacy alias)
router.post('/compass/geo-intelligence', async (req: Request, res: Response) => {
  try {
    const { compassContextJson, ciContextJson, macroJson, microJson } = req.body;
    const context = compassContextJson || ciContextJson;
    console.log('[Legacy Route] /api/compass/geo-intelligence called');
    const result = await GenerationHelper.generateGeoIntelligence(
      context, macroJson, microJson
    );
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/compass/geo-intelligence:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/compass/prioritization (Legacy alias)
router.post('/compass/prioritization', async (req: Request, res: Response) => {
  try {
    const { compassContextJson, ciContextJson } = req.body;
    const context = compassContextJson || ciContextJson;
    console.log('[Legacy Route] /api/compass/prioritization called');
    const result = await GenerationHelper.generatePrioritization(context);
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/compass/prioritization:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
