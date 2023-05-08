//including object to connect to db
const db = require('../db');

// class definition
class Installation {
	constructor({id , work_name , artist, material_medium, date, info_short_desc, image }) {
		this.id = id;
		this.work_name = work_name;
		this.artist = artist;
		this.material_medium = material_medium;
		this.date = date;
		this.info_short_desc = info_short_desc;
		this.image = image;
	}
	
	static async getAll() {
		try {
			const rows = await db.query(`SELECT * FROM installations`, []);
			if (rows.length !== 0) {
				const installations = [];
				rows.forEach(row => {
					installations.push(new Installation(row));
				});
				return installations;
			} else {
				console.log(`No installations found.`);
				return null;
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	}


	static async getById(id) {
		try {
			const rows = await db.query(`SELECT * FROM installations WHERE id = ?`, [id]);
			if (rows.length > 0) {
				return new Installation(rows[0]);
			} else {
				console.log(`No installation ${id} found.`);
				return null;
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
		return false;
	}
	
	static async create({ work_name, artist, material_medium, date, info_short_desc, image }) {
		try {
			const result = await db.query('INSERT INTO installations (work_name, artist, material_medium, date, info_short_desc, image) VALUES (?, ?, ?, ?, ?, ?)', [work_name, artist, material_medium, date, info_short_desc, image]);
			if (result.affectedRows === 1) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.error(err);
			return false;
		}
	}
	
	static async delete(id) { 
		try {
			console.log("delete ID: " +id)
			const result = await db.query('DELETE FROM installations WHERE id = ?', [id]);
			if (result.affectedRows === 1) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.error(err);
			return false;
		}
	}
	
	static async pushWords(clientID, installationID , wordOne, wordTwo, wordThree){
		const wordsSmashed = wordOne + " " + wordTwo + " " + wordThree;
		console.log(wordsSmashed);
		const sql = 'INSERT INTO wordcloud (client_id, installation_id, words) VALUES (?, ?, ?)';
		const params = [clientID, installationID, wordsSmashed];
		try{
			const insert = await db.query(sql , params);
		} catch (err){
			console.error(err);
			throw err;
		}

	}
	
	//Get words from the database.
	static async getResponses(installationID){
		try{
			const rows = await db.query(`SELECT * FROM wordcloud WHERE installation_id IN (?)`, [installationID]);
			if(rows){
				console.log(rows);
				return rows;
			}
		} catch (err){
			console.error(err);
			throw err;
		}
	}
}




exports.Installation = Installation;