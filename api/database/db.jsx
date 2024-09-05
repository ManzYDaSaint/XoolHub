const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
