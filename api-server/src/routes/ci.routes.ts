import { Router, Request, Response } from 'express';
import { GenerationHelper } from '../generation';

const router = Router();

// POST /api/ci/geo-intelligence
router.post('/geo-intelligence', async (req: Request, res: Response) => {
  try {
    const { ciContextJson, compassContextJson, macroJson, microJson } = req.body;
    const context = ciContextJson || compassContextJson;
    console.log('[CI YouTube] Starting generateGeoIntelligence');
    const result = await GenerationHelper.generateGeoIntelligence(
      context, macroJson, microJson
    );
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/ci/geo-intelligence:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ci/prioritization (Testing Framework)
router.post('/prioritization', async (req: Request, res: Response) => {
  try {
    const { ciContextJson, compassContextJson } = req.body;
    const context = ciContextJson || compassContextJson;
    console.log('[CI YouTube] Starting generatePrioritization');
    const result = await GenerationHelper.generatePrioritization(context);
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/ci/prioritization:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ci/youtube-ideas
router.post('/youtube-ideas', async (req: Request, res: Response) => {
  try {
    const {
      gcsFolder, abcdType, customPoints, mode, selectedValue,
      selectedCategories, macroJson, microJson
    } = req.body;
    console.log('[CI YouTube] Starting generateYoutubeIdeas for folder:', gcsFolder);
    const result = await GenerationHelper.generateYoutubeIdeas(
      gcsFolder, abcdType, customPoints, mode, selectedValue,
      selectedCategories, macroJson, microJson
    );
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/ci/youtube-ideas:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
