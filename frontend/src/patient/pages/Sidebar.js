import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      
                <NavLink to="/patient/">Dashboard</NavLink>
                <NavLink to="/patient/appointment">Appointments</NavLink>
                <NavLink to="/patient/makeappo">Make Appointment</NavLink>
                <NavLink to="/patient/doctor">Doctor</NavLink>
                <NavLink to="/patient/hospital/">Hospital</NavLink>
                <NavLink to="/patient/medicalhistory/">Medical History</NavLink>
                <NavLink to="/patient/profile">Profile</NavLink>
            </div>
  );
};

export default Sidebar;
