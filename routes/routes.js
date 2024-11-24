import express from 'express';
import { fetchDataset } from '../components/FetchComponent.js';
import { calReward } from '../components/calReward.js';
import uploadZip from '../controllers/uploadZip.js';
import upload from '../middleware/multer.js';
// import { updateMetadata } from '../controllers/metadataComponent.js';
const router = express.Router();

router.get('/fetchDataset', fetchDataset);
router.get('/calReward', calReward);
router.post('/upload/zip', upload.single('zipfile'), uploadZip);
// router.post('/update/metadata', updateMetadata);

export default router;
