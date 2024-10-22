import React, { useState, useEffect } from 'react';
import HospitalCard from './HospitalCard';
import SearchBar from './Searchbar';
import './Hospital.css';

const HospitalList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hospitals from the backend
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hospitals'); // Adjust your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals.');
        }
        const data = await response.json();
        setHospitals(data.hospitals);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredHospitals = hospitals.filter(hospital =>
    (hospital.Hos_Name && hospital.Hos_Name.toLowerCase().includes(searchTerm)) ||
    (hospital.ManagedBy && hospital.ManagedBy.toLowerCase().includes(searchTerm)) ||
    (hospital.hosaddress?.cityvillage && hospital.hosaddress.cityvillage.toLowerCase().includes(searchTerm)) ||
    (hospital.hosaddress?.state && hospital.hosaddress.state.toLowerCase().includes(searchTerm)) ||
    (hospital.hosaddress?.country && hospital.hosaddress.country.toLowerCase().includes(searchTerm)) ||
    (hospital.hosaddress?.pincode && hospital.hosaddress.pincode.toString().includes(searchTerm))
  );

  if (loading) {
    return <p>Loading hospitals...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div className="hospital-cards-container">
        {filteredHospitals.map((hospital, index) => (
          <HospitalCard
            key={index}
            imgSrc={hospital.image || 'http://upload.wikimedia.org/wikipedia/commons/8/8a/Nationwide_Childrens_Hospital,_Exterior_from_Fragrance_Maze,_May_2013.jpg'}
            Hos_Name={hospital.Hos_Name}
            E_Date={hospital.E_Date}
            ManageBy={hospital.ManageBy}
            hosaddress={hospital.hosaddress}
          />
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
