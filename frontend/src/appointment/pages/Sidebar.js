import React from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
        <React.Fragment>
      {/* <a href="#">Dashboard</a>
      <a href="#">Upcoming Appointments</a>
      <a href="#">Patient List</a>
      <a href="#">Medical History</a>
      <a href="#">Profile</a>
      <a href="#">Settings</a>
      <a href="#">Change Appointment</a>
      <a href="#">Doctor List</a> */}
            <NavLink to="/patient/">Dashboard</NavLink>
            <NavLink to="/appointment">Appointments</NavLink>
            <NavLink to="/auth/">Patients</NavLink>
            <NavLink to="/patient/doctor">Doctors</NavLink>
            {/* <NavLink to="/">Settings</NavLink> */}
            </React.Fragment>
    </div>
  );
}

export default Sidebar;
