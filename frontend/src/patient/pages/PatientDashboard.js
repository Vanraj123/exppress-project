import React, { useState, useEffect, useContext } from 'react';
import './PatientDashboard.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/Header';
import Sidebar from './Sidebar';

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

                // Fetch doctors for each upcoming appointment
                const upcomingWithDoctors = await Promise.all(upcoming.map(async (appointment) => {
                    if (!appointment.doctor) {
                        console.error(`Appointment ${appointment._id} does not have a valid doctor ID`);
                        return appointment;
                    }

                    try {
                        const doctorResponse = await axios.get(`http://localhost:5000/api/doctors/doc/${appointment.doctor}`);
                        const hospitalResponse = await axios.get(`http://localhost:5000/api/hospitals/${appointment.hospital}`);
                        // Attach doctor and hospital data to the appointment object
                        return {
                            ...appointment,
                            doctor: doctorResponse.data,
                            hospital: hospitalResponse.data
                        };
                    } catch (err) {
                        console.error(`Error fetching doctor data for appointment ${appointment._id}:`, err);
                        return appointment;
                    }
                }));

                // Filter past appointments for medical history
                const pastAppointments = allAppointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.date);
                    const currentDate = new Date();
                    return appointmentDate < currentDate;
                });

                setAppointments(allAppointments);
                setUpcomingAppointments(upcomingWithDoctors);
                setMedicalHistory(pastAppointments);  // Set past appointments in medical history

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
            <Header />
            <Sidebar />
            <div className="main-pat_Dash">
                <h2>Dashboard</h2>
                <div className="stats">
                    <div className="stat-card">
                        <h3>Upcoming Appointments</h3>
                        <p>{upcomingAppointments.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Medical History</h3>
                        <p>{medicalHistory.length} records</p>  {/* Display medical history count */}
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
                            const appointmentDate = new Date(appointment.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            });
                            return (
                                <li key={index}>
                                    {index + 1} | <br /><b>Date:</b>{appointmentDate}<br></br><b>Doctor:</b> {appointment.doctor.doctor && appointment.doctor.doctor.docName ? appointment.doctor.doctor.docName : "Unknown Doctor"}
                                    <br /><b>Time:</b> {appointment.time}
                                    <br /><b>Hospital:</b> {appointment.hospital && appointment.hospital.Hos_Name ? appointment.hospital.Hos_Name : "Unknown Hospital"}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
