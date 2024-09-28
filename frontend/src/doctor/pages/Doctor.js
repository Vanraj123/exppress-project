import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DoctorList from './DoctorList';
import "./Doctor.css";
const Doctor = () => {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <div className="main">
        <h2>Doctor List</h2>
        <DoctorList />
      </div>
    </div>
  );
};

export default Doctor;
