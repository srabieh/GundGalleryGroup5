// routes/userRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('adminPanel.ejs');
});

router.post('/login', adminController.login);

// Add other user route handlers here

module.exports = router;
