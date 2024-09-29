import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import SearchBar from './Searchbar';
import './Doctor.css'
const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors'); // Adjust the URL accordingly
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
        } else {
          console.error('Unexpected data format:', data);
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Error fetching doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDoctors = doctors.filter(doctor =>
    (doctor.docName && doctor.docName.toLowerCase().includes(searchTerm)) ||
    (doctor.docSpeciality && doctor.docSpeciality.toLowerCase().includes(searchTerm)) ||
    (doctor.docEmail && doctor.docEmail.toLowerCase().includes(searchTerm)) ||
    (doctor.docContact && doctor.docContact.includes(searchTerm))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div className='doctor-cards-container'>
      {filteredDoctors.map((doctor) => (
        <DoctorCard
          key={doctor._id} // Assuming each doctor has a unique _id
          doctor={doctor} // Pass the whole doctor object
        />
      ))}
      </div>
    </div>
  );
};

export default DoctorList;
