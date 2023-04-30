// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// ---- Create new clients or get existing client ---------------------------------------------------------------
router.post('/createClient', clientController.createClient);

module.exports = router;
