// db.js

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Newgoal2024$',
  database: 'bookstore'
});

// Export the pool
module.exports = pool.promise();
