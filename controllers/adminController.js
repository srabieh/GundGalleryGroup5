const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await adminModel.login(username, password);

        if (admin instanceof adminModel.Admin) {
            const token = jwt.sign(JSON.stringify(admin), process.env.JWT_SECRET);
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            }).redirect("/admin");
        }
        else
        {
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