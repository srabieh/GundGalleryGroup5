const Client = require("../models/clientModel").Client;
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
	if (req.cookies.access_token)
	{
		// TODO: Verify token
		return res.status(200);
	}
	return res.status(401);
}

exports.create = async (req , res) => {
	const { name , email , age , gender } = req.body;
	try {		
		const client = await Client.create({ name, email, age, gender });

		if(client instanceof Client){
			const token = jwt.sign(JSON.stringify(client), process.env.JWT_SECRET);
			return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .redirect("/survey");
		}
	} catch(error){
		console.log(error);
		return res.redirect("/survey");
	}
}
