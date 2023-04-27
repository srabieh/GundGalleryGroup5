const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// ---- Index (/admin) (token auth) -----------------------------------------------
exports.index = async (req, res) => {
    if (req.cookies.access_token) {
        try {
            const admin = new adminModel.Admin(jwt.verify(req.cookies.access_token, process.env.JWT_SECRET));
            
            return res.render('adminPanel', { 
                error: null,
                isAdmin: true, 
                admin: admin, 
            });
        } catch(err) {
            console.log(err);
            return res.render('adminPanel', { 
                error: 'Invalid token. Please login again.',
                isAdmin: false, 
                admin: null
            });
        }
    }

    return res.render('adminPanel', { 
        isAdmin: false, 
        error: null,
        admin: null
    });
};

// ---- getAllWord (test action for admins) -----------------------------------------------------------
exports.getAllWords = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (!req.cookies.access_token) {
        return res.redirect("/");
    }

    try {
        const admin = new adminModel.Admin(jwt.verify(req.cookies.access_token, process.env.JWT_SECRET));
        const words = await adminModel.getAllWords(admin);
        return res.json(words);
    } catch {
        return res.redirect('/admin');
    }
};

// ---- Login (/admin/login) -----------------------------------------------------------------
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

// ---- Logout (/admin/logout) ---------------------------------------------------------------------------
exports.logout = async (req, res) => {
    return res.clearCookie("access_token")
        .redirect("/admin");
};
