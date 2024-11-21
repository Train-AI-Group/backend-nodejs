const express = require('express');
const router = express.Router();
const authComponent = require('../components/AuthComponent');
router.get('/getPublicAddress', authComponent.getWallet);

module.exports = router;
