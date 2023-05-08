// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');

router.get('/:id', installationController.get);

module.exports = router;
