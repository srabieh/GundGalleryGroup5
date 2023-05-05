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
	
	// ----  Create a painting model with all the information. -------------------------------
	static async getInstallation(id){
		try{
			let painting = await Installation.getById(id);
			if(painting){
				return new Installation(painting);
			}
		} catch(error) {
			console.error(error);
			throw error;
		}
	};	

	static async getById(id) {
		try {
			const rows = await db.query(`SELECT * FROM installations WHERE id = ?`, [id]);
			if (rows.length > 0) {
				console.log("Client ID was Found: " + rows[0].id);
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
}

exports.Installation = Installation;