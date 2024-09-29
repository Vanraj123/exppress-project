import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';  

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('/api/patients'); // Adjust the API endpoint
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
        <Header/>
        <Sidebar/>
        <div className="list-container">
            <h2 className="list-title">Patient List</h2>
            <ul className="list">
                {patients.map(patient => (
                    <li key={patient._id} className="list-item">
                        <h4>{patient.patientName}</h4>
                        <p>Email: {patient.patientEmail}</p>
                        <p>Contact: {patient.patientContact}</p>
                        <p>Gender: {patient.patientGender}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default PatientList;
