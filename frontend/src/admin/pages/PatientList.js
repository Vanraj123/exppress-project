import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';  
import SearchBar from './Searchbar';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/patients/');
                console.log("API response:", response.data); // Log the response for debugging
                setPatients(response.data.patients); // Extract the patients array from response
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    if (loading) return <div>Loading...</div>;

    // Function to filter patients based on the search term
    const filterPatients = () => {
        return patients.filter((patient) =>
            patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.patientContact.includes(searchTerm)
        );
    };

    const filteredPatients = filterPatients();

    return (
        <div>
            <Header />
            <Sidebar />
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="list-container">
                <h2 className="list-title">Patient List</h2>
                <div className="card-list">
                    {filteredPatients.length > 0 ? (
                        filteredPatients.map(patient => (
                            <div key={patient._id} className="card">
                                <img src={patient.image || 'https://cdn2.iconfinder.com/data/icons/medical-flat-icons-part-2/513/95-1024.png'} alt={patient.patientName} />
                                <h4 className="card-title">{patient.patientName}</h4>
                                <p>Email: {patient.patientEmail}</p>
                                <p>Contact: {patient.patientContact}</p>
                                <p>Gender: {patient.patientGender}</p>
                                <p>Address: {`${patient.streetOrSociety}, ${patient.cityOrVillage}, ${patient.state}, ${patient.country}`}</p>
                                <p>DOB: {new Date(patient.DOB).toLocaleDateString()}</p> {/* Formatting DOB */}
                            </div>
                        ))
                    ) : (
                        <p>No patients found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientList;
