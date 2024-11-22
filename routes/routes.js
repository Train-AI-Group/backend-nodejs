import express from 'express';
import { uploadTextDataset } from '../components/TextComponent.js';
import { uploadImageDataset } from '../components/ImageComponent.js';
import { updateMetadata } from '../components/metadataComponent.js';

const router = express.Router();

router.post('/uploadText', uploadTextDataset);
router.post('/uploadImage', uploadImageDataset);
router.post('/update/metadata', updateMetadata);

export default router;
