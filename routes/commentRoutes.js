// routes/adminRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.post('/create/:installation_id', commentController.create);

module.exports = router;
