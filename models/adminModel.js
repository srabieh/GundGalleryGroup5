// models/userModel.js
const db = require('../db');

// ---- Admin class ----------------------------------------------------------------------
class Admin {
    constructor({ id, username }) {
        this.id = id;
        this.username = username;
    }
    
    // ---- Returns an Admin object ----------------------------------------------------------
    static async login (username, password) {
        try {
            const result = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    
            if (result[0] && result[0].password === password) { // For simplicity, we're using plain-text password comparison. Use a proper hashing method in a real-world application.
                let admin = new Admin(result[0]);
                return admin;
            } else if (result[0]) {
                return 'Incorrect password';
            } else {
                return 'Incorrect username or password';
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllWords() {
        try {
            const result = await db.query('SELECT * FROM words');
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = Admin;