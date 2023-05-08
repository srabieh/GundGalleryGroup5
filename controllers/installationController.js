const Installation = require("../models/installationModel").Installation;
const Client = require("../models/clientModel").Client; 
const Comment = require("../models/commentModel").Comment;
const jwt = require("jsonwebtoken");

exports.get = async (req, res) => {
    const { id } = req.params;
    if (req.cookies.access_token) 
    { 
        try {
            const token_data = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            
            const client = await Client.getById(token_data.id);
            const installation = await Installation.getById(id);
            const comments = await Comment.getAllByInstallation(installation.id);

            if(installation instanceof Installation && client instanceof Client) {
                return res.render("installation", { installation: installation, client: client, comments: comments });
            }
        } catch(error) {
            console.log(error);
            return res.redirect("/");
        }
    }
    res.redirect("/");
}

//push user response on installation to the database.
exports.pushWords = async (req, res) => {
	const url = req.headers.referer;
	//Get the page that they came from
	const installationID = url.split('/').pop();
	const{wordOne , wordTwo, wordThree} = req.body;
	console.log("pushWords is running");
	if (req.cookies.access_token){
		try{
			const token_data = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            const client = await Client.getById(token_data.id)
			Installation.pushWords(client.id , installationID , wordOne , wordTwo, wordThree);
			res.redirect(url);
		} catch(error){
			console.log(error);
            return res.redirect(url);
		}
	} 

}
