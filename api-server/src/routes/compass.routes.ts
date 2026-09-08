import { Router, Request, Response } from 'express';
import { GenerationHelper } from '../generation';

const router = Router();

// POST /api/youtube-ideas
router.post('/youtube-ideas', async (req: Request, res: Response) => {
  try {
    const {
      gcsFolder, abcdType, customPoints, mode, selectedValue,
      selectedCategories, macroJson, microJson
    } = req.body;
    console.log('Starting generateYoutubeIdeas for folder:', gcsFolder);
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

// POST /api/compass/geo-intelligence
router.post('/compass/geo-intelligence', async (req: Request, res: Response) => {
  try {
    const { compassContextJson, macroJson, microJson } = req.body;
    console.log('Starting generateGeoIntelligence');
    const result = await GenerationHelper.generateGeoIntelligence(
      compassContextJson, macroJson, microJson
    );
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/compass/geo-intelligence:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/compass/channel-intelligence
router.post('/compass/channel-intelligence', async (req: Request, res: Response) => {
  try {
    const { compassContextJson, categories } = req.body;
    console.log('Starting generateChannelIntelligence');
    const result = await GenerationHelper.generateChannelIntelligence(
      compassContextJson, categories
    );
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/compass/channel-intelligence:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/compass/prioritization
router.post('/compass/prioritization', async (req: Request, res: Response) => {
  try {
    const { compassContextJson } = req.body;
    console.log('Starting generatePrioritization');
    const result = await GenerationHelper.generatePrioritization(compassContextJson);
    res.json({ result });
  } catch (error: any) {
    console.error('Error in POST /api/compass/prioritization:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
