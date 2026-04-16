import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Pizza Builder</h1>
        </Link>
        <nav>
          {user ? (
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          ) : (
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;