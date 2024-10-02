import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/admin/">Dashboard</NavLink>
      <NavLink to="/admin/doctors">Doctors</NavLink>
      <NavLink to="/admin/hospitals">Hospitals</NavLink>
      <NavLink to="/admin/receptionists">Receptionists</NavLink>
      <NavLink to="/admin/patients">patients</NavLink>
      {/* <a href="#">Settings</a> */}
    </div>
  );
};

export default Sidebar;
