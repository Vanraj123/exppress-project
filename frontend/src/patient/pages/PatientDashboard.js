import React, { useState, useEffect, useContext } from 'react';
import './PatientDashboard.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const patientId = auth.roleid;
    
                // Fetch all appointments
                const appointmentsResponse = await axios.get(`http://localhost:5000/api/appointments/pati/${patientId}`);
                const allAppointments = appointmentsResponse.data.appointment;
    
                console.log("Appointments Data:", allAppointments);  // Log appointments data to check structure
    
                // Filter upcoming appointments
                const upcoming = allAppointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.date);
                    const currentDate = new Date();
                    return appointmentDate >= currentDate;
                });
    
                // Fetch doctors for each appointment
                const upcomingWithDoctors = await Promise.all(upcoming.map(async (appointment) => {
                    if (!appointment.doctor) {
                        console.error(`Appointment ${appointment._id} does not have a valid doctor ID`);
                        return appointment;
                    }
                
                    try {
                        const doctorResponse = await axios.get(`http://localhost:5000/api/doctors/doc/${appointment.doctor}`);
                        console.log(`Doctor Details for Appointment ${appointment._id}:`, doctorResponse.data);
                        
                        // Attach doctor data to the appointment object
                        return {
                            ...appointment,
                            doctor: doctorResponse.data  // Assuming doctorResponse.data has docName field
                        };
                    } catch (err) {
                        console.error(`Error fetching doctor data for appointment ${appointment._id}:`, err);
                        return appointment;
                    }
                }));
                
    
                setAppointments(allAppointments); 
                setUpcomingAppointments(upcomingWithDoctors);
    
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError("Error fetching data from the server");
            } finally {
                setLoading(false);
            }
        };
    
        fetchDashboardData();
    }, [auth.roleid]);
    
    const handleLogout = () => {
        auth.logout();
        navigate("/");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="header">
                <div className="logo">
                    <h1>DocAppoint</h1>
                </div>
                <div className="welcome-message">
                    <span>Welcome, {auth.username}</span>
                </div>
                <div className="user-menu">
                    <span>{auth.username}</span> | <a href="/" style={{ color: 'white' }} onClick={handleLogout}>Logout</a>
                </div>
            </div>
            <div className="sidebar">
                <NavLink to="/patient/dashboard">Dashboard</NavLink>
                <NavLink to="/patient/appointment">Appointments</NavLink>
                <NavLink to="/patient/makeappo">Make Appointment</NavLink>
                <NavLink to="/patient/doctor">Doctor</NavLink>
                <a href="#">Hospital</a>
                <NavLink to="/patient/medical-history">Medical History</NavLink>
                <NavLink to="/patient/prescriptions">Prescriptions</NavLink>
                <NavLink to="/patient/profile">Profile</NavLink>
                <NavLink to="/patient/settings">Settings</NavLink>
            </div>
            <div className="main">
                <h2>Dashboard</h2>
                <div className="stats">
                    <div className="stat-card">
                        <h3>Upcoming Appointments</h3>
                        <p>{upcomingAppointments.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Medical History</h3>
                        <p>{medicalHistory.length} records</p>
                    </div>
                    <div className="stat-card">
                        <h3>Prescriptions</h3>
                        <p>{prescriptions.length}</p>
                    </div>
                </div>
                <div className="card upcoming-appointments">
                    <h3>Upcoming Appointments</h3>
                    <ul>
                    {upcomingAppointments.map((appointment, index) => {
    console.log(appointment.doctor);  // Log doctor data to check its structure
    return (
        <li key={index}>
            {appointment.date} - {appointment.doctor && appointment.doctor.docName ? appointment.doctor.docName : "Unknown Doctor"}
            - {appointment.time}
        </li>
    );
})}
                    </ul>
                </div>
                <div className="card profile">
                    <h3>Profile</h3>
                    <p>Name: {auth.username}</p>
                    <p>Email: user@example.com</p>
                    <p>Phone: 123-456-7890</p>
                </div>
            </div>
            <div className="footer">
                <p>© 2024 DocAppoint. All rights reserved.</p>
            </div>
        </div>
    );
};

export default PatientDashboard;
