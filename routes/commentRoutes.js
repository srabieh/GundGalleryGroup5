// routes/adminRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.get('/get/:installation_id', commentController.getByInstallation);

router.post('/create/:client_id/:installation_id', commentController.create);

module.exports = router;
