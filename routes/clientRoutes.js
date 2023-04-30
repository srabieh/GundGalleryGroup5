// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


// Add your client route handlers here

//Get--------------


//Posting---------
router.post('/createClient', clientController.createClient);


module.exports = router;
