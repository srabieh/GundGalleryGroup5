// models/userModel.js
let db = require('../db');

exports.authenticate = async (username, password) => {
    try {
        const result = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
        const user = result[0];

        if (user && user.password === password) { // For simplicity, we're using plain-text password comparison. Use a proper hashing method in a real-world application.
            return user
        } else if (user) {
			return 'Incorrect password'
		} else {
            return 'Username does not exist';
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

