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
            const comments = await Comment.getAllByInstallation(installation);
            
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

exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Installation.delete(id);
        if (result) {
            return res.status(200).redirect(req.get('referer'));;
        } else {
            return res.render('error', { error: 'Installation with ID ${id} not found.' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error.' });
    }
}

exports.create = async (req, res) => {
    try {
        const result = await Installation.create({...req.body, image: req.file.filename});
        if (result) {
            return res.status(200).redirect(req.get('referer'));;
        } else {
            return res.render('error', { error: 'Installation with ID ${id} not found.' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error.' });
    }
}
