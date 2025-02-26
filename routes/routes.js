import express from 'express';
import { uploadDataset as textData } from '../components/AuthComponent.js';
import { uploadDataset as ImageData } from '../components/ImageComponent.js';
import { uploadXlsxAndJSonDataset } from '../components/JsonAndXlsxComponent.js';

const router = express.Router();

router.post('/upload', textData);
router.post('/uploadImage', ImageData);
router.post('/uploadDataSet', uploadXlsxAndJSonDataset);

export default router;
