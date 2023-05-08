// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.index);

router.post('/create', clientController.create)

module.exports = router;
