const Client = require("../models/clientModel").Client;
const jwt = require("jsonwebtoken");

exports.join = async (req , res) => {
	const { name , email , age , gender } = req.body;
	try {		
		const client = await Client.join({ name, email, age, gender });
		if(client instanceof Client){
			const token = jwt.sign(JSON.stringify(client), process.env.JWT_SECRET);
			return res.cookie("access_token", token, {
                httpOnly: true,
				maxAge: 1.08e7,
                secure: process.env.NODE_ENV === "production",
            }).redirect("/");
		}
	} catch(error){
		console.log(error);
		return res.redirect("/");
	}
}


exports.logout = async (req, res) => {
    return res.clearCookie('access_token').redirect('/');
};