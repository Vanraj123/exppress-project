import React, { useState } from 'react';
import './AdminDashboard.css'; // Ensure to create this CSS file
import Header from '../../shared/Header';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data for demonstration
    const metrics = {
        totalDoctors: 15,
        totalPatients: 120,
        totalHospitals: 5,
        totalReceptionists: 8,
    };

    const notifications = [
        "New patient registration pending approval.",
        "Doctor Dr. Smith has updated their availability.",
        "Hospital City Hospital has added new services.",
        "Reminder: Monthly staff meeting on Friday.",
    ];

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter notifications based on search query
    const filteredNotifications = notifications.filter(notification =>
        notification.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-page">
            <Header />
            <Sidebar />
            <div className="admin-content">
                <h2>Admin Dashboard</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                
                <div className="metrics-container">
                    <h3>Overview</h3>
                    <div className="metrics-card">
                        <p><strong>Total Doctors:</strong> {metrics.totalDoctors}</p>
                        <p><strong>Total Patients:</strong> {metrics.totalPatients}</p>
                        <p><strong>Total Hospitals:</strong> {metrics.totalHospitals}</p>
                        <p><strong>Total Receptionists:</strong> {metrics.totalReceptionists}</p>
                    </div>
                </div>

                <div className="notifications-container">
                    <h3>Notifications</h3>
                    <ul>
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification, index) => (
                                <li key={index}>{notification}</li>
                            ))
                        ) : (
                            <li>No notifications found.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
