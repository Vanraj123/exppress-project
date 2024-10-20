import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './common.css'; // Import common CSS
import Header from '../../shared/Header'; 
import Sidebar from './Sidebar';      
import SearchBar from './Searchbar';
import HospitalCard from '../../hospital/pages/HospitalCard'; // Import the HospitalCard component
import HospitalModal from './HospitalModal'; // Import the HospitalModal component

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null); // For update

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hospitals'); // Adjust the API endpoint
                console.log("API response:", response.data); // Log the response for debugging

                // Ensure response is an array
                if (Array.isArray(response.data.hospitals)) {
                    setHospitals(response.data.hospitals);
                } else {
                    console.error("Expected an array but received:", response.data);
                    setHospitals([]); // Set to empty array if the response is not as expected
                }
            } catch (error) {
                console.error("Error fetching hospitals:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    const handleAddHospital = async (newHospital) => {
        try {
            const response = await axios.post('http://localhost:5000/api/hospitals', newHospital); // Adjust the API endpoint
            setHospitals([...hospitals, response.data.hospital]); // Update the state with the new hospital
        } catch (error) {
            console.error("Error adding hospital:", error.response?.data || error.message); // Log detailed error response
        }
    };
    

    const handleUpdateHospital = async (updatedHospital) => {
        try {
            console.log("Updating hospital with ID:", updatedHospital._id);
            console.log("Updated hospital data:", updatedHospital);
            
            const response = await axios.put(`http://localhost:5000/api/hospitals/${updatedHospital._id}`, updatedHospital);
            setHospitals(hospitals.map(hospital => hospital._id === updatedHospital._id ? response.data.hospital : hospital));
        } catch (error) {
            console.error("Error updating hospital:", error.response?.data || error.message); // Log detailed error response
        }
    };
    

    const handleDeleteHospital = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/hospitals/${id}`); // Adjust the API endpoint
            setHospitals(hospitals.filter(hospital => hospital._id !== id)); // Remove the hospital from state
        } catch (error) {
            console.error("Error deleting hospital:", error);
        }
    };

    const handleOpenModal = (hospital = null) => {
        setSelectedHospital(hospital);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedHospital(null);
        setModalOpen(false);
    };

    // Search term is already being set by the SearchBar
    const filteredHospitals = hospitals.filter(hospital =>
        (hospital.Hos_Name && hospital.Hos_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hospital.ManagedBy && hospital.ManagedBy.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hospital.hosaddress?.cityvillage && hospital.hosaddress.cityvillage.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hospital.hosaddress?.state && hospital.hosaddress.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hospital.hosaddress?.country && hospital.hosaddress.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hospital.hosaddress?.pincode && hospital.hosaddress.pincode.toString().includes(searchTerm))
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <Sidebar />
            <SearchBar setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to SearchBar */}
            <div className="main-hospitalList">
                <h2 className="list-title">Hospital List</h2>
                <button onClick={() => handleOpenModal()}>Add Hospital</button>
                <div className="hospital-cards-container">
                    {filteredHospitals.length > 0 ? (
                        filteredHospitals.map(hospital => (
                            <div key={hospital._id}>
                                <HospitalCard
                                    imgSrc={hospital.image || 'http://upload.wikimedia.org/wikipedia/commons/8/8a/Nationwide_Childrens_Hospital,_Exterior_from_Fragrance_Maze,_May_2013.jpg'}
                                    Hos_Name={hospital.Hos_Name}
                                    E_Date={hospital.E_Date}
                                    ManageBy={hospital.ManageBy}
                                    hosaddress={hospital.hosaddress}
                                />
                                <center>
                                <button onClick={() => handleOpenModal(hospital)}>Update</button>
                                <button onClick={() => handleDeleteHospital(hospital._id)}>Delete</button>
                                </center>
                            </div>
                        ))
                    ) : (
                        <div>No hospitals found</div>
                    )}
                </div>
            </div>

            {/* Modal for adding/updating hospitals */}
            <HospitalModal 
                isOpen={modalOpen} 
                onClose={handleCloseModal} 
                onSubmit={selectedHospital ? handleUpdateHospital : handleAddHospital} 
                hospital={selectedHospital} 
            />
        </div>
    );
};

export default HospitalList;
