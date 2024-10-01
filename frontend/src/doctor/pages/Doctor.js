import React from 'react';
import Header from '../../shared/Header';
import Sidebar from '../../patient/pages/Sidebar';
import DoctorList from './DoctorList';
import Footer from '../../shared/Footer';
import "./Doctor.css";
const Doctor = () => {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <div className="main-docList">
        <h2>Doctor List</h2>
        <DoctorList />
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Doctor;
