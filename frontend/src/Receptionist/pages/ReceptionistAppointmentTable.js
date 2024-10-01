import React, { useState, useEffect, useContext } from 'react';
import './ReceptionistAppointmentTable.css'; // Custom styles for this page
import { AuthContext } from '../../shared/context/auth-context';
import Header from '../../shared/Header';
import Sidebar from './Sidebar';

const ReceptionistAppointmentTable = () => {
  const [appointments, setAppointments] = useState([]); // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [hospitalId, setHospitalId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(''); // State for the selected date
  const auth = useContext(AuthContext); // Assuming the AuthContext provides roleid or receptionist ID

  // Fetch hospital ID based on receptionist's roleid
  useEffect(() => {
    const fetchHospitalId = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/receptionists/hos/${auth.roleid}`);
        const data = await response.json();

        if (response.ok) {
          setHospitalId(data.receptionist.hospital); // Assuming API returns hospitalId
        } else {
          throw new Error(data.message || 'Failed to fetch hospital ID.');
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchHospitalId();
  }, [auth.roleid]);

  // Fetch appointments for the hospital once hospitalId is available
  useEffect(() => {
    if (hospitalId) {
      const fetchAppointments = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/appointments/hos/${hospitalId}`);
          const data = await response.json();

          if (response.ok) {
            // Ensure appointments is an array and filter only confirmed ones
            const confirmedAppointments = Array.isArray(data)
              ? data.filter(appointment => appointment.status === 'confirmed')
              : [];
            setAppointments(confirmedAppointments);
          } else {
            throw new Error(data.message || 'Failed to load appointments.');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [hospitalId]);

  // Handle appointment scheduling
  const handleSchedule = (appointmentId) => {
    // Add logic to handle scheduling an appointment
    console.log('Scheduling appointment with ID:', appointmentId);
  };

  // Filter appointments based on selected date
  const filteredAppointments = selectedDate
    ? appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0]; // Assuming appointment.date is in ISO format
        return appointmentDate === selectedDate;
      })
    : appointments;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='main-recep_table'>
      <Header />
      <Sidebar />
      <div className="appointment-table">
        <h2>Confirmed Appointments</h2>

        {/* Date Filter */}
        <div className="date-filter">
          <label htmlFor="appointment-date">Select Date:</label>
          <input
            type="date"
            id="appointment-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="card confirmed-appointments">
          <ul>
            {Array.isArray(filteredAppointments) && filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <li key={index}>
                  {appointment.doctorName} - {appointment.time} - {appointment.patientName}
                  <button className='schedule_app' type='button' onClick={() => handleSchedule(appointment._id)}>
                    Schedule
                  </button>
                </li>
              ))
            ) : (
              <p>No confirmed appointments found for this date.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistAppointmentTable;
