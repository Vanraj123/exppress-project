import React from 'react';
import './Header.css'; // Apply custom styles from the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>DocAppoint</h1>
        </div>
        <div className="welcome-message">
          <span>Welcome, Dr. John Doe</span>
        </div>
        <div className="user-menu">
          <span>Dr. John Doe</span>
          <span className="separator">|</span>
          <a href="#" className="logout-link">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
