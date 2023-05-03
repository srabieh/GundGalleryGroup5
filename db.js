// models/db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: process.env.DB_PASSWORD,
	database: 'gund',
	connectionLimit: 5,
	waitForConnections: true
});

async function query(sql, params) {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query(sql, params);
		return rows;
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		if (conn) {
			conn.release();
		}
	}
}

// ---- Client DB Helpers -----------------------------------------------------------------
async function insertClient(client) {
	let conn;
	console.log("insertClient() is running");
	try {
		conn = await pool.getConnection();
		const sql = `INSERT INTO clients (name, email, age, gender) VALUES (?, ?, ?, ?)`;
		const result = await conn.query(sql, [client.name, client.email, client.age, client.gender]);
		console.log(`Added client ${name} to database`);
	} catch (error) {
		throw error;
	} finally {
		if (conn) conn.release();
	}
}

//This function takes in the email of the client as a parameter, connects to the MySQL database, and executes a SELECT query to check if a row with that email already exists in the clients table. If a row exists, the function returns true, otherwise it returns false. Note that this function assumes that the clients table has a column called email that stores the email addresses of clients.
async function checkClient(email) {
	let conn;
	console.log("checkClient is running");
	try {
		conn = await pool.getConnection();
		const rows = await conn.query(`SELECT * FROM clients WHERE email='${email}'`);
		if (rows.length > 0) {
			// client already exists
			return true;
		} else {
			// client does not exist
			return false;
		}
	} catch (error) {
		throw error;
	} finally {
		if (conn) conn.release();
	}
};

async function getClientIdByEmail(email) {
	try {
		const rows = await query(`SELECT id FROM clients WHERE email = ?`, [email]);
		if (rows.length > 0) {
			console.log("Client ID was Found: " + rows[0].id);
			return rows[0];
		} else {
			console.log(`No client with email ${email} found.`);
			return null;
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
}

module.exports = {
	query,
	insertClient,
	checkClient,
	getClientByEmail
};
