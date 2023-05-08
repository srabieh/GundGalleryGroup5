// routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/', adminController.index);

router.post('/login', adminController.authenticate);
router.post('/logout', adminController.logout);

module.exports = router;
