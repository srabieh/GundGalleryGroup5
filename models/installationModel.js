//including object to connect to db
const db = require('../db');

//class definition
class Installation {
	constructor({id , work_name , artist, material_medium, date, info_short_desc}) {
		this.id = id;
		this.work_name = work_name;
		this.artist = artist;
		this.material_medium = material_medium;
		this.date = date;
		this.info_short_desc = info_short_desc;
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
				return new Installation({...rows[0]});
			} else {
				console.log(`No installation ${id} found.`);
				return null;
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
	
	
	//Push words into database.
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

}


exports.Installation = Installation;