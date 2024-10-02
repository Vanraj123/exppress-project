import Header from '../../shared/Header';
import Profile from '../../shared/Profile';
import ProfileEdit from '../../shared/ProfileEdit';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';

function ProfileEdit_pat() {

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
                    dob: patientData.DOB,
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

    const handleSaveProfile = async (updatedProfile) => {
        try {
            // Prepare the data to send
            const patientId = auth.roleid;

            const updatedData = {
                patientName: updatedProfile.name,
                patientEmail: updatedProfile.email,
                patientContact: updatedProfile.phone,
                patientGender: updatedProfile.gender,
                DOB: moment(updatedProfile.dob, 'MMMM Do YYYY').toISOString(), // Convert back to ISO format
                // Add address fields as needed
                patientAddress: {
                    // Example structure, modify as per your backend requirement
                    cityOrVillage: updatedProfile.address.split(', ')[0],
                    streetOrSociety: updatedProfile.address.split(', ')[1],
                    state: updatedProfile.address.split(', ')[2],
                    pincode: updatedProfile.address.split(', ')[3],
                    country: updatedProfile.address.split(', ')[4]
                },
                // Handle image URL if changed
                imageUrl: updatedProfile.imageUrl || userProfile.imageUrl
            };

            // Send updated profile to the backend
            const response = await axios.patch(`http://localhost:5000/api/patients/${patientId}`, updatedData);
            console.log("Profile updated successfully:", response.data);
            
            // Update local state with new profile data
            setUserProfile({
                ...userProfile,
                ...updatedData, // merge updated fields
                dob: moment(updatedData.DOB).format('MMMM Do YYYY') // Format back for display
            });
        } catch (err) {
            console.error('Error saving profile:', err);
            setError('Failed to save profile');
        }
    };

    return (
        <div>
            <Header/>
            <Sidebar/>
            <ProfileEdit userProfile={userProfile} role="patient" onSave={handleSaveProfile} />
        </div>
    );
}

export default ProfileEdit_pat;
