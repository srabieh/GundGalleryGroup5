const Admin = require('../models/adminModel').Admin;
const jwt = require('jsonwebtoken');

exports.index = async (req, res) => {
    if (req.cookies.admin_token) {
        try {
            const admin = jwt.verify(req.cookies.admin_token, process.env.JWT_SECRET);
            return res.render('admin', { 
                isAdmin: true, 
                admin: admin, 
                error: null
            });
        } catch(err) {
            console.log(err);
            return res.render('admin', { 
                isAdmin: false, 
                admin: null,
                error: 'Invalid token. Please login again.'
            });
        }
    }
    return res.render('admin', { 
        isAdmin: false, 
        admin: null,
        error: null
    });
};

exports.authenticate = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.authenticate(username, password);
        if (admin instanceof Admin) {
            const token = jwt.sign(JSON.stringify(admin), process.env.JWT_SECRET);
            return res.cookie('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }).redirect('/admin');
        } else {
            return res.render(`admin`, { isAdmin: false, error: admin });
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
};

exports.logout = async (req, res) => {
    return res.clearCookie('admin_token').redirect('/admin');
};