import express from 'express';
// import { updateMetadata } from '../controllers/metadataComponent.js';
import uploadZip from '../controllers/uploadZip.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/upload/zip', upload.single('zipfile'), uploadZip);
// router.post('/update/metadata', updateMetadata);

export default router;
