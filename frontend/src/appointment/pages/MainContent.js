import React, { useState, useEffect, useContext } from 'react';
import AppointmentCard from './AppointmentCard';
import axios from 'axios'; 
import { AuthContext } from '../../shared/context/auth-context';

const MainContent = () => {
  const [appointments, setAppointments] = useState([]);  // Default to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const auth = useContext(AuthContext); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const doctorId = auth.roleid; 
        const response = await axios.get(`http://localhost:5000/api/appointments/pati/${doctorId}`);
        
        const fetchedAppointments = response.data.appointment || [];  // Adjust based on response structure

        // Now, for each appointment, fetch the patient and doctor details
        const appointmentsWithDetails = await Promise.all(
          fetchedAppointments.map(async (appointment) => {
            const patientResponse = await axios.get(`http://localhost:5000/api/patients/pati/${appointment.patient}`);
            const doctorResponse = await axios.get(`http://localhost:5000/api/doctors/doc/${appointment.doctor}`);
            
            const patientData = patientResponse.data;
            const doctorData = doctorResponse.data;

            return {
              ...appointment,
              patientName: patientData.patient.patientName,  // Assuming the API returns `patientName`
              doctorName: doctorData.doctor.docName         // Assuming the API returns `docName`
            };
          })
        );

        setAppointments(appointmentsWithDetails);  // Set the appointments with patient and doctor names included
        console.log(appointmentsWithDetails);
      } catch (err) {
        console.error("Error fetching appointments: ", err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [auth.roleid]);  // Add auth.roleid as a dependency

  const handleDeleteAppointment = (deletedId) => {
    // Remove the deleted appointment from the state
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== deletedId)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Corrected search logic using the appointments state
  const filteredAppointments = appointments.filter((appointment) =>
    (appointment.title && appointment.title.toLowerCase().includes(searchTerm)) ||
    (appointment.date && appointment.date.includes(searchTerm)) ||
    (appointment.time && appointment.time.includes(searchTerm)) ||
    (appointment.patientName && appointment.patientName.toLowerCase().includes(searchTerm)) ||
    (appointment.doctorName && appointment.doctorName.toLowerCase().includes(searchTerm))
  );

  return (
    <div>
      <h2>Dashboard</h2>
        <div className="search-bar">
        <input 
          type="text"
          id="searchInput"
          placeholder="Search appointments..."
          onChange={handleSearch}
        />
      </div>
      <div className="main-appo">
      {appointments.length > 0 ? (
       filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}          // React's key for rendering list items efficiently
            id={appointment._id}           // Custom id prop to be used in the component
            title={appointment.title || `Appointment with ${appointment.patientName}`}
            date={appointment.date}
            time={appointment.time}
            patient={appointment.patientName}  // Use fetched patientName
            doctor={appointment.doctorName}    // Use fetched doctorName
            onDelete={handleDeleteAppointment}  // Pass down the delete handler
          />
        ))
      ) : (
        <div>No appointments available</div>
      )}
      </div>
    </div>
  );
};

export default MainContent;
