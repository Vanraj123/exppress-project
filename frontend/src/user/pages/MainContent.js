import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.css'; // Separate CSS file
import StatCard from './StatCard.js';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context'; // Assuming AuthContext is properly set up
import AppointmentCalendar from './AppointmentCalendar.js';
const MainContent = () => {
    const auth = useContext(AuthContext); // Get the logged-in user's info
    const [stats, setStats] = useState({
        totalAppointments: 0,
        upcomingAppointments: 0,
        totalPatients: 0,
    });
    const [appointments, setAppointments] = useState([]); // Add state to store all appointments
    const [patients, setPatients] = useState({}); // State to store patient details
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
                    });

                    // Set appointments in state
                    setAppointments(allAppointments); // Save all appointments to state

                    // Fetch patient details for each appointment
                    const patientPromises = allAppointments.map(appointment => {
                        return axios.get(`http://localhost:5000/api/patients/pati/${appointment.patient}`); // Adjust if patientId is different
                    });

                    const patientResponses = await Promise.all(patientPromises);
                    const patientData = {};
                    patientResponses.forEach(response => {
                        const patient = response.data; // Adjust according to your API response
                        patientData[patient._id] = patient; // Use patient ID as the key
                    });

                    setPatients(patientData); // Store patients data in state

                    setStats({
                        totalAppointments: totalAppointments,
                        upcomingAppointments: upcomingAppointments.length, // Set the count of upcoming appointments
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
        <div className="main-doc_dash"> 
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
                        .map((appointment, index) => {
                            // const patient = patients[appointment.patient]; // Retrieve patient details
                            // console.log(patient);
                            return (
                                <li key={index}>
                                    {/* Format date and display patient name */}
                                    {new Date(appointment.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })} - {appointment.time} 
                                </li>
                            );
                    })}
                </ul>
            </div>

            <div className="card calendar">
                <h3>Calendar</h3>
                <p><AppointmentCalendar appointments={appointments} /></p>
            </div>
             {/* Add Calendar Component */}

            {/* <div className="card recent-activity">
                <h3>Recent Activity</h3>
                <ul>
                    <li>User X booked an appointment.</li>
                    <li>User Y cancelled an appointment.</li>
                    <li>User Z updated their profile.</li>
                </ul>
            </div> */}
        </div>
    );
};

export default MainContent;
