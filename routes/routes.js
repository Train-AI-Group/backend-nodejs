const express = require('express');
const { uploadDataset: textData } = require('../components/AuthComponent');
const { uploadDataset: ImageData } = require('../components/ImageComponent');

const router = express.Router();

router.post('/upload', textData);
router.post('/uploadImage', ImageData);
router.post('/uploadDataSet', );

module.exports = router;
