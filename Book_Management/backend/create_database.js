const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// Read the SQL script
const sqlScript = fs.readFileSync(path.join(__dirname, 'create_database.sql')).toString();

// Create a connection to MySQL (replace with your MySQL credentials)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // replace with your MySQL root password
  multipleStatements: true
});

// Execute the SQL script
connection.query(sqlScript, (err) => {
  if (err) {
    console.error('Error executing script:', err);
    process.exit(1);
  } else {
    console.log('Database created successfully');
    process.exit(0);
  }
});