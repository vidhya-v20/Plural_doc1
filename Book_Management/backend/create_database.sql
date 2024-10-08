-- Create the bookstore database
CREATE DATABASE bookstore;

-- Switch to the bookstore database
USE bookstore;


-- Create the Books table
CREATE TABLE Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    genre_id INT,
    price DECIMAL(10, 2),
    publication_date DATE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

CREATE TABLE members (
  member_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Create the Authors table
CREATE TABLE Authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    biography TEXT
);

-- Create the Genres table
CREATE TABLE Genres (
    genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS  bookstore.admin_login (
	  id INT AUTO_INCREMENT PRIMARY KEY,
	  username VARCHAR(255) NOT NULL,
	  password VARCHAR(255) NOT NULL,
	  remember_me BOOLEAN NOT NULL
	);


CREATE TABLE issued_books (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    issued_date DATE NOT NULL,
    returned_date DATE DEFAULT NULL,
    CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books(book_id),
    CONSTRAINT fk_member_id FOREIGN KEY (member_id) REFERENCES members(member_id)
);


CREATE VIEW issued_books_view AS
SELECT ib.issue_id, b.title AS book_title, m.name AS member_name
FROM issued_books ib
JOIN books b ON ib.book_id = b.book_id
JOIN members m ON ib.member_id = m.member_id
WHERE ib.returned_date IS NULL;

