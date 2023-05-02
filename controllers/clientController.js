const Client = require("../models/clientModel").Client;
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
	if (req.cookies.access_token)
	{
		return res.status(200);
	}
	return res.status(401);
}

// ---- Create a client and login --------------------------------------------------------
exports.createClient = async (req , res) => {
<<<<<<< HEAD
=======

>>>>>>> main
	const { name , email , age , gender } = req.body;
	try {		
		const client = await Client.createClient({name, email, age, gender});

		if(client instanceof Client){
			const token = jwt.sign(JSON.stringify(client), process.env.JWT_SECRET);
<<<<<<< HEAD
=======
			console.log("Adding the client was a success");
>>>>>>> main
			return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .redirect("/survey");
		}
	} catch(error){
<<<<<<< HEAD
=======
		console.log("Error in clientController createClient");
>>>>>>> main
		console.log(err);
		return res.redirect("/survey");
	}
}

// ---- Log client out -------------------------------------------------------------------
exports.logout = async (req, res) => {
    return res.clearCookie("access_token")
        .redirect("/");
};
<<<<<<< HEAD
=======


//--- Client pushing a comment to the database ------------------
exports.pushComment = async (req,res) => {
	
};
>>>>>>> main
