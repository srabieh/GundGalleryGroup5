//Bring in the client class:
const clientModel = require("../models/clientModel");
const jwt = require("jsonwebtoken");



//Function to add a client to the database:  
exports.createClient = async (req , res) => {
	const{name , email , age , gender} = req.body;
	console.log("Controller, Create Client req.body: ");
	console.log(req.body);
	try{		
		//Attempt to add a client to the database.
		console.log("Attempting to Create Client:");
		const newClient = await clientModel.createClient(name , email , age , gender);
		//If adding the client was successful then continue and assign a token.
		if(newClient instanceof clientModel.Client){
			console.log("Adding client was succesful");
		}else{
			console.log("meow");
		}
	}catch(error){
			console.log("Error in clientController createClient()");
			return res.status(500).send("CreateClient Error");
	}
}
