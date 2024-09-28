import React, { useState, useContext } from 'react';
import './Dashboard.css'; // Separate CSS file
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from 'react-router-dom';

const Header = ({ selectedDoctor, handleDoctorChange }) => {
    
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
            <div className="doctor-selection">
                <label htmlFor="doctor">Select Doctor: </label>
                <select id="doctor" name="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
                    <option value="dr_smith">Dr. Smith</option>
                    <option value="dr_jones">Dr. Jones</option>
                    <option value="dr_brown">Dr. Brown</option>
                    <option value="dr_wilson">Dr. Wilson</option>
                </select>
            </div>
            <div className="user-menu">
                <span>{auth.username}</span> | <a href="/" style={{ color: 'white' }} onClick={handleLogout}>Logout</a>
            </div>
        </div>
    );
};

export default Header;
