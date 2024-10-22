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
                const patientData = response.data.patient;

                const formattedAddress = `${patientData.patientAddress?.streetOrSociety || 'Street/Society'}, 
                          ${patientData.patientAddress?.cityOrVillage || 'City/Village'}, 
                          ${patientData.patientAddress?.state || 'State'}, 
                          ${patientData.patientAddress?.pincode || 'Pincode'}, 
                          ${patientData.patientAddress?.country || 'Country'}`;

                const formattedProfile = {
                    name: patientData.patientName,
                    email: patientData.patientEmail,
                    phone: patientData.patientContact,
                    address: formattedAddress,  // Store address as a string for display
                    dob: moment(patientData.DOB).utc().format('DD-MM-YYYY'),
                    gender: patientData.patientGender,
                    imageUrl: patientData.imageUrl || 'https://tse1.mm.bing.net/th?id=OIP.L-PLw9YL0s6ErCIcuprlKgAAAA&pid=Api&P=0&h=180'
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
            <Sidebar />
            {userProfile && (
                <Profile userProfile={userProfile} role="patient" />
            )}
        </div>
    );
};

export default Profile_Pat;
