import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';  
import SearchBar from './Searchbar'; // Ensure this is a search bar component

const ReceptionistList = () => {
    const [receptionists, setReceptionists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReceptionists = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/receptionists');
                console.log("API response:", response.data); // Log the API response for debugging
                
                // Check if response data is an array
                if (Array.isArray(response.data.receptionists)) {
                    setReceptionists(response.data.receptionists);
                } else {
                    console.error("Expected an array but received:", response.data.receptionists);
                    setReceptionists([]); // Handle unexpected data structure
                }
            } catch (error) {
                console.error("Error fetching receptionists:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReceptionists();
    }, []);

    // Function to handle deleting a receptionist
    const handleDeleteReceptionist = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/receptionists/${id}`);
            // Update the state to remove the deleted receptionist
            setReceptionists(receptionists.filter(receptionist => receptionist._id !== id));
        } catch (error) {
            console.error("Error deleting receptionist:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    // Function to filter receptionists based on the search term
    const filterReceptionists = () => {
        return receptionists.filter((receptionist) => {
            // Ensure receptionist and its properties are defined before accessing
            return (
                receptionist &&
                (receptionist.receptionistName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                receptionist.receptionistContact?.includes(searchTerm) ||
                receptionist.receptionistEmail?.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
    };

    const filteredReceptionists = filterReceptionists();
    const defaultImage = 'https://img.freepik.com/free-photo/rendering-anime-doctor-job_23-2151151782.jpg'; // Replace with the path to your default image

    return (
        <div>
            <Header />
            <Sidebar />
            <SearchBar setSearchTerm={setSearchTerm} /> {/* Pass the setSearchTerm function */}
            <div className="list-container">
                <h2 className="list-title">Receptionist List</h2>
                <div className="card-list">
                    {filteredReceptionists.length > 0 ? (
                        filteredReceptionists.map(receptionist => (
                            <div key={receptionist._id} className="card">
                                <img src={receptionist.imgSrc || defaultImage} alt={`Dr. ${receptionist.receptionistName}`} />
                                <h4 className="card-title">{receptionist.receptionistName}</h4>
                                <p>Contact: {receptionist.receptionistContact}</p>
                                <p>Email: {receptionist.receptionistEmail}</p>
                                <p>
                                    Address: {`${receptionist.receptionistAddress?.streetOrSociety || ''}, 
                                    ${receptionist.receptionistAddress?.cityOrVillage || ''}, 
                                    ${receptionist.receptionistAddress?.state || ''}, 
                                    ${receptionist.receptionistAddress?.pincode || ''}, 
                                    ${receptionist.receptionistAddress?.country || ''}`}
                                </p>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDeleteReceptionist(receptionist._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>No receptionists found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReceptionistList;
