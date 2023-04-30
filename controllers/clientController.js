const Client = require("../models/clientModel").Client;
const jwt = require("jsonwebtoken");

// Add a client to the database:  
exports.createClient = async (req , res) => {
	const{name , email , age , gender} = req.body;
	try {		
		const client = await Client.createClient({name, email, age, gender});
		if(client instanceof Client){
			const token = jwt.sign(JSON.stringify(client), process.env.JWT_SECRET);
			return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .redirect("/"); // todo: probably go somewhere else...
		}
	} catch(error){
			return res.status(500).send("CreateClient Error");
	}
}
