import express from 'express';
import { uploadTextDataset } from '../components/TextComponent.js';
import { uploadImageDataset } from '../components/ImageComponent.js';

const router = express.Router();

router.post('/uploadText', uploadTextDataset);
router.post('/uploadImage', uploadImageDataset);

export default router;
