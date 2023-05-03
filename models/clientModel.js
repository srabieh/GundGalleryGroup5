// models/clientModel.js
let db = require('../db');

//Define the Class--------------------------------
class Client {
	constructor({ id, name, email, age, gender }) {
		this.id = id;
		this.name = name; 
		this.email = email;
		this.age = age;
		this.gender = gender;
	}
	
	//Function will return true or false as to whether a client already exists:
	static async isClient(name, email) {
		const results = await db.query('SELECT * FROM clients WHERE name = ? AND email = ?', [name, email]);
		return results == [];
	}
	
	//Function to create a new client when someone comes on to take the survey.
	static async createClient(clientData) {
		try {
			let client = await db.getClientRowByEmail(clientData.email);

			if(client) { 
				console.log("Client already exists in database");
				return new Client(client); 
			}
			
			const sql = 'INSERT INTO clients (name, email, age, gender) VALUES (?, ?, ?, ?)';
			const params = [clientData.name, clientData.email, clientData.age, clientData.gender];
			
			try {
				const insert = await db.query(sql, params);
				const client = await db.getClientByEmail(clientData.email);
				
				console.log(clientData.name + " has been added to the database");
				
				return new Client(client);
			} catch (err) {
				console.error(err);
				throw err;
			}
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
	
	//Function for a client to push a comment to the database.
	async pushComment(comment) { }
}

exports.Client = Client;
