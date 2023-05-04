const Installation = require("../models/installationModel").Installation;
const jwt = require("jsonwebtoken");


exports.index = async (req, res) => {
	
}

exports.createPainting = async (req , res) => {
	const {id} = req.body;
	console.log(req.body)
	try{
		const installation = await Installation.createPainting(id);
		if(installation instanceof Installation){
			console.log("We have pulled that painting data like a boss.");
			console.log(installation.info_short_desc);
			const token = jwt.sign(JSON.stringify(installation), process.env.JWT_SECRET);
			return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
			.redirect("/testPainting")
		}
		
	} catch(error){
		console.log("Error in instllationController createPainting");
		console.log(err);
		return res.redirect("/testPainting");
	}
}