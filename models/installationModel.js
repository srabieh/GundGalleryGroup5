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
	
//Create a painting model with all the information.  
	static async createPainting(id){
		try{
			console.log("createPainting is Running in Model, ID = " + id);
			let painting = await db.getPaintingRowById(id);
			console.log(painting);
			if(painting){
				return new Installation(painting);
			}
		} catch(error) {
			console.error(error);
			throw error;
		}
	};
	
	
	static async finishConstructor(id) {
		const results = await db.query("SELECT * FROM installations WHERE ID = '" + id + "'");
		console.log("results:"+results);
		this.work_name = results[1];
		this.artist = results[2];
		this.material_medium = results[3];
		this.date = results[4];
		this.info_short_desc = results[5];
		return results;
	}

}

exports.Installation = Installation;