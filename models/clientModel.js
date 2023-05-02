// models/clientModel.js
let db = require('../db');

//Define the Class--------------------------------
class Client {
    constructor({ id, name, email, age, gender }){
        this.id = id;
        this.name = name; 
		this.email = email;
		this.age = age;
		this.gender = gender;
};


//Create a client, and add them to database.
static async createClient(name, email, age, gender){
    try {
		console.log("createClient is running");
		//Checking if person is in database. If yes than create client with their info, if no then add them.
		let clientExists = await db.checkClient(email);
		if(clientExists){
			let clientID = await db.getClientIdByEmail(email);
			console.log("Client Exists: Welcome back " + name);
			//Create new client object using data passed and ID from database.
			let newClient = new Client({
			  id: clientID,
			  name: name,
			  email: email,
			  age: age,
			  gender: gender
			});
			console.log("newClient is now being returned");
			return newClient;
		}else{
			//Client isn't already in database so we add them and then make the client object.
			await db.insertClient(name,email,age,gender);
			console.log(name + " has been added to the database");
			let clientID = await db.getClientIdByEmail(email);
			//Create newClient:
			let newClient = new Client({
			  id: clientID,
			  name: name,
			  email: email,
			  age: age,
			  gender: gender
			});
			console.log("newClient is now being returned");
			return newClient;
		}
    }catch(error){
        console.error(error);
        throw error;
    }
};


};

module.exports = Client;