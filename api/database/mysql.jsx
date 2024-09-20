const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

conn.connect(error => {
  if (error) throw error;
  console.log('Connected to MySQL successfully!');

  if (conn.connect) {
    console.log('Connection is active!');
  } else {
    console.error('Connection is not active.');
  }

  // Perform database operations here
});

module.exports = {
  query: (text, params) => conn.query(text, params),
};