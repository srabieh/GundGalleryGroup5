// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');

//gets
router.get('/:id', installationController.index);

module.exports = router;
