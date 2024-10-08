import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsPlusSquare, BsPencilSquare, BsSearch, BsTrash, BsListUl } from 'react-icons/bs';
import authorImage from './images/authorimage.jpeg';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await axios.delete(`http://localhost:5000/authors/${authorId}`);
        setAuthors(authors.filter(author => author.author_id !== authorId));
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-7">
        <h2>Manage Authors</h2>
        <div>
          <p>Manage your authors effectively with ease and efficiency!</p>
        </div>
        <div className="mb-3">
          <div className="btn-group mb-3" role="group">
            <Link to="/authors/add" className="btn btn-primary me-2">
              <BsPlusSquare className="me-2" /> Add Author
            </Link>
            <Link to="/authors/edit" className="btn btn-warning me-2">
              <BsPencilSquare className="me-2" /> Edit Author
            </Link> 
         
          </div>
          <div className="btn-group mb-3" role="group">
            <Link to="/authors/viewauthor" className="btn btn-dark me-2">
              <BsListUl className="me-2" /> View Authors
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-5">
        <img src={authorImage} alt="Author Image" className="img-fluid mb-3" style={{ maxHeight: '700px' }} />
      </div>
    </div>
  );
};

export default AuthorsPage;
