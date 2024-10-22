import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';  
import SearchBar from './Searchbar'; // Assuming the SearchBar is the same

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors/');
                console.log("API response:", response.data); // Log the response for debugging
                setDoctors(response.data.doctors); // Extract the doctors array from response
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // Function to handle deleting a doctor
    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/doctors/${id}`);
            // Update the state to remove the deleted doctor
            setDoctors(doctors.filter(doctor => doctor._id !== id));
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    // Function to filter doctors based on the search term
    const filterDoctors = () => {
        return doctors.filter((doctor) =>
            (doctor.docName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            doctor.docSpeciality?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            doctor.docContact?.includes(searchTerm))
        );
    };

    const filteredDoctors = filterDoctors();
    const defaultImage = 'https://img.freepik.com/free-photo/rendering-anime-doctor-job_23-2151151782.jpg'; // Replace with the path to your default image

    return (
        <div>
            <Header />
            <Sidebar />
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="list-container">
                <h2 className="list-title">Doctor List</h2>
                <div className="card-list">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map(doctor => (
                            <div key={doctor._id} className="card">
                                <img src={doctor.imgSrc || defaultImage} alt={`Dr. ${doctor.docName || 'Unknown'}`} />
                                <h4 className="card-title">{doctor.docName || 'No Name Provided'}</h4>
                                <p>Specialization: {doctor.docSpeciality || 'Not specified'}</p>
                                <p>Contact: {doctor.docContact || 'No contact available'}</p>
                                <p>
                                    Address: {doctor.docAddress?.streetOrSociety || 'N/A'}, {doctor.docAddress?.cityOrVillage || 'N/A'}, 
                                    {doctor.docAddress?.state || 'N/A'}, {doctor.docAddress?.pincode || 'N/A'}, 
                                    {doctor.docAddress?.country || 'N/A'}
                                </p>
                                <p>Qualification: {doctor.docQualification || 'Not specified'}</p>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDeleteDoctor(doctor._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No doctors found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;
