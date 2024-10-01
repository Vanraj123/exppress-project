import React, { useState, useEffect, useContext } from 'react';
import './ReceptionistDashboard.css'; // Custom styles for this page
import Sidebar from './Sidebar';
import Header from '../../shared/Header';
import { AuthContext } from '../../shared/context/auth-context';

const ReceptionistDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [patientDetails, setPatientDetails] = useState({});
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
              
            setAppointments(pendingAppointments); // Store only pending appointments
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

  // Fetch doctor and patient names based on IDs
  useEffect(() => {
    const fetchDetails = async () => {
      if (appointments.length > 0) {
        try {
          // Use a Set to track unique doctor and patient IDs
          const doctorIds = new Set(appointments.map(appointment => appointment.doctor));
          const patientIds = new Set(appointments.map(appointment => appointment.patient));

          // Fetch doctor details
          for (const id of doctorIds) {
            const response = await fetch(`http://localhost:5000/api/doctors/doc/${id}`);
            if (response.ok) {
              const doctor = await response.json();
              console.log(response);
              if (doctor._id) {
                setDoctorDetails((prev) => ({ ...prev, [doctor._id]: doctor.docName }));
              }
            } else {
              console.error(`Error fetching doctor with ID ${id}: ${response.statusText}`);
            }
          }

          // Fetch patient details
          for (const id of patientIds) {
            const response = await fetch(`http://localhost:5000/api/patients/pati/${id}`);
            if (response.ok) {
              const patient = await response.json();
              if (patient._id) {
                setPatientDetails((prev) => ({ ...prev, [patient._id]: patient.patientName }));
              }
            } else {
              console.error(`Error fetching patient with ID ${id}: ${response.statusText}`);
            }
          }
        } catch (err) {
          console.error('Error fetching doctor or patient details:', err);
          setError('Failed to load doctor or patient details.');
        }
      }
    };

    fetchDetails();
  }, [appointments]);

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
                {doctorDetails[appointment.doctor]} - {appointment.time} - {patientDetails[appointment.patient]}
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
