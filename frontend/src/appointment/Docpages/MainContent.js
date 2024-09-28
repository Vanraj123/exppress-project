import React, { useState, useEffect, useContext } from 'react';
import './DocAppointment.css';
import StatCard from './StateCard';
import Card from './Card';
import { AuthContext } from '../../shared/context/auth-context'; // Assuming you have set up AuthContext correctly

const MainContent = () => {
  const [appointments, setAppointments] = useState([]); // State to store appointment data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const auth = useContext(AuthContext); // Get authentication context

  // Fetch appointments when the component is mounted
  useEffect(() => {
    const fetchAppointments = async () => {
      const docid = auth.roleid; // Assuming you get doctor ID from auth context

      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${docid}`);
        
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response into JSON
        console.log('Fetched appointments:', data); // Log fetched data for debugging
        console.log('hii',data.appointment.length);
        setAppointments(data.appointment); // Assuming the API returns appointments in a field called "appointments"
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching appointments:', error); // Log error
        setError('Failed to fetch appointments'); // Set an error message
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchAppointments(); // Trigger data fetch on component mount
  }, [auth.roleid]); // Dependency on auth.roleid to refetch if the doctor ID changes

  // Check if appointments is an array (for safety)
  const isAppointmentsArray = Array.isArray(appointments);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an issue
  }

  return (
    <main className="main">
      <h2>Doctor Dashboard</h2>
      
      {/* Statistics section */}
      <div className="stats">
        <StatCard title="Upcoming Appointments" value={appointments.length} />
        <StatCard title="Patients" value="150" />
        <StatCard title="Medical Records" value="1200" />
      </div>

      {/* Upcoming Appointments Card */}
      <Card title="Upcoming Appointments">
        <ul>
          {isAppointmentsArray ? (
            appointments.length > 0 ? (
              appointments.map((appointment) => (
                <li key={appointment._id}>
                  Patient ID: {appointment.patientId} - Status: {appointment.status}
                </li>
              ))
            ) : (
              <li>No upcoming appointments</li>
            )
          ) : (
            <li>No appointments available</li>
          )}
        </ul>
      </Card>

      {/* Static content (can be replaced with dynamic content if needed) */}
      {/* <Card title="Patient List">
        <ul>
          <li>Patient 1</li>
          <li>Patient 2</li>
          <li>Patient 3</li>
        </ul>
      </Card> */}

      {/* <Card title="Access Medical History">
        <ul>
          <li>Record 1 - Patient 1</li>
          <li>Record 2 - Patient 2</li>
          <li>Record 3 - Patient 3</li>
        </ul>
      </Card> */}

      {/* Doctor's profile information */}
      <Card title="Profile">
        <p>Name: Dr. John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Phone: 123-456-7890</p>
      </Card>
    </main>
  );
};

export default MainContent;
