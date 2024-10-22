import React, { useState } from 'react';
import './Dashboard.css'; // Separate CSS file
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <React.Fragment>
        <div className="sidebar">
            {/* <a href="#">Dashboard</a>
            <a href="#">Appointments</a>
            <a href="#">Patients</a>
            <a href="#">Doctors</a>
            <a href="#">Settings</a> */}
            <NavLink to="/doc">Dashboard</NavLink>
            {/* <NavLink to="/doc/appointment">Appointments</NavLink> */}
            <NavLink to="/doc/patient">Patients</NavLink>
            {/* <NavLink to="/doc/doctor">Doctors</NavLink> */}
            <NavLink to="/doc/profile">Profile</NavLink>
            <NavLink to="/doc/History">Appointment History</NavLink>
            {/* <NavLink to="/">Settings</NavLink> */}
        </div>
        </React.Fragment>
    );
};

export default Sidebar;