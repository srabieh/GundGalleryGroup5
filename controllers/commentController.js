const Comment = require("../models/commentModel").Comment;

exports.getByInstallation = async (req, res) => {
	const { installation_id } = req.params;
    // TODO: Get all comments for specific installation
}

exports.create = async (req , res) => {
    const { client_id , installation_id } = req.params;
	const { comment } = req.body;
    // TODO: Update DB with new comment data...
}
