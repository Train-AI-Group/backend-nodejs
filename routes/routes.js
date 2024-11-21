const express = require('express');
const { uploadDataset } = require('../components/AuthComponent'); // Make sure to adjust the path if needed
const router = express.Router();

router.post('/upload', uploadDataset); // This handles POST requests to /auth/upload

module.exports = router;
