import React from 'react';
import Header from '../../shared/Header';
import Sidebar from './Sidebar';
import Sidebar_pat from '../../patient/pages/Sidebar';
import HospitalList from './HospitalList';
import Footer from '../../shared/Footer';
import './Hospital.css';

const Hospital = () => {
  return (
    <div className="app-container">
      <Header/>
      <Sidebar_pat />
      <div className="main-hospitalList">
        <h2>Hospital List</h2>
        <HospitalList />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Hospital;
