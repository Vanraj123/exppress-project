import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import AppointmentCard from './AppointmentCard';
import Header from '../../shared/Header';
import Sidebar from '../../patient/pages/Sidebar';
import './Appointment.css';
const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);  // To store medical history data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        setLoading(true);
        const patientId = auth.roleid; // Assuming patient's ID is stored in auth context

        const response = await axios.get(`http://localhost:5000/api/appointments/pati/${patientId}`);
        const fetchedAppointments = response.data.appointment || [];

        // Filtering appointments that are considered part of the medical history (completed appointments)
        const completedAppointments = fetchedAppointments.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          const currentDate = new Date();
          return appointmentDate < currentDate;  // Only past appointments
        });

        // Now, for each appointment, fetch the doctor and patient details
        const historyWithDetails = await Promise.all(
          completedAppointments.map(async (appointment) => {
            const doctorResponse = await axios.get(`http://localhost:5000/api/doctors/doc/${appointment.doctor}`);
            const patientResponse = await axios.get(`http://localhost:5000/api/patients/pati/${appointment.patient}`);

            const patientData = patientResponse.data;
            const doctorData = doctorResponse.data;

            return {
              ...appointment,
              patientName: patientData.patient.patientName,  // Assuming `patientName` field in patient data
              doctorName: doctorData.doctor.docName         // Assuming `docName` field in doctor data
            };
          })
        );

        setMedicalHistory(historyWithDetails);  // Set the completed appointments with extra details
        console.log(historyWithDetails);
      } catch (err) {
        console.error('Error fetching medical history:', err);
        setError('Failed to load medical history.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, [auth.roleid]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredHistory = medicalHistory.filter(appointment =>
    (appointment.title && appointment.title.toLowerCase().includes(searchTerm)) ||
    (appointment.date && appointment.date.includes(searchTerm)) ||
    (appointment.time && appointment.time.includes(searchTerm)) ||
    (appointment.patientName && appointment.patientName.toLowerCase().includes(searchTerm)) ||
    (appointment.doctorName && appointment.doctorName.toLowerCase().includes(searchTerm))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    <Header/>
    <Sidebar/>
      <h2>Medical History</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search medical history..."
          onChange={handleSearch}
        />
      </div>
      <div className="main-history">
        {medicalHistory.length > 0 ? (
          filteredHistory.map(appointment => (
            <AppointmentCard
              key={appointment._id}
              id={appointment._id}
              title={appointment.title || `Appointment with ${appointment.patientName}`}
              date={appointment.date}
              time={appointment.time}
              patient={appointment.patientName}
              doctor={appointment.doctorName}
              roleof = "MedicalHistory"
            />
          ))
        ) : (
          <div>No medical history available</div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
