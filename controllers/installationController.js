const Installation = require("../models/installationModel").Installation;

exports.index = async (req, res) => {
	
}

exports.createPainting = async (req , res) => {
	const {id} = req.body;
	try{
		const painting = await Installation.createPainting(id);
		if(painting instanceof Installation){
			console.log("We have pulled that painting data like a boss.")
		}
		
	} catch(error){
		console.log("Error in instllationController createPainting");
		console.log(err);
		return res.redirect("/");
	}
}