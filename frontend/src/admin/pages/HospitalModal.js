import React, { useState } from 'react';
import './modal.css'; // Ensure you import the modal CSS

const HospitalModal = ({ isOpen, onClose, onSubmit }) => {
    const [hospitalData, setHospitalData] = useState({
        Hos_Name: '',
        E_Date: '',
        ManageBy: '',
        hosaddress: {
            cityvillage: '',
            pincode: '',
            state: '',
            country: '',
            streerorsocity: '', // New field
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospitalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setHospitalData((prevData) => ({
            ...prevData,
            hosaddress: {
                ...prevData.hosaddress,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(hospitalData);
        onClose(); // Close the modal after submitting
    };

    if (!isOpen) return null; // Don't render if modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Hospital</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="Hos_Name" placeholder="Hospital Name" onChange={handleChange} required />
                    <input type="date" name="E_Date" onChange={handleChange} required />
                    <input type="text" name="ManageBy" placeholder="Managed By" onChange={handleChange} required />
                    <input type="text" name="cityvillage" placeholder="City/Village" onChange={handleAddressChange} required />
                    <input type="number" name="pincode" placeholder="Pincode" onChange={handleAddressChange} required />
                    <input type="text" name="state" placeholder="State" onChange={handleAddressChange} required />
                    <input type="text" name="country" placeholder="Country" onChange={handleAddressChange} required />
                    <input type="text" name="streerorsocity" placeholder="Street/City" onChange={handleAddressChange} required /> {/* New field */}
                    <div className="modal-buttons">
                        <button type="submit">Add Hospital</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HospitalModal;
