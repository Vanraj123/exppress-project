// Header.js
import React, { useContext, useState } from 'react';
import './Header.css'; // Apply custom styles from the CSS file
import { AuthContext } from '../shared/context/auth-context'; // Adjust the path to where your AuthContext is defined
import { NavLink } from 'react-router-dom';
import ReviewForm from './ReviewPage'; // Import the ReviewForm component
import { FaPen } from 'react-icons/fa'; // Import an icon for the review button

const Header = () => {
  const { isLoggedIn, username, logout } = useContext(AuthContext); // Destructure values from context
  const [isReviewFormVisible, setReviewFormVisible] = useState(false); // State to control visibility of the review form

  const toggleReviewForm = () => {
    setReviewFormVisible((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>DocAppoint</h1>
        </div>
        <div className="welcome-message">
          {isLoggedIn ? (
            <span>Welcome, {username}</span>
          ) : (
            <span>Welcome, Guest</span>
          )}
        </div>
        {isLoggedIn && (
          <div className="user-menu">
            <span>{username}</span>
            <span className="separator">|</span>
            <NavLink to="/" onClick={logout} className="logout-link">Logout</NavLink>
          </div>
        )}
      </div>
      {/* <NavLink to="/reviews" className="nav-link">
                <FaPen /> Reviews
              </NavLink>     */}
    </header>
  );
};

export default Header;
