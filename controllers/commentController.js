const Client = require("../models/clientModel").Client; 
const Comment = require("../models/commentModel").Comment;
const jwt = require("jsonwebtoken");

exports.create = async (req , res) => {
    if (req.cookies.access_token) 
    { 
        try {
            const { installation_id } = req.params;
            const { response_text } = req.body;

            const token_data = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            const client = await Client.getById(token_data.id);

            const comment = new Comment({
                client_id: client.id,
                installation_id: installation_id, 
                response_text: response_text
            });
            const status = await comment.insert(); 
            
            return res.status(200).redirect(req.get('referer'));;
        } catch(error){
            console.log(error);
            return res.redirect("/");
        }
    }
}