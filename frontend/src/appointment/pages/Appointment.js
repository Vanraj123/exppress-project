import React from 'react';
import Header from '../../shared/Header.js';
import Sidebar from '../../patient/pages/Sidebar.js';
import Footer from '../../shared/Footer.js';
import './Appointment.css';  // Importing the CSS for styling
import '../../shared/Footer.css'
import MainContent from './MainContent.js';

const Appointment = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
      {/* <Footer /> */}
    </div>
  );
}

export default Appointment;