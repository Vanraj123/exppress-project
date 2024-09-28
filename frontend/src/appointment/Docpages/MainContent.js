import React, { useState, useEffect, useContext } from 'react';
import './DocAppointment.css';
import StatCard from './StateCard';
import Card from './Card';
import { AuthContext } from '../../shared/context/auth-context';

const MainContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Fetch appointment data from the backend
    const fetchAppointments = async () => {
      const docid = auth.roleid;
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${docid}`);
        const data = await response.json();
        console.log('Fetched appointments:', data);  // Log the fetched data to check the format
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Check if appointments is an array
  const isAppointmentsArray = Array.isArray(appointments);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main">
      <h2>Dashboard</h2>
      <div className="stats">
        <StatCard title="Upcoming Appointments" value={isAppointmentsArray ? appointments.length : 0} />
        <StatCard title="Patients" value="150" />
        <StatCard title="Medical Records" value="1200" />
      </div>

      <Card title="Upcoming Appointments">
        <ul>
          {isAppointmentsArray ? (
            appointments.map((appointment) => (
              <li key={appointment._id}>
                Patient ID: {appointment.patientId} - Status: {appointment.status}
              </li>
            ))
          ) : (
            <li>No appointments available</li>
          )}
        </ul>
      </Card>

      <Card title="Patient List">
        <ul>
          <li>Patient 1</li>
          <li>Patient 2</li>
          <li>Patient 3</li>
        </ul>
      </Card>

      <Card title="Access Medical History">
        <ul>
          <li>Record 1 - Patient 1</li>
          <li>Record 2 - Patient 2</li>
          <li>Record 3 - Patient 3</li>
        </ul>
      </Card>

      <Card title="Profile">
        <p>Name: Dr. John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Phone: 123-456-7890</p>
      </Card>
    </main>
  );
};

export default MainContent;
