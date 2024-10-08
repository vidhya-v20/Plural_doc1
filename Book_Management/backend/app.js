// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection
const multer = require('multer');
const path = require('path');




const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


// Endpoint to get all books
app.get('/books', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT book_id, title, image FROM books');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});

// Endpoint to add a new book
app.post('/books', async (req, res, next) => {
  const { title, author_name, genre_name, price, publication_date } = req.body;

  // Validate inputs
  if (!title || !author_name || !genre_name || !price || !publication_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Fetch author_id based on author_name
    const [authorResult] = await db.query('SELECT author_id FROM authors WHERE name = ?', [author_name]);
    if (authorResult.length === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    const author_id = authorResult[0].author_id;

    // Fetch genre_id based on genre_name
    const [genreResult] = await db.query('SELECT genre_id FROM genres WHERE genre_name = ?', [genre_name]);
    if (genreResult.length === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    const genre_id = genreResult[0].genre_id;

    // Format publication_date correctly (assuming it's a string in 'YYYY-MM-DD' format)
    const formattedPublicationDate = new Date(publication_date).toISOString().slice(0, 10);

    // Insert the new book with retrieved author_id, genre_id, and formatted publication_date
    await db.query('INSERT INTO books (title, author_id, genre_id, price, publication_date) VALUES (?, ?, ?, ?, ?)',
      [title, author_id, genre_id, price, formattedPublicationDate]);
    res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to update a book by book_id
app.put('/books/:book_id', async (req, res, next) => {
  const book_id = req.params.book_id;
  const { title, author_name, genre_name, price, publication_date } = req.body;

  // Validate inputs
  if (!title || !author_name || !genre_name || !price || !publication_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Fetch author_id based on author_name
    const [authorResult] = await db.query('SELECT author_id FROM authors WHERE name = ?', [author_name]);
    if (authorResult.length === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    const author_id = authorResult[0].author_id;

    // Fetch genre_id based on genre_name
    const [genreResult] = await db.query('SELECT genre_id FROM genres WHERE genre_name = ?', [genre_name]);
    if (genreResult.length === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    const genre_id = genreResult[0].genre_id;

    // Parse and format publication_date to 'YYYY-MM-DD' format
    const formattedPublicationDate = new Date(publication_date).toISOString().slice(0, 10);

    // Update the book with retrieved author_id and genre_id
    const [result] = await db.query('UPDATE books SET title=?, author_id=?, genre_id=?, price=?, publication_date=? WHERE book_id=?',
      [title, author_id, genre_id, price, formattedPublicationDate, book_id]);
    if (result.changedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});



// Endpoint to delete a book by book_id
app.delete('/books/:book_id', async (req, res, next) => {
  const book_id = req.params.book_id;
  try {
    const [result] = await db.query('DELETE FROM books WHERE book_id = ?', [book_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// Endpoint to get all authors
app.get('/authors', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM authors');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to add a new author
app.post('/authors', async (req, res, next) => {
  const { name, biography } = req.body;

  // Validate inputs
  if (!name || !biography) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Insert the new author
    await db.query('INSERT INTO authors (name, biography) VALUES (?, ?)', [name, biography]);
    res.status(201).json({ message: 'Author added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to update an author by author_id
app.put('/authors/:author_id', async (req, res, next) => {
  const author_id = req.params.author_id;
  const { name, biography } = req.body;

  // Validate inputs
  if (!name || !biography) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Update the author
    await db.query('UPDATE authors SET name=?, biography=? WHERE author_id=?', [name, biography, author_id]);
    res.json({ message: 'Author updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to delete an author by author_id
app.delete('/authors/:author_id', async (req, res, next) => {
  const author_id = req.params.author_id;
  try {
    const [result] = await db.query('DELETE FROM authors WHERE author_id = ?', [author_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// Endpoint to get a book by author_id
app.get('/authors/:author_id', async (req, res, next) => {
  const author_id = req.params.author_id;
  try {
    const [rows, fields] = await db.query('SELECT * FROM authors WHERE author_id = ?', [author_id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(rows[0]); // Assuming book_id is unique, return the first (and only) result
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});

// Endpoint to get all genres
app.get('/genres', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM genres');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/genres/:genre_id', async (req, res, next) => {
  const genre_id = req.params.genre_id;
  try {
    const [rows, fields] = await db.query('SELECT * FROM genres WHERE genre_id = ?', [genre_id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// Endpoint to add new genres
app.post('/genres', async (req, res, next) => {
  const { genre_name } = req.body;

  // Validate input
  if (!genre_name) {
    return res.status(400).json({ message: 'Genre name is required' });
  }

  try {
    // Insert new genre
    await db.query('INSERT INTO genres (genre_name) VALUES (?)', [genre_name]);
    res.status(201).json({ message: 'Genre added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to update new genres
app.put('/genres/:genre_id', async (req, res, next) => {
  const genre_id = req.params.genre_id;
  const { genre_name } = req.body;

  // Validate input
  if (!genre_name) {
    return res.status(400).json({ message: 'Genre name is required' });
  }

  try {
    // Update genre
    const [result] = await db.query('UPDATE genres SET genre_name = ? WHERE genre_id = ?', [genre_name, genre_id]);
    if (result.changedRows === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.json({ message: 'Genre updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// Endpoint to get all members
app.get('/members', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM members');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});

// Endpoint to add a new member
app.post('/members', async (req, res, next) => {
  const { name, email, username, password } = req.body;

  // Validate inputs
  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if member already exists
    const [existingMember] = await db.query('SELECT * FROM members WHERE username = ?', [username]);
    if (existingMember.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert the new member
    await db.query('INSERT INTO members (name, email, username, password) VALUES (?, ?, ?, ?)',
      [name, email, username, password]);
    res.status(201).json({ message: 'Member added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to update a member by member_id
app.put('/members/:member_id', async (req, res, next) => {
  const member_id = req.params.member_id;
  const { name, email, username, password } = req.body;

  // Validate inputs
  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Update the member
    await db.query('UPDATE members SET name=?, email=?, username=?, password=? WHERE member_id=?',
      [name, email, username, password, member_id]);
    res.json({ message: 'Member updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to delete a member by member_id
app.delete('/members/:member_id', async (req, res, next) => {
  const member_id = req.params.member_id;
  try {
    const [result] = await db.query('DELETE FROM members WHERE member_id = ?', [member_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Endpoint to fetch issued books
app.get('/books/issued', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM issued_books_mem_view WHERE returned_date IS NULL');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});


// Endpoint to issue a book to a member
app.put('/books/issue/:book_id/:member_id', async (req, res, next) => {
  const book_id = req.params.book_id;
  const member_id = req.params.member_id;

  console.log(`Issuing book ${book_id} to member ${member_id}`);

  try {
    // Check if the book is already issued to the same member
    const [issuedBooks] = await db.query('SELECT * FROM issued_books WHERE book_id = ? AND member_id = ? AND returned_date IS NULL', [book_id, member_id]);
    if (issuedBooks.length > 0) {
      return res.status(400).json({ message: 'Book is already issued to the same member' });
    }

    // Insert into issued_books table with current date as issued_date
    await db.query('INSERT INTO issued_books (book_id, member_id, issued_date) VALUES (?, ?, CURDATE())', [book_id, member_id]);

    res.json({ message: 'Book issued successfully' });
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});



// Endpoint to return a book

app.put('/books/return/:book_id', async (req, res, next) => {
  const book_id = req.params.book_id;

  try {
    // Check if the book is issued and not returned
    const [issuedBook] = await db.query('SELECT * FROM issued_books WHERE book_id = ? AND returned_date IS NULL', [book_id]);
    if (issuedBook.length === 0) {
      return res.status(404).json({ message: 'Book is not issued or already returned' });
    }

    // Update the issued_books table with current date as returned_date
    await db.query('UPDATE issued_books SET returned_date = CURDATE() WHERE book_id = ?', [book_id]);

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});

// Endpoint to return a book for a specific member
app.put('/books/return/:book_id/:member_id', async (req, res, next) => {
  const book_id = req.params.book_id;
  const member_id = req.params.member_id;

  try {
    // Check if the book is issued to the member and not returned
    const [issuedBook] = await db.query('SELECT * FROM issued_books WHERE book_id = ? AND member_id = ? AND returned_date IS NULL', [book_id, member_id]);
    if (issuedBook.length === 0) {
      return res.status(404).json({ message: 'Book is not issued to this member or already returned' });
    }

    // Update the issued_books table with current date as returned_date
    await db.query('UPDATE issued_books SET returned_date = CURDATE() WHERE book_id = ? AND member_id = ?', [book_id, member_id]);

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});


// Example endpoint to fetch issued books
app.get('/issued_books', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM issued_books');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching issued books:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to handle Admin Login
app.post('/AdminLogin', async (req, res, next) => {
  const { username, password } = req.body;

  // Here, you would typically check against your database for the correct username and password
  // For simplicity, I'll assume you have a hardcoded check
  if (username === 'admin' && password === 'admin') {
    // Successful login, send a success response
    res.json({ message: 'Login successful' });
  } else {
    // Incorrect credentials, send an error response
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // directory where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

// Configure multer for file upload
const upload = multer({ storage: storage });

// Endpoint to get all book titles
app.get('/books/titles', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT book_id, title FROM books');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});

// Example endpoint to handle file upload and update book with image
app.post('/upload', upload.single('image'), async (req, res) => {
  const image = req.file.filename;
  const bookId = req.body.book_id; // Retrieve book_id from request body

  if (!bookId) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  const sql = "UPDATE books SET image = ? WHERE book_id = ?";
  db.query(sql, [image, bookId], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: "Error" });
    }

    return res.json({ Status: "Success" });
  });
});

// Example endpoint to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  const image = req.file.filename;
  const bookId = req.body.book_id; // Retrieve book_id from request body

  if (!bookId) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  const sql = "UPDATE books SET image = ? WHERE book_id = ?";
  db.query(sql, [image, bookId], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: "Error" });
    }

    return res.json({ Status: "Success" });
  });
});


// Combined POST endpoint for adding a book with or without image
app.post('/books', upload.single('image'), async (req, res, next) => {
  console.log(req.file);
  const { title, author_name, genre_name, price, publication_date } = req.body;
  const imagePath = req.file ? req.file.path : null; // path where image is stored on server

  // Validate inputs
  if (!title || !author_name || !genre_name || !price || !publication_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Fetch author_id based on author_name
    const [authorResult] = await db.query('SELECT author_id FROM authors WHERE name = ?', [author_name]);
    if (authorResult.length === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    const author_id = authorResult[0].author_id;

    // Fetch genre_id based on genre_name
    const [genreResult] = await db.query('SELECT genre_id FROM genres WHERE genre_name = ?', [genre_name]);
    if (genreResult.length === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    const genre_id = genreResult[0].genre_id;

    // Insert the new book with retrieved author_id, genre_id, and imagePath
    const insertQuery = 'INSERT INTO books (title, author_id, genre_id, price, publication_date, image) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [title, author_id, genre_id, price, publication_date, imagePath];
    
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to add book' });
      }
      
      const insertedBookId = result.insertId; // Get the ID of the inserted book
      res.status(201).json({ message: 'Book added successfully', bookId: insertedBookId });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});



// Middleware to handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
};


// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


