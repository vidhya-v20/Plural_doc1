const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bookstore'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());

// Route to handle Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM admin_login WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Server error' });
    } else {
      if (result.length > 0) {
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.log('Login failed');
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
