const adminModel = require("../models/clientModel");
const jwt = require("jsonwebtoken");

//Functions will be below this:

//Add a client to the database:  
exports.createClient = async (req , res) => {
	const{name , email , age , gender} = req.body;
	console.log("Controller, Create Client req.body: ");
	console.log(req.body);
	try{		
		//Attempt to add a client to the database.
		console.log("Attempting to Create Client:")
		const client = await clientModel.createClient(name , email , age , gender);
		//If adding the client was successful then continue and assign a token.
		if(client instanceof clientModel.Client){
			const token = jwt.sign(JSON.stringify(admin), process.env.JWT_SECRET);
			return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .redirect("/admin");
		}
		
	} catch(error){
			return res.status(500).send("CreateClient Error");
	}
}
