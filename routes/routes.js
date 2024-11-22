import express from 'express';
import { uploadDataset as textData } from '../components/AuthComponent.js';
import { uploadDataset as ImageData } from '../components/ImageComponent.js';

const router = express.Router();

router.post('/upload', textData);
router.post('/uploadImage', ImageData);

export default router;
