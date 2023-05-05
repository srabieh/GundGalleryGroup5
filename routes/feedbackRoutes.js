
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

//add admin route handlers

//gets
router.get('/',feedbackController.index);

//should this be post?  ...
router.get('/thanks',feedbackController.thanks);

