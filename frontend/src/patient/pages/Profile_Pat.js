import React, { useState, useEffect, useContext } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Profile from '../../shared/Profile';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
const Profile_Pat = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchPatientProfile = async () => {
            try {
                setLoading(true);
                const patientId = auth.roleid; 
                const response = await axios.get(`http://localhost:5000/api/patients/pati/${patientId}`);
                console.log(response.data.patient); // Log the raw response for debugging

                // Structure userProfile object based on response data
                const patientData = response.data.patient;
                const formattedAddress = `${patientData.patientAddress.cityOrVillage}, ${patientData.patientAddress.streetOrSociety}, ${patientData.patientAddress.state}, ${patientData.patientAddress.pincode},${patientData.patientAddress.country}`;

                const formattedProfile = {
                    name: patientData.patientName,
                    email: patientData.patientEmail,
                    phone: patientData.patientContact,
                    address: formattedAddress,
                    dob: moment(patientData.DOB).format('MMMM Do YYYY'), 
                    gender: patientData.patientGender,
                    imageUrl: patientData.imageUrl || 'https://tse1.mm.bing.net/th?id=OIP.L-PLw9YL0s6ErCIcuprlKgAAAA&pid=Api&P=0&h=180' // Default image if none provided
                };

                setUserProfile(formattedProfile); 
                setLoading(false);
            } catch (err) {
                console.error('Error fetching patient profile:', err);
                setError('Failed to load patient profile');
                setLoading(false);
            }
        };

        fetchPatientProfile();
    }, [auth.roleid]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-page">
            <Header />
            {/* <div className="sidebar">
            <NavLink to="/patient/">Dashboard</NavLink>
                <a href="#">Upcoming Appointments</a>
                <a href="#">Medical History</a>
                <a href="#">Prescriptions</a>
                <a href="#">Settings</a>
            </div> */}
            <Sidebar/>
            {userProfile && (
                <Profile userProfile={userProfile} role="patient" />
            )}
            {/* <Footer /> */}
        </div>
    );
};

export default Profile_Pat;