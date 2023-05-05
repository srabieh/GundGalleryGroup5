const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
	//load user's name ?
	return res.status(200);
}

exports.thanks = async (req, res) => {
	return res.redirect("/thanks");
}