import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ManageBooks from './BooksPage';
import ManageAuthors from './AuthorsPage';
import ManageGenres from './GenresPage';
import ManageMembers from './ManageMembers';

import './styles.css';

const Sidebar = ({ onSelect }) => {
  const [selectedNavItem, setSelectedNavItem] = useState('dashboard');

  const handleItemClick = (itemName) => {
    setSelectedNavItem(itemName);
    onSelect(itemName); // Notify parent component about the selected item
  };

  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={`nav-link ${selectedNavItem === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleItemClick('dashboard')}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/manage_books"
              className={`nav-link ${selectedNavItem === 'manage_books' ? 'active' : ''}`}
              onClick={() => handleItemClick('manage_books')}
            >
              Book Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/manage_authors"
              className={`nav-link ${selectedNavItem === 'manage_authors' ? 'active' : ''}`}
              onClick={() => handleItemClick('manage_authors')}
            >
              Manage Authors
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/manage_genres"
              className={`nav-link ${selectedNavItem === 'manage_genres' ? 'active' : ''}`}
              onClick={() => handleItemClick('manage_genres')}
            >
              Manage Genres
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/manage_members"
              className={`nav-link ${selectedNavItem === 'manage_members' ? 'active' : ''}`}
              onClick={() => handleItemClick('manage_members')}
            >
              Manage Members
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
