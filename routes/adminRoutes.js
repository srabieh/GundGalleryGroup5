// routes/userRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/', adminController.index);
router.get('/getAllWords', adminController.getAllWords)

router.post('/login', adminController.login);
router.post('/logout', adminController.logout);

module.exports = router;
