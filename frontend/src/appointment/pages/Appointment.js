import React from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import MainContent from './MainContent.js';
import Footer from '../../shared/Footer.js';
import './Appointment.css';  // Importing the CSS for styling

const Appointment = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Appointment;