import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';  
const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/api/doctors'); // Adjust the API endpoint
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
        <Header/>
        <Sidebar/>
        <div className="list-container">
            <h2 className="list-title">Doctor List</h2>
            <ul className="list">
                {doctors.map(doctor => (
                    <li key={doctor._id} className="list-item">
                        <h4>{doctor.docName}</h4>
                        <p>Specialty: {doctor.docSpeciality}</p>
                        <p>Email: {doctor.docEmail}</p>
                        <p>Contact: {doctor.docContact}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default DoctorList;
