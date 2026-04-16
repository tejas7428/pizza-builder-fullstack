import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to Pizza Builder</h2>
      <p>Create your custom pizza with our easy-to-use builder!</p>
      <div className="cta-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default Home;