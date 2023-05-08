// models/clientModel.js
let db = require('../db');

//Define the Class--------------------------------
class Client {
	constructor({ id, name, email, age, gender, last_submission_date='null'}) {
		this.id = id;
		this.name = name; 
		this.email = email;
		this.age = age;
		this.gender = gender;
		this.last_submission_date = last_submission_date;
	}
	
	// Function to create a new client when someone comes on to take the survey.
	static async join(clientData) {
		try {
			console.log(clientData);
			const client = await Client.getByEmail(clientData.email);

			if(client) { 
				return client; 
			}
			
			const sql = 'INSERT INTO clients (name, email, age, gender, last_submission_date) VALUES (?, ?, ?, ?, ?)';
			const date = new Date();
			const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ').slice(0, 10);
			const params = [clientData.name, clientData.email, clientData.age, clientData.gender, formattedDate];
			
			try {
				const insert = await db.query(sql, params);
				const client = await Client.getByEmail(clientData.email);
				return client;
			} catch (err) {
				console.error(err);
				throw err;
			}
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	static async getById(id) {
		try {
			const rows = await db.query(`SELECT * FROM clients WHERE id = ?`, [id]);
			if (rows.length > 0) {
				return new Client(rows[0]);
			} else {
				return null;
			}
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	static async getByEmail(email) {
		console.log(email);
		try {
			const rows = await db.query(`SELECT * FROM clients WHERE email = ?`, [email]);
			if (rows.length > 0) {
				return new Client(rows[0]);
			} else {
				return null;
			}
		} catch (err) {
			console.error(err);
			return false;
		}
	}	
}

exports.Client = Client;
