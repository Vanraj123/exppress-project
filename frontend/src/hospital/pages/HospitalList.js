import React, { useState } from 'react';
import HospitalCard from './HospitalCard';
import SearchBar from './Searchbar';
import './Hospital.css';

const HospitalList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const hospitals = [
    {
      imgSrc: 'https://i.pinimg.com/originals/eb/2f/95/eb2f955cc1ba643c0d3a9e68543a9aa7.jpg',
      Hos_Name: 'City Hospital',
      E_Date: '2001-04-12',
      ManageBy: 'John Doe',
      hosaddress: {
        cityvillage: 'Los Angeles',
        pincode: 90001,
        state: 'California',
        country: 'USA',
        streerorsocity: 'Downtown Ave'
      }
    },
    {
      imgSrc: 'https://tse2.mm.bing.net/th?id=OIP.SEzW_ftSl2Y9vgkF7oKncQHaFj&pid=Api&P=0&h=180',
      Hos_Name: 'Green Valley Hospital',
      E_Date: '1995-07-21',
      ManageBy: 'Jane Smith',
      hosaddress: {
        cityvillage: 'New York',
        pincode: 10001,
        state: 'New York',
        country: 'USA',
        streerorsocity: 'Midtown Blvd'
      }
    },
    {
        imgSrc: 'https://tse2.mm.bing.net/th?id=OIP.SEzW_ftSl2Y9vgkF7oKncQHaFj&pid=Api&P=0&h=180',
        Hos_Name: 'Green Valley Hospital',
        E_Date: '1995-07-21',
        ManageBy: 'Jane Smith',
        hosaddress: {
          cityvillage: 'New York',
          pincode: 10001,
          state: 'New York',
          country: 'USA',
          streerorsocity: 'Midtown Blvd'
        }
      }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.Hos_Name.toLowerCase().includes(searchTerm) ||
    hospital.ManageBy.toLowerCase().includes(searchTerm) ||
    hospital.hosaddress.cityvillage.toLowerCase().includes(searchTerm) ||
    hospital.hosaddress.state.toLowerCase().includes(searchTerm) ||
    hospital.hosaddress.country.toLowerCase().includes(searchTerm) ||
    hospital.hosaddress.pincode.toString().includes(searchTerm)
  );

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div className="hospital-cards-container">
        {filteredHospitals.map((hospital, index) => (
          <HospitalCard
            key={index}
            imgSrc={hospital.imgSrc}
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
