import React, { useState, useEffect } from 'react';
import './modal.css'; // Ensure you import the modal CSS

const HospitalModal = ({ isOpen, onClose, onSubmit, hospital }) => {
    const [hospitalData, setHospitalData] = useState({
        Hos_Name: '',
        E_Date: '', // Ensure this is initialized correctly
        ManageBy: '',
        image:'',
        hosaddress: {
            cityvillage: '',
            pincode: '',
            state: '',
            country: '',
            streetOrSociety: '', // Ensure this field is correctly named
        },
    });

    // Use useEffect to pre-fill the form fields if a hospital is selected for editing
    useEffect(() => {
        if (hospital) {
            setHospitalData({
                ...hospital,
                E_Date: hospital.E_Date ? hospital.E_Date.split('T')[0] : '',  // Extract only the date part (YYYY-MM-DD)
            });
        } else {
            // Reset the form to empty values when adding a new hospital
            setHospitalData({
                Hos_Name: '',
                E_Date: '',
                ManageBy: '',
                image:'',
                hosaddress: {
                    cityvillage: '',
                    pincode: '',
                    state: '',
                    country: '',
                    streetOrSociety: '', 
                },
            });
        }
    }, [hospital]);

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
        // Ensure that the hospitalData is structured correctly for your API
        onSubmit(hospitalData);
        onClose(); // Close the modal after submitting
    };

    if (!isOpen) return null; // Don't render if modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{hospital ? 'Update Hospital' : 'Add Hospital'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="Hos_Name"
                        placeholder="Hospital Name"
                        value={hospitalData.Hos_Name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="E_Date"
                        value={hospitalData.E_Date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="ManageBy"
                        placeholder="Managed By"
                        value={hospitalData.ManageBy}
                        onChange={handleChange}
                        required
                    />
                     <input
                        type="text"
                        name="image" // Ensure this is correct according to your backend
                        placeholder="image URL FROM online"
                        value={hospitalData.image}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="cityvillage"
                        placeholder="City/Village"
                        value={hospitalData.hosaddress.cityvillage}
                        onChange={handleAddressChange}
                        required
                    />
                    <input
                        type="number"
                        name="pincode"
                        placeholder="Pincode"
                        value={hospitalData.hosaddress.pincode}
                        onChange={handleAddressChange}
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={hospitalData.hosaddress.state}
                        onChange={handleAddressChange}
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={hospitalData.hosaddress.country}
                        onChange={handleAddressChange}
                        required
                    />
                    <input
                        type="text"
                        name="streetOrSociety" // Ensure this is correct according to your backend
                        placeholder="Street/City"
                        value={hospitalData.hosaddress.streetOrSociety}
                        onChange={handleAddressChange}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit">{hospital ? 'Update Hospital' : 'Add Hospital'}</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HospitalModal;
