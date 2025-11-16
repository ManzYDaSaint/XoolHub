const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD || '', // Allow empty password
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 50,  // Increased from 10 to support more schools
  queueLimit: 100,      // Added queuing to handle connection spikes
  timeout: 60000,       // 60 seconds timeout for acquiring connections
  idleTimeout: 300000   // 5 minutes idle timeout
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  connection.release();
});

module.exports = pool.promise();