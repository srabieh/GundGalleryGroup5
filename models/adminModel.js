// models/userModel.js
let db = require('../db');

class Admin {
    constructor(id, username){
        this.id = id;
        this.username = username; 
    }

    createToken() {

    }

}

exports.login = async (username, password) => {
    try {
        const result = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
        const user = result[0];
        
        if (user && user.password === password) { // For simplicity, we're using plain-text password comparison. Use a proper hashing method in a real-world application.
            let admin = new Admin(user.id, user.username);
            // let t = admin.createToken();
            return admin;
        } else if (user) {
            return 'Incorrect password.';
		} else {
            return 'Incorrect username or password.';
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.Admin = Admin;