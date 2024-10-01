import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MakeAppointment.css';
import Header from '../../shared/Header';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../patient/pages/Sidebar';
const MakeAppointment = () => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState({
        patient : auth.roleid,
        doctor: '',
        hospital: '',
        date: '',
        time: '',
        status: 'Pending',
        details: ''
    });
    const [hospitals, setHospitals] = useState([]);  // Initialized as an empty array
    const [doctors, setDoctors] = useState([]);
    
    const navigate = useNavigate();

    // Fetch hospital list when component loads
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hospitals');
                console.log('Fetched hospitals:', response.data);  // Log response to verify
                const hospitalsArray = Array.isArray(response.data.hospitals) ? response.data.hospitals : [response.data.hospitals];
                setHospitals(hospitalsArray);  // Handle case where only one hospital is returned
            } catch (error) {
                console.error('Error fetching hospitals:', error);
                setHospitals([]);  // Fallback to empty array
            }
        };

        fetchHospitals();
    }, []);

    // Fetch doctors when hospital is selected
    useEffect(() => {
        if (formData.hospital) {
            const fetchDoctors = async () => {
                try {
                    const hosId = formData.hospital;
                    const response = await axios.get(`http://localhost:5000/api/doctors/hos/${hosId}`);
                    console.log('Fetched doctors:', response.data);  // Log the fetched doctor data

                    // Check if the response has a nested doctor array
                    const doctorsArray = Array.isArray(response.data.doctor) ? response.data.doctor : [response.data.doctor];
                    setDoctors(doctorsArray);  // Set the doctor array
                } catch (error) {
                    console.error('Error fetching doctors:', error);
                    setDoctors([]);  // Fallback to empty array
                }
            };

            console.log("Selected hospital:", formData.hospital);
            fetchDoctors();
        }
    }, [formData.hospital]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogout = () => {
        auth.logout();
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/appointments', formData);
            console.log(response.data);
            alert("Appointment Booked!");

            // Redirect user to /patient after booking appointment
            navigate('/patient');
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert("Error booking appointment. Please try again.");
        }
    };

    return (
        <div className="make-appointment">
            <Header/>
            <Sidebar/>
            <div className="main-make_appoint">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="hospital">Select Hospital:</label>
                            <select id="hospital" name="hospital" value={formData.hospital} onChange={handleChange}>
                                <option value="">Select a hospital</option>
                                {hospitals.length > 0 ? (
                                    hospitals.map(hospital => (
                                        <option key={hospital._id} value={hospital._id}>
                                            {hospital.Hos_Name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No hospitals available</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="doctor">Select Doctor:</label>
                            <select id="doctor" name="doctor" value={formData.doctor} onChange={handleChange} disabled={!formData.hospital}>
                                <option value="">Select a doctor</option>
                                {doctors.length > 0 ? (
                                    doctors.map( doctor => (
                                        <option key={doctor._id} value={doctor._id}>
                                            {doctor.docName} - {doctor.docSpeciality}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No doctors available</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Appointment Date:</label>
                            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Appointment Time:</label>
                            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="details">Additional Details:</label>
                            <textarea id="details" name="details" rows="4" value={formData.details} onChange={handleChange} placeholder="Enter any additional details..." />
                        </div>
                        <button type="submit" className="btn-make-appo">Book Appointment</button>
                    </form>
            </div>
        </div>
    );
};

export default MakeAppointment;
