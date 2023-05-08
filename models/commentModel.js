//including object to connect to db
const db = require('../db');

//class definition
class Comment {

	constructor({ id, client_id, installation_id, response_text }) {
		this.id = id;
		this.client_id = client_id;
		this.installation_id = installation_id;
		this.response_text = response_text;
	}
	
	// ----  Create a painting model with all the information. -------------------------------
	static async getAllByInstallation(installation) { };	
}

exports.Comment = Comment;