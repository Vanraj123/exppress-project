import React from 'react';
import Profile_Doc from '../../user/pages/Profile_Doc';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <a href="#">Dashboard</a> */}
      <NavLink href="/patient/">Dashboard</NavLink>
      <a href="#">Upcoming Appointments</a>
      <a href="#">Patient List</a>
      <a href="#">Medical History</a>
      {/* <a href="#">Profile</a> */}
      <NavLink href="doc/profile">Profile</NavLink>
      <a href="#">Settings</a>
      <a href="#">Change Appointment</a>

    </div>
  );
};

export default Sidebar;
