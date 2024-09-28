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
      try {
        const docid = auth.roleid;
        const response = await fetch(`http://localhost:5000/api/patients/doc/${docid}`); // Adjust the URL
        const data = await response.json();

        // Log the fetched data
        console.log('Fetched data:', data);

        // Ensure the data contains the expected structure
        if (data && data.patients && Array.isArray(data.patients)) {
          setPatients(data.patients);
        } else {
          console.error('Unexpected data format:', data);
          setError('Unexpected data format');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Error fetching patients');
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filterPatients = () => {
    return patients.filter((patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientContact.includes(searchTerm)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main">
      <h2>Patient List</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div id="patientList">
        {filterPatients().map((patient) => (
          <PatientCard key={patient._id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default Main;
