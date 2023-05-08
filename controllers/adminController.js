const Admin = require("../models/adminModel").Admin;
const jwt = require("jsonwebtoken");

// ---- Index (/admin) (token auth) -----------------------------------------------
exports.index = async (req, res) => {
    if (req.cookies.admin_token) {
        try {
            const admin = jwt.verify(req.cookies.admin_token, process.env.JWT_SECRET);

            return res.render("admin", { 
                isAdmin: true, 
                admin: admin, 
                error: null
            });
        } catch(err) {
            console.log(err);
            return res.render("admin", { 
                isAdmin: false, 
                admin: null,
                error: "Invalid token. Please login again."
            });
        }
    }

    return res.render("admin", { 
        isAdmin: false, 
        admin: null,
        error: null
    });
};

// ---- getAllWord (test action for admins) -----------------------------------------------------------
exports.getAllWords = async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (!req.cookies.admin_token) {
        return res.redirect("/");
    }

    try {
        const admin = new Admin(jwt.verify(req.cookies.admin_token, process.env.JWT_SECRET));
        const words = await admin.getAllWords();
        return res.json(words);
    } catch {
        return res.redirect("/admin");
    }
};

// ---- Login (/admin/login) -----------------------------------------------------------------
exports.login = async (req, res) => {
    const { username, password } = req.body;
	
    try {
        const admin = await Admin.login(username, password);

        if (admin instanceof Admin) {
            const token = jwt.sign(JSON.stringify(admin), process.env.JWT_SECRET);
            return res.cookie("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .redirect("/admin");
        } else {
            return res.render(`admin`, { isAdmin: false, error: admin });
        }
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

// ---- Logout (/admin/logout) ---------------------------------------------------------------------------
exports.logout = async (req, res) => {
    return res.clearCookie("admin_token")
        .redirect("/admin");
};
