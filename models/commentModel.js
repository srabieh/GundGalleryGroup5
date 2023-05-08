//including object to connect to db
const db = require('../db');

//class definition
class Comment {
	constructor({ id, client_id, name, installation_id, response_text }) {
		this.id = id;
		this.client_id = client_id;
		this.client_name = name;
		this.installation_id = installation_id;
		this.response_text = response_text;
	}

	async insert() {
		const INSERT = 'INSERT INTO comments (client_id, installation_id, response_text) VALUES (?, ?, ?)';
		const SELECT = 'SELECT * FROM comments WHERE client_id = ? AND installation_id = ? AND response_text = ?';
		if(this.response_text.length==0) { return false; }
		try {
			const exists = await db.query(SELECT, [this.client_id, this.installation_id, this.response_text])
			if (exists.length != 0) { return false; }
			const rows = await db.query(INSERT, [this.client_id, this.installation_id, this.response_text]);
		} catch (err) {
			console.error(err);
			return false;
		}
		return true;
	}

	static async getAllByInstallation({id}) { 
		const sql = 'SELECT comments.id, clients.name, comments.response_text FROM comments JOIN clients ON comments.client_id = clients.id WHERE comments.installation_id = ?';

		try {
			const rows = await db.query(sql, [id]);
			if (rows.length > 0) {
				const comments = [];
				rows.forEach(row => {
					comments.push(new Comment(row));
				});
				return comments;
			} else {
				return [];
			}
		} catch (err) {
			console.error(err);
			return false;
		}
		return [];
	}
}

exports.Comment = Comment;