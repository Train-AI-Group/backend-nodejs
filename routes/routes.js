const express = require('express');
const { uploadDataset } = require('../components/AuthComponent');
const router = express.Router();

router.post('/upload', uploadDataset);

module.exports = router;
