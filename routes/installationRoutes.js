// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');

// get installation of id
router.get('/:id', installationController.index);

module.exports = router;
