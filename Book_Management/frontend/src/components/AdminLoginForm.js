import React, { useState } from 'react';
import axios from 'axios';
import Navbar_inner from './Navbar_inner';
import Footer from './Footer';

import './styles.css';

import loginimg from '../components/images/loginimg.avif';

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/AdminLogin', { username, password });
      console.log(response.data); // For testing purposes, can be replaced with redirection logic
      // Assuming successful login should redirect to dashboard
      // Replace the following line with your redirection logic
      window.location.href = '/dashboard'; // Redirect to dashboard page
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <Navbar_inner />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={loginimg} alt="loginimg" className="w-100 mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-center align-items-center h-100">
              <div>
                <h2 className="mb-5">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label d-block">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label d-block">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  <br></br>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginForm;
