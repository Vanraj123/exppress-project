import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/receptionist/">Dashboard</NavLink>
      <NavLink to="/receptionist/appointments">Appointments</NavLink>
      {/* <NavLink to="/receptionist/manage">Manage</NavLink> */}
      <NavLink to="/receptionist/profile">Profile</NavLink>
      {/* <a href="#">Settings</a> */}
    </div>
  );
};

export default Sidebar;
