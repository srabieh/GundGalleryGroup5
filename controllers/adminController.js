const userModel = require('../models/adminModel');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.authenticate(username, password);
        if (user) {
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