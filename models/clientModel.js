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
    }
}





//Create a client, and add them to database.
exports.createClient = async (name, email, age, gender) => {
    try {
		//Checking if person is in database. If yes than create client with their info, if no then add them.
		const clientExists = await db.checkClient(name, email);
		console.log(clientExists);
		if(clientExists){
			console.log("Client Exists");
			//Create new client
			let client = new Client({
			  id: 1,
			  name: name,
			  email: email,
			  age: age,
			  gender: gender
			});
			return client;
		} else{
			console.log("Client does not exit... Adding them");
			await db.insertClient(name,email,age,gender);
			let client = new Client({
			  id: 1,
			  name: name,
			  email: email,
			  age: age,
			  gender: gender
			});
			return client;
		}
    }catch(error){
        console.error(error);
        throw error;
    }
};


exports.Client = Client;
