
import React from 'react';
import './DocAppointment.css';

import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from '../../shared/Footer';


const DocAppointment = () => {
  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default DocAppointment;