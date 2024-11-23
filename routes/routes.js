import express from 'express';
import { uploadTextDataset } from '../components/TextComponent.js';
import { uploadImageDataset } from '../components/ImageComponent.js';
import { updateMetadata } from '../components/metadataComponent.js';
import uploadZip from '../components/uploadZip.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/uploadText', uploadTextDataset);
router.post('/uploadImage', uploadImageDataset);
router.post('/upload', upload.single('zipfile'), uploadZip);
router.post('/update/metadata', updateMetadata);

export default router;
