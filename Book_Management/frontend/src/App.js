// App.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import BooksPage from './components/BooksPage';
import GenresPage from './components/GenresPage';
import BookDetailsPage from './components/BookDetailsPage';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import AuthorsPage from './components/AuthorsPage';
import AddAuthorForm from './components/AddAuthorForm';
import EditAuthorForm from './components/EditAuthorForm';
import ViewAuthor from './components/ViewAuthor';
import ShowBook from './components/showbook';
import Delete from './components/deletebook';
import DeleteAuthor from './components/deleteauthor';
import Issuebook from './components/Issuebook';
import Returnbook from './components/Returnbook';
import AdminLoginForm from './components/AdminLoginForm';
import FileUpload from './components/FileUpload';
import AuthorDetails from './components/AuthorDetails'; 
import SearchAuthor from './components/SearchAuthor'; 
import ManageMembers from './components/ManageMembers'; 
import './App.css';
import './components/styles.css';

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AdminLogin" element={<AdminLoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/GenresPage" element={<GenresPage />} />
            <Route path="/books/add" element={<AddBookForm />} />
            <Route path="/books/:book_id" element={<BookDetailsPage />} />
            <Route path="/books/edit" element={<EditBookForm />} />
            <Route path="/books/:book_id/edit" element={<EditBookForm />} />
            <Route path="/books/show" element={<ShowBook />} />
            <Route path="/books/issuebook" element={<Issuebook />} />
            <Route path="/books/Returnbook" element={<Returnbook />} />
            <Route path="/books/delete" element={<Delete />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/viewauthor" element={<ViewAuthor />} />
            <Route path="/authors/add" element={<AddAuthorForm />} />
            <Route path="/authors/edit" element={<EditAuthorForm />} />
            <Route path="/authors/delete" element={<DeleteAuthor />} />
            <Route path="/authors/search" element={<SearchAuthor />} /> 
            <Route path="/authors/:author_id" element={<AuthorDetails />} />
            <Route path="/members" element={<ManageMembers />} /> 
        
            <Route path="/genres" element={<GenresPage />} />
        
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
