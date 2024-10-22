import React, { useState, useEffect, useContext } from 'react';
import Header from '../../shared/Header';
import ProfileEdit from '../../shared/ProfileEdit';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import moment from 'moment';

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
                const patientData = response.data.patient;

                // Check if patientAddress exists, if not, provide default empty values
                const formattedAddress = `${patientData.patientAddress?.cityOrVillage || 'City/Village'}, ${patientData.patientAddress?.streetOrSociety || 'Street/Society'}, ${patientData.patientAddress?.state || 'State'}, ${patientData.patientAddress?.pincode || 'Pincode'}, ${patientData.patientAddress?.country || 'Country'}`;

                const formattedProfile = {
                    name: patientData.patientName || '',
                    email: patientData.patientEmail || '',
                    phone: patientData.patientContact || '',
                    address: formattedAddress,
                    dob: patientData.DOB ? moment(patientData.DOB).format('DD-MM-yyyy') : '',
                    gender: patientData.patientGender || '',
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

    const handleSaveProfile = async (updatedProfile) => {
        try {
            const patientId = auth.roleid;
<<<<<<< HEAD
            console.log("hi");
            console.log(updatedProfile);
            // Split the address string into parts
            let addressParts = updatedProfile.address.split(',').map(part => part.trim());
            
            // Ensure we have exactly 5 parts, otherwise fill missing parts with empty strings
            while (addressParts.length < 5) {
                addressParts.push('');  // Fallback to empty string for missing parts
            }
    
            // Destructure into components
            const [cityOrVillage, streetOrSociety, state, pincode, country] = addressParts;
            // console.log(cityOrVillage);
            // console.log(streetOrSociety);
            // Prepare the updated data object
            const updatedData = {
                patientName: updatedProfile.name,
                patientEmail: updatedProfile.email,
                patientContact: updatedProfile.phone,
                patientGender: updatedProfile.gender,
                DOB: moment(updatedProfile.dob, 'MMMM Do YYYY').toISOString(), // Convert back to ISO format
                patientAddress: {
                    cityOrVillage: cityOrVillage,  // Provide fallback if undefined
                    streetOrSociety: streetOrSociety,
                    state: state || '',
                    pincode: pincode || '',
                    country: country || '',
                },
                imageUrl: updatedProfile.imageUrl || userProfile.imageUrl
            };
    
            console.log(updatedData);
    
            // Send updated profile to the backend
            const response = await axios.patch(`http://localhost:5000/api/patients/${patientId}`, updatedData);
            console.log("Profile updated successfully:", response.data);
            
            // Update local state with new profile data
            setUserProfile({
                ...userProfile,
                ...updatedData,
                dob: moment(updatedData.DOB).format('MMMM Do YYYY') // Format back for display
=======
            const updatedData = {
                patientName: updatedProfile.name || '',
                patientEmail: updatedProfile.email || '',
                patientContact: updatedProfile.phone || '',
                patientGender: updatedProfile.gender || '',
                DOB: moment(updatedProfile.dob, 'DD-MM-YYYY').utc().toDate(),
                patientAddress: {
                    cityOrVillage: updatedProfile.address.split(', ')[0] || 'City/Village',
                    streetOrSociety: updatedProfile.address.split(', ')[1] || 'Street/Society',
                    state: updatedProfile.address.split(', ')[2] || 'State',
                    pincode: updatedProfile.address.split(', ')[3] || 'Pincode',
                    country: updatedProfile.address.split(', ')[4] || 'Country'
                },
                imageUrl: updatedProfile.imageUrl || userProfile.imageUrl
            };

            await axios.patch(`http://localhost:5000/api/patients/${patientId}`, updatedData);
            setUserProfile({
                ...userProfile,
                ...updatedData, 
                dob: moment(updatedData.DOB).format('MMMM Do YYYY')
>>>>>>> 5c0c4db39f3814b38d76fedc9d70a66f1c1c224e
            });
        } catch (err) {
            console.error('Error saving profile:', err);
            setError('Failed to save profile');
        }
    };
    

    return (
        <div>
            <Header />
            <Sidebar />
            <ProfileEdit userProfile={userProfile} role="patient" onSave={handleSaveProfile} />
        </div>
    );
}

export default ProfileEdit_pat;
