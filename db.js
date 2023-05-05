// models/db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
	host: process.env.HOST,
	user: process.env.DB_USERNAME,
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
// ---- Client DB Helpers ----------------------------------------------------------------
module.exports = { query };
