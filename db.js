// models/db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'GrantCulbertson',
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

//Client Functions----------------------------------

//Insert a client into the database
async function insertClient(name, email, age, gender) {
  console.log("insertClient is running:");
  const sql = 'INSERT INTO clients (name, email, age, gender) VALUES (?, ?, ?, ?)';
  const params = [name, email, age, gender];
  try {
    const rows = await pool.query(sql, params);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//Check if a client exists in the database:
async function checkClient(name, email) {
  console.log("checkClient is running");
  const [rows, fields] = await pool.query('SELECT * FROM clients WHERE name = ? AND email = ?', [name, email]);
  return rows.length > 0;
}



module.exports = {
    query
};


