// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');

//Getting
router.get('/:id', installationController.get);

//Posting
router.post('/threewords' , installationController.pushWords)

module.exports = router;
