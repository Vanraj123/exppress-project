import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';      
const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('/api/hospitals'); // Adjust the API endpoint
                setHospitals(response.data);
            } catch (error) {
                console.error("Error fetching hospitals:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
        <Header/>
        <Sidebar/>
        <div className="list-container">
            <h2 className="list-title">Hospital List</h2>
            <ul className="list">
                {hospitals.map(hospital => (
                    <li key={hospital._id} className="list-item">
                        <h4>{hospital.Hos_Name}</h4>
                        <p>Managed By: {hospital.ManageBy}</p>
                        <p>Address: {hospital.hosaddress.cityvillage}, {hospital.hosaddress.state}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default HospitalList;
