// models/clientModel.js
let db = require('../db');

class Client {
    constructor({ id, username, email }){
        this.id = id;
        this.username = username; 
		this.email = email;
    }
}