const adminModel = require('../models/adminModel');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await adminModel.authenticate(username, password);
        if (admin) {
            // Set up a session or token-based authentication here
            res.redirect('/');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};