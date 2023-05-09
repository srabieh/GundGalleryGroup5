// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/join', clientController.join);
router.post('/logout', clientController.logout);

module.exports = router;
