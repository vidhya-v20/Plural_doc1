import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ManageBooks from './BooksPage';
import ManageAuthors from './AuthorsPage';
import ManageGenres from './GenresPage';
import ManageMembers from './ManageMembers';
import FooterInside from './Footer_inside';
import Navbar_dashboard from './Navbar_dashboard';
import { BsCardChecklist, BsPerson, BsBook, BsGrid } from 'react-icons/bs'; // Import necessary icons
import './styles_dashboard.css'; // Import your CSS file for dashboard styles

const Dashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('dashboard');
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(4); // Number of books to display per page

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
    fetchMembers();
  }, []);

  useEffect(() => {
    // Filter books based on search term
    if (searchTerm.trim() === '') {
      setFilteredBooks([]);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
    setCurrentPage(1); // Reset to the first page when searching
  }, [searchTerm, books]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchTerm.trim() === '' ? books.slice(indexOfFirstBook, indexOfLastBook) : filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderBookCards = () => {
    if (searchTerm.trim() === '') {
      return null; // Display nothing if search term is empty
    }

    if (currentBooks.length === 0) {
      return (
        <div className="text-center mt-3">
          <p>No books found matching '{searchTerm}'</p>
        </div>
      );
    }

    return (
      <div className="row mt-3">
        {currentBooks.map(book => (
          <div key={book.book_id} className="col-md-3 mb-4">
            <div className="card">
              <img src={`http://localhost:5000/images/${book.image}`} className="card-img-top book-image" alt={book.title} />
              <div className="card-body">
                <h6 className="card-title">{book.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSelectedContent = () => {
    switch (selectedNavItem) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h4>Welcome to the Admin Dashboard of Book Kingdom</h4>
            <p className="lead">Manage the book inventory, authors, genres, and members.</p>
            <div className="row mt-5">
              <div className="col-md-3">
                <div className="card text-white bg-primary mb-3">
                  <div className="card-body text-center">
                    <h5 className="card-title">Books</h5>
                    <div className="d-flex align-items-center justify-content-center">
                      <BsBook className="display-4 me-2" />
                      <h2>{books.length}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-warning mb-3">
                  <div className="card-body text-center">
                    <h5 className="card-title">Authors</h5>
                    <div className="d-flex align-items-center justify-content-center">
                      <BsPerson className="display-4 me-2" />
                      <h2>{authors.length}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-success mb-3">
                  <div className="card-body text-center">
                    <h5 className="card-title">Genres</h5>
                    <div className="d-flex align-items-center justify-content-center">
                      <BsGrid className="display-4 me-2" />
                      <h2>{genres.length}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-info mb-3">
                  <div className="card-body text-center">
                    <h5 className="card-title">Members</h5>
                    <div className="d-flex align-items-center justify-content-center">
                      <BsCardChecklist className="display-4 me-2" />
                      <h2>{members.length}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2>Search Books</h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search books..."
                value={searchTerm}
                onChange={handleSearch}
              />
              {renderBookCards()}
              {/* Pagination */}
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        );
      case 'manage_books':
        return <ManageBooks />;
      case 'manage_authors':
        return <ManageAuthors />;
      case 'manage_genres':
        return <ManageGenres />;
      case 'manage_members':
        return <ManageMembers />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <Navbar_dashboard />
      <div className="row">
        {/* Sidebar */}
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedNavItem === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setSelectedNavItem('dashboard')}
                >
                  <BsGrid className="me-2" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedNavItem === 'manage_books' ? 'active' : ''}`}
                  onClick={() => setSelectedNavItem('manage_books')}
                >
                  <BsBook className="me-2" /> Book Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedNavItem === 'manage_authors' ? 'active' : ''}`}
                  onClick={() => setSelectedNavItem('manage_authors')}
                >
                  <BsPerson className="me-2" /> Manage Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedNavItem === 'manage_genres' ? 'active' : ''}`}
                  onClick={() => setSelectedNavItem('manage_genres')}
                >
                  <BsGrid className="me-2" /> Manage Genres
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${selectedNavItem === 'manage_members' ? 'active' : ''}`}
                  onClick={() => setSelectedNavItem('manage_members')}
                >
                  <BsCardChecklist className="me-2" /> Manage Members
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* Page content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3 pb-2 mb-3">
            {renderSelectedContent()}
          </div>
        </main>
      </div>
      <FooterInside />
    </div>
  );
};

export default Dashboard;
