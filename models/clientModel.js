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
	static async newClient(clientData) {
		try {
			let client = await Client.getClientRowByEmail(clientData.email);

			if(client) { 
				console.log("Client already exists in database");
				console.log(client);
				// ---- check if submission date is diff from today --------------------------------------
				return client; 
			}
			
			const sql = 'INSERT INTO clients (name, email, age, gender, last_submission_date) VALUES (?, ?, ?, ?, ?)';
			const params = [clientData.name, clientData.email, clientData.age, clientData.gender, (new Date().now())];
			
			try {
				const insert = await db.query(sql, params);
				const client = await Client.getClientRowByEmail(clientData.email);
				console.log(clientData.name + " has been added to the database");
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

	static async getClientRowByEmail(email) {
		try {
			const rows = await db.query(`SELECT * FROM clients WHERE email = ?`, [email]);
			if (rows.length > 0) {
				return new Client({...rows[0]});
			} else {
				return null;
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	}	
}

exports.Client = Client;
