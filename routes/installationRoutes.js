// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');


// Add your admin route handlers here

//gets
router.get('/', installationController.index);
router.post('/createPainting', installationController.createPainting);

//posts


module.exports = router;
