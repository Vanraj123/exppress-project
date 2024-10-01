import React, { useState, useEffect, useContext } from 'react';
import './ReceptionistAppointmentTable.css'; // Custom styles for this page
import { AuthContext } from '../../shared/context/auth-context';
import Header from '../../shared/Header';
import Sidebar from './Sidebar';

const ReceptionistAppointmentTable = () => {
  const [appointments, setAppointments] = useState([]); // Initialize as an empty array
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
            // Assuming the API returns an object containing an 'appointments' array
            const appointmentsArray = data.appointment || []; // Access the appointments array

            // Filter confirmed appointments from the appointmentsArray
            const confirmedAppointments = appointmentsArray.filter(appointment => appointment.status === 'Confirmed');
            console.log('Confirmed Appointments:', confirmedAppointments); // Debugging: Check the filtered results

            // Fetch additional doctor and patient info for each appointment
            const appointmentsWithDetails = await Promise.all(
              confirmedAppointments.map(async (appointment) => {
                const [doctorResponse, patientResponse] = await Promise.all([
                  fetch(`http://localhost:5000/api/doctors/doc/${appointment.doctor}`),
                  fetch(`http://localhost:5000/api/patients/pati/${appointment.patient}`)
                ]);

                const doctorData = await doctorResponse.json();
                const patientData = await patientResponse.json();

                return {
                  ...appointment,
                  doctorName: doctorResponse.ok ? doctorData.doctor.docName : 'Unknown Doctor',
                  patientName: patientResponse.ok ? patientData.patient.patientName : 'Unknown Patient'
                };
              })
            );

            setAppointments(appointmentsWithDetails);
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
  // Handle appointment scheduling
const handleSchedule = async (appointmentId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/appointments/scheduled/${appointmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Scheduled' }), // Update status to 'Scheduled'
    });

    const data = await response.json();

    if (response.ok) {
      // Update the appointments state to reflect the change
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status: 'Scheduled' } : appointment
        )
      );
      console.log('Appointment scheduled successfully:', data);
    } else {
      throw new Error(data.message || 'Failed to schedule appointment.');
    }
  } catch (err) {
    setError(err.message);
  }
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

        <div className="card confirmed-appointments">
          <ul>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <li key={index}>
                  <strong>Doctor:</strong> {appointment.doctorName} - 
                  <strong> Date:</strong> {new Date(appointment.date).toLocaleDateString()} - 
                  <strong> Time:</strong> {appointment.time} - 
                  <strong> Patient:</strong> {appointment.patientName} - 
                  <strong> Status:</strong> {appointment.status || 'Not Specified'}
                  <button className='schedule_app' type='button' onClick={() => handleSchedule(appointment._id)}>
                    Schedule
                  </button>
                </li>
              ))
            ) : (
              <p>No confirmed appointments found.</p>
            )}
          </ul>
        </div>

        {/* Date Filter */}
        <div className="date-filter">
          <label htmlFor="appointment-date">Filter by Date:</label>
          <input
            type="date"
            id="appointment-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Show filtered appointments if a date is selected */}
        {selectedDate && (
          <div className="card filtered-appointments">
            <h3>Appointments on {selectedDate}</h3>
            <ul>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => (
                  <li key={index}>
                    <strong>Doctor:</strong> {appointment.doctorName} - 
                    <strong> Date:</strong> {new Date(appointment.date).toLocaleDateString()} - 
                    <strong> Time:</strong> {appointment.time} - 
                    <strong> Patient:</strong> {appointment.patientName} - 
                    <strong> Status:</strong> {appointment.status || 'Not Specified'}
                    <button className='schedule_app' type='button' onClick={() => handleSchedule(appointment._id)}>
                      Schedule
                    </button>
                  </li>
                ))
              ) : (
                <p>No appointments found for this date.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistAppointmentTable;
