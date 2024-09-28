import React, { useState, useContext } from 'react';
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate("/");
    };
  return (
    <div className="header">
      <div className="logo">
        <h1>DocAppoint</h1>
      </div>
      <div className="welcome-message">
        <span>Welcome, Dr. John Doe</span>
      </div>
      <div className="user-menu">
      <span>User Name</span> | <a href="/" style={{ color: 'white' }} onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

export default Header;
