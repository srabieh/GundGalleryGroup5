const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
    if (req.cookies.access_token) {
        try {
            const admin = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);

            return res.render('adminPanel', { 
                error: null,
                isAdmin: true, 
                admin: admin, 
            });
        } catch {
            return res.render('adminPanel', { 
                error: 'Invalid token. Please login again.',
                isAdmin: false, 
            });
        }
    }

    return res.render('adminPanel', { 
        isAdmin: false, 
        error: null
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await adminModel.login(username, password);

        if (admin instanceof adminModel.Admin) {
            const token = jwt.sign(JSON.stringify(admin), process.env.JWT_SECRET);

            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .redirect("/admin");
        } else {
            return res.render(`adminPanel`, { isAdmin: false, error: admin });
        }
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

exports.logout = async (req, res) => {
    return res.clearCookie("access_token")
        .redirect("/admin");
};