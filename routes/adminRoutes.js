// routes/userRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
    if (req.cookies.access_token) {
        try {
            const admin = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            return res.render('adminPanel', { isAdmin: true, admin: admin });
        } catch {
            return res.render('adminPanel', { isAdmin: false, });
        }
    }
    return res.render('adminPanel', { isAdmin: false, });
});

router.post('/login', adminController.login);

router.post('/logout', adminController.logout);

module.exports = router;
