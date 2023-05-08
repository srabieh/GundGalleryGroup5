const Installation = require("../models/installationModel").Installation;
const Client = require("../models/clientModel").Client; 
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
    
};

exports.get = async (req, res) => {
    if (req.cookies.access_token) 
    { 
        try{
            const { id } = req.params;
            const installation = await Installation.getById(id);
            const token_data = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            const client = await Client.getByEmail(token_data.email);

            if(installation instanceof Installation && client instanceof Client) {
                return res.render("installation", { installation: installation });
            }
            
        } catch(error){
            console.log(error);
            return res.redirect("/");
        }
    }
    res.redirect("/survey");
}

