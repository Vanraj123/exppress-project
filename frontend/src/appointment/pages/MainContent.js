import React, { useState, useEffect, useContext } from 'react';
import AppointmentCard from './AppointmentCard';
import axios from 'axios'; 
import { AuthContext } from '../../shared/context/auth-context';

const MainContent = () => {
  const [appointments, setAppointments] = useState([]);  // Default to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const auth = useContext(AuthContext); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const patientId = auth.roleid; 
        const response = await axios.get(`http://localhost:5000/api/appointments/pati/${patientId}`);
        
        console.log(response.data);  // Log the response to check its structure

        const fetchedAppointments = response.data.appointment || [];  // Adjust based on response structure
        setAppointments(fetchedAppointments);  // Make sure appointments is always an array
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

  return (
    <div className="main">
      <h2>Dashboard</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}          // React's key for rendering list items efficiently
            id={appointment._id}           // Custom id prop to be used in the component
            title={appointment.title || `Appointment with ${appointment.patientName}`}
            date={appointment.date}
            time={appointment.time}
            patient={appointment.patientName}
            doctor={appointment.doctorName}
            onDelete={handleDeleteAppointment}  // Pass down the delete handler
          />
        ))
      ) : (
        <div>No appointments available</div>
      )}
    </div>
  );
};

export default MainContent;
