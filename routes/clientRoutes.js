// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.index);

// ---- Create new clients or get existing client ---------------------------------------------------------------
router.post('/createClient', clientController.createClient);
router.post('/logout', clientController.logout);


//Clients pushing comments to database:
router.post('/pushComment', clientController.pushComment);


module.exports = router;
