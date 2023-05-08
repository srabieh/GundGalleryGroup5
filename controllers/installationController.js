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
