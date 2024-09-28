import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import './Patient.css';

function Patient() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}

export default Patient;
