import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
           
                {/* <a href="#">Dashboard</a> */}
                <NavLink to="/patient/">Dashboard</NavLink>
                {/* <a href="#">Upcoming Appointments</a> */}
                <NavLink to="/patient/appointment">Appointments</NavLink>
                <NavLink to="/patient/makeappo">Make Appointment</NavLink>
                <NavLink to="/patient/doctor">Doctor</NavLink>
                {/* <a href="#">Hospital</a> */}
                <NavLink to="/patient/hospital">Hospital</NavLink>
                <a href="#">Medical History</a>
                <a href="#">Prescriptions</a>
                {/* <a href="#">Profile</a> */}
                <NavLink to="/patient/profile">Profile</NavLink>
                <a href="#">Settings</a>
            </div>
  );
};

export default Sidebar;
