// models/clientModel.js
let db = require('../db');

class Client {
    constructor({ id, username }){
        this.id = id;
        this.username = username; 
    }
}