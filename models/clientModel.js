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

	static async isClient(name, email) {
		const results = await db.query('SELECT * FROM clients WHERE name = ? AND email = ?', [name, email]);
		return results == [];
	}

	static async createClient(clientData) {
		try {
			//Checking if person is in database. If yes than create client with their info, if not hen add them.
			let exists = await this.isClient(clientData.name, clientData.email);

			if(exists) { 
				return false; 
			}

			const sql = 'INSERT INTO clients (name, email, age, gender) VALUES (?, ?, ?, ?)';
			const params = [clientData.name, clientData.email, clientData.age, clientData.gender];
			try {
				const insert = await db.query(sql, params);
				const 
				return new Client(clientData);
			} 
			catch (err) {
				console.error(err);
				throw err;
			}
			return client;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

exports.Client = Client;
