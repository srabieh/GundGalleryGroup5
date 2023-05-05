const Installation = require("../models/installationModel").Installation;
const jwt = require("jsonwebtoken");


exports.index = async (req, res) => {
    const { id } = req.params;
    try{
        const installation = await Installation.getInstallation(id);
        if(installation instanceof Installation){
            return res.render("installation", { installation: installation });
        }
        
    } catch(error){
        console.log(error);
        return res.redirect("/");
    }
}
