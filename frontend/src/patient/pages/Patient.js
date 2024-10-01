import React from 'react';
import Header from './../../shared//Header';
import Sidebar from '../../user/pages/Sidebar';
import Main from './Main';
import './Patient.css';

function Patient() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <h2>Patient List</h2>
      <Main />
    </div>
  );
}

export default Patient;
