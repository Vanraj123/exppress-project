import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';  
const ReceptionistList = () => {
    const [receptionists, setReceptionists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReceptionists = async () => {
            try {
                const response = await axios.get('/api/receptionists'); // Adjust the API endpoint
                setReceptionists(response.data);
            } catch (error) {
                console.error("Error fetching receptionists:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReceptionists();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
        <Header/>
        <Sidebar/>
        <div className="list-container">
            <h2 className="list-title">Receptionist List</h2>
            <ul className="list">
                {receptionists.map(receptionist => (
                    <li key={receptionist._id} className="list-item">
                        <h4>{receptionist.user.name}</h4> {/* Assuming 'user' has a name property */}
                        <p>Contact: {receptionist.receptionistContact}</p>
                        <p>Email: {receptionist.receptionistEmail}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default ReceptionistList;
