// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/join', clientController.join)

module.exports = router;
