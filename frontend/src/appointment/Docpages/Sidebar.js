import React from 'react';
import './DocAppointment.css';

const Sidebar = () => {
    return (
      <aside className="sidebar">
        <a href="#">Dashboard</a>
        <a href="#">Upcoming Appointments</a>
        {/* <a href="#">Patient List</a> */}
        {/* <a href="#">Medical History</a> */}
        <a href="#">Profile</a>
        {/* <a href="#">Settings</a> */}
      </aside>
    );
  };
  
  export default Sidebar;