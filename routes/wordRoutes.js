// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

router.get("/words", (req, res) => {
    res.render('words');
})

module.exports = router;
