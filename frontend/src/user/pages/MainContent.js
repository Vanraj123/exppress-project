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
    const [appointments, setAppointments] = useState([]); // Add state to store all appointments
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const docId = auth.roleid; // Use doctor ID from the AuthContext
                const response = await axios.get(`http://localhost:5000/api/appointments/${docId}`);
                const allAppointments = response.data.appointment;

                if (response.data) {
                    const totalAppointments = allAppointments.length;

                    // Filter for upcoming appointments (based on date)
                    const upcomingAppointments = allAppointments.filter(appointment => {
                        const appointmentDate = new Date(appointment.date);
                        const currentDate = new Date();
                        return appointmentDate >= currentDate; // Check if appointment date is in the future
                    }).length;

                    // Set appointments in state
                    setAppointments(allAppointments); // Save all appointments to state

                    console.log("Upcoming Appointments:", upcomingAppointments);

                    setStats({
                        totalAppointments: totalAppointments,
                        upcomingAppointments: upcomingAppointments, // Set the count of upcoming appointments
                        totalPatients: response.data.totalPatients || 0 // Adjust according to your API response
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
    }, [auth.roleid]); // Fetch data whenever the logged-in doctor changes

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
                    {/* Use the state variable `appointments` to display upcoming appointments */}
                    {appointments.filter(appointment => new Date(appointment.date) >= new Date())
                        .map((appointment, index) => (
                            <li key={index}>
                                {appointment.date} - {appointment.time}
                            </li>
                    ))}
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
