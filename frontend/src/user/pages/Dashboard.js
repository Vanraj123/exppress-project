import React, { useState } from 'react';
import './Dashboard.css'; // Separate CSS file
import Footer from '../../shared/Footer';
import MainContent from './MainContent.js';
import Header from '../../shared/Header.js';
import Sidebar from './Sidebar.js';


const Dashboard = () => {
    const [selectedDoctor, setSelectedDoctor] = useState('dr_smith');

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    return (
        <div className="dashboard">
            <Header selectedDoctor={selectedDoctor} handleDoctorChange={handleDoctorChange} />
            <Sidebar />
            <MainContent />
            {/* <Footer /> */}
        </div>
    );
};

export default Dashboard;