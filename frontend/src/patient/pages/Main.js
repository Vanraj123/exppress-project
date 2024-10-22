import React, { useState, useEffect, useContext } from 'react';
import PatientCard from './PatientCard';
import { AuthContext } from '../../shared/context/auth-context';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchPatients = async () => {
      // If `roleid` is undefined, avoid making the request
      if (!auth.roleid) {
        setLoading(false);
        setError('No doctor ID available.');
        return;
      }

      try {
        const docid = auth.roleid;
        console.log("Fetching patients for doctor ID:", docid);
        
        const response = await fetch(`http://localhost:5000/api/doctors/${docid}/patients`); // Adjust the URL

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        // Check if `data.patients` exists and is an array
        if (data && Array.isArray(data.patients)) {
          setPatients(data.patients); // Set the `patients` array
        } else {
          console.error('Unexpected data format:', data);
          setError('Unexpected data format received from server.');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        // setError('No patients available Please try again later.');
        setLoading(false);
      }
    };

    fetchPatients();
  }, [auth.roleid]); // Ensure this effect runs when `auth.roleid` changes

  // Filter patients based on search term
  const filterPatients = () => {
    return patients.filter((patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientContact.includes(searchTerm)
    );
  };

  // Conditional rendering based on the loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-patientList">
      <div className="search-bar_patient">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="patient-cards-container">
      {filterPatients().map((patient) => (
          <PatientCard key={patient._id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default Main;
