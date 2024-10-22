import React, { useState, useEffect, useContext } from 'react';
import './ReceptionistDashboard.css'; // Custom styles for this page
import Sidebar from './Sidebar';
import Header from '../../shared/Header';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios'; // Add axios for API calls

const ReceptionistDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hospitalId, setHospitalId] = useState(null);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext); // Assuming the AuthContext provides roleid or receptionist ID

  // Fetch hospital ID based on receptionist's roleid
  useEffect(() => {
    const fetchHospitalId = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/receptionists/hos/${auth.roleid}`);
        const data = await response.json();

        if (response.ok && data.receptionist && data.receptionist.hospital) {
          setHospitalId(data.receptionist.hospital); // Assuming API returns hospitalId
        } else {
          throw new Error(data.message || 'Failed to fetch hospital ID.');
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (auth.roleid) {
      fetchHospitalId();
    }
  }, [auth.roleid]);

  // Fetch appointments for the hospital once hospitalId is available
  useEffect(() => {
    const fetchAppointments = async () => {
      if (hospitalId) {
        try {
          const response = await fetch(`http://localhost:5000/api/appointments/hos/${hospitalId}`);
          const data = await response.json();

          if (response.ok) {
            const pendingAppointments = Array.isArray(data.appointment)
              ? data.appointment.filter((appointment) => appointment.status === 'Pending')
              : [];
              
            // Fetch doctor and patient details for each appointment
            const detailedAppointments = await Promise.all(
              pendingAppointments.map(async (appointment) => {
                let doctorResponse, patientResponse;

                // Fetch doctor details if the appointment has a doctor ID
                if (appointment.doctor) {
                  try {
                    doctorResponse = await axios.get(`http://localhost:5000/api/doctors/doc/${appointment.doctor}`);
                    console.log(`Doctor Details for Appointment ${appointment._id}:`, doctorResponse.data);
                  } catch (err) {
                    console.error(`Error fetching doctor data for appointment ${appointment._id}:`, err);
                  }
                }

                // Fetch patient details if the appointment has a patient ID
                if (appointment.patient) {
                  try {
                    patientResponse = await axios.get(`http://localhost:5000/api/patients/pati/${appointment.patient}`);
                    console.log(`Patient Details for Appointment ${appointment._id}:`, patientResponse.data);
                  } catch (err) {
                    console.error(`Error fetching patient data for appointment ${appointment._id}:`, err);
                  }
                }

                // Attach doctor and patient data to the appointment object, including patient contact
                return {
                  ...appointment,
                  doctor: doctorResponse ? doctorResponse.data.doctor.docName : 'Unknown Doctor',
                  patient: patientResponse ? patientResponse.data.patient.patientName : 'Unknown Patient',
                  patientContact: patientResponse ? patientResponse.data.patient.patientContact : 'Unknown Contact', // Adding contact here
                };
              })
            );
            console.log(detailedAppointments);
            setAppointments(detailedAppointments); // Store appointments with doctor and patient details
          } else {
            throw new Error(data.message || 'Failed to load appointments.');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [hospitalId]);

  // Handle appointment confirmation
  const handleConfirm = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/appo/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Remove the confirmed appointment from the list
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
        console.log('Appointment confirmed:', data);
      } else {
        throw new Error(data.message || 'Failed to confirm appointment.');
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      setError('Failed to confirm the appointment. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-recep">
        <h2>Dashboard</h2>
        <div className="stats">
          <div className="stat-card">
            <h3>Pending Appointments</h3>
            <p>{appointments.length}</p>
          </div>
        </div>
        <h3>Pending Appointments</h3>
        <div className="card pending-appointments">
          <ul>
            {appointments.map((appointment) => (
             <li key={appointment._id}>
             <b>Doctor: </b> {appointment.doctor}
             <span style={{ margin: '0 10px' }}></span>
             <b>Patient: </b> {appointment.patient}
             <span style={{ margin: '0 10px' }}></span>
             <b>Contact: </b> {appointment.patientContact}
             <span style={{ margin: '0 10px' }}></span>
             <b>Time: </b> {appointment.time}
             <button
               className='confirm_app'
               type='button'
               onClick={() => handleConfirm(appointment._id)}
             >
               Confirm
             </button>
           </li>
           
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
