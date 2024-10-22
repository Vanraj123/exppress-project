import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import './AppointmentHistory.css';
import Header from '../../shared/Header';
import Sidebar from '../../user/pages/Sidebar';

const DoctorAppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);

    const loggedInDoctorId = auth.roleid;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/appointments/doctor/${loggedInDoctorId}`);
                const fetchedAppointments = response.data.appointments;

                // Fetch patient names for each appointment
                const appointmentsWithPatientNames = await Promise.all(
                    fetchedAppointments.map(async (appointment) => {
                        const patientResponse = await axios.get(
                            `http://localhost:5000/api/patients/byappointment/${appointment._id}`
                        );
                        return {
                            ...appointment,
                            patientName: patientResponse.data.patient.patientName, // Use the patient name from the API response
                        };
                    })
                );

                setAppointments(appointmentsWithPatientNames);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [loggedInDoctorId]);

    if (loading) return <div>Loading appointment history...</div>;

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="appointment-history">
                <h2>Appointment History</h2>
                {appointments.length > 0 ? (
                    <table className="appointment-table">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.patient}</td>
                                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No appointment history found</div>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointmentHistory;
