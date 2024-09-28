import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.css'; // Separate CSS file
import StatCard from './StatCard.js';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context'; // Assuming AuthContext is properly set up

const MainContent = () => {
    const auth = useContext(AuthContext); // Get the logged-in user's info
    const [stats, setStats] = useState({
        totalAppointments: 0,
        upcomingAppointments: 0,
        totalPatients: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const docId = auth.roleid;
                // Assuming the backend API accepts doctor's username as a query parameter
                const response = await axios.get(`http://localhost:5000/api/appointments/${docId}`);
                // const appointment = await response.json();
                if (response.data) {
                    // Assuming response.data is an array of appointments
                    const totalAppointments = response.data.appointment.length; // Length of the array
                    // const upcomingAppointments = response.data.filter(appointment => {
                    //     // Add your logic here to determine if the appointment is upcoming
                    //     return new Date(appointment.date) > new Date(); // Example logic
                    // }).length; // Length of upcoming appointments
                console.log(totalAppointments);
                    setStats({
                        totalAppointments: totalAppointments,
                        upcomingAppointments: 0,
                        totalPatients: response.data.totalPatients // Adjust according to your API response
                    });
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
                setError('Error fetching stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [auth.username]); // Fetch data whenever the logged-in doctor changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="main">
            <h2>Dashboard</h2>
            <div className="stats">
                <StatCard title="Total Appointments" value={stats.totalAppointments} />
                <StatCard title="Upcoming Appointments" value={stats.upcomingAppointments} />
                <StatCard title="Total Patients" value={stats.totalPatients} />
            </div>

            <div className="card appointments">
                <h3>Upcoming Appointments</h3>
                <ul>
                    <li>Appointment 1 - 10:00 AM</li>
                    <li>Appointment 2 - 11:00 AM</li>
                    <li>Appointment 3 - 12:00 PM</li>
                </ul>
            </div>

            <div className="card calendar">
                <h3>Calendar</h3>
                <p>Calendar widget goes here</p>
            </div>

            <div className="card recent-activity">
                <h3>Recent Activity</h3>
                <ul>
                    <li>User X booked an appointment.</li>
                    <li>User Y cancelled an appointment.</li>
                    <li>User Z updated their profile.</li>
                </ul>
            </div>
        </div>
    );
};

export default MainContent;
