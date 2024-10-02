import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Ensure to create this CSS file
import Header from '../../shared/Header';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [metrics, setMetrics] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch metrics from the backend
        const fetchMetrics = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admins/metrics');
                const data = await response.json();
                setMetrics(data);
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };

        // Fetch notifications from the backend
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notifications');
                const data = await response.json();
                console.log("Notifications data:", data); // Inspect the data structure
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchMetrics();
        fetchNotifications();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Check if notifications is an array before filtering
    const filteredNotifications = Array.isArray(notifications)
        ? notifications.filter(notification =>
            notification.message.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : []; // Default to empty array if notifications is not an array

    return (
        <div className="admin-page">
            <Header />
            <Sidebar />
            <div className="admin-content">
                <h2>Admin Dashboard</h2>
                <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                
                <div className="metrics-container">
                    <h3>Overview</h3>
                    {metrics ? (
                        <div className="metrics-card">
                            <p><strong>Total Doctors:</strong> {metrics.totalDoctors}</p>
                            <p><strong>Total Patients:</strong> {metrics.totalPatients}</p>
                            <p><strong>Total Hospitals:</strong> {metrics.totalHospitals}</p>
                            <p><strong>Total Receptionists:</strong> {metrics.totalReceptionists}</p>
                        </div>
                    ) : (
                        <p>Loading metrics...</p>
                    )}
                </div>

                <div className="notifications-container">
    <h3>Notifications</h3>
    <ul>
        {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
                <li key={notification._id}>
                    <strong>{notification.message}</strong> {/* Display notification message */}
                    <span style={{ fontSize: '0.8em', color: '#777' }}>
                        {/* Optionally format and display the createdAt date */}
                        {new Date(notification.createdAt).toLocaleString()}
                    </span>
                </li>
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
