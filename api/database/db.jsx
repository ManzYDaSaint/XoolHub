const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.MYSQL_HOST,
  // port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

pool.connect()
  .then((client) => {
    console.log('Connected to database successfully!');
    client.release();
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = {
    query: (text, params) => pool.query(text, params),
  };
