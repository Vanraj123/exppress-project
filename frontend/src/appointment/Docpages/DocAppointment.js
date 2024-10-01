
import React from 'react';
import './DocAppointment.css';

import Header from '../../shared/Header';
import Sidebar from '../../user/pages/Sidebar';
import MainContent from './MainContent';
import Footer from '../../shared/Footer';


const DocAppointment = () => {
  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <MainContent />
      {/* <Footer /> */}
    </div>
  );
};

export default DocAppointment;