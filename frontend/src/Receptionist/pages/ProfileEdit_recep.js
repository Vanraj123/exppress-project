import React, { useState, useEffect, useContext } from 'react';
import Header from '../../shared/Header';
import Sidebar from './Sidebar';
import ProfileEdit from '../../shared/ProfileEdit';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import moment from 'moment';

const ProfileEdit_Recep = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchReceptionistProfile = async () => {
            try {
                setLoading(true);
                const receptionistId = auth.roleid;
                const response = await axios.get(`http://localhost:5000/api/receptionists/recep/${receptionistId}`);
                console.log(response.data.receptionist); // Log the raw response for debugging

                // Structure userProfile object based on response data
                const receptionistData = response.data.receptionist;
                const formattedProfile = {
                    name: receptionistData.name,
                    email: receptionistData.email,
                    phone: receptionistData.phone,
                    address: receptionistData.address,
                    dob: receptionistData.DOB ? moment(receptionistData.DOB).format('YYYY-MM-DD') : '', // Use YYYY-MM-DD for input date field
                    gender: receptionistData.gender || '',
                    imageUrl: receptionistData.imageUrl || 'https://tse2.mm.bing.net/th?id=OIP.lsBQVUAihgwVe46z7gNq5wAAAA&pid=Api&P=0&h=180'
                };

                setUserProfile(formattedProfile);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching receptionist profile:', err);
                setError('Failed to load receptionist profile');
                setLoading(false);
            }
        };

        fetchReceptionistProfile();
    }, [auth.roleid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleSaveProfile = async (updatedProfile) => {
        try {
            const receptionistId = auth.roleid;

            const updatedData = {
                name: updatedProfile.name,
                email: updatedProfile.email,
                phone: updatedProfile.phone,
                gender: updatedProfile.gender,
                DOB: moment(updatedProfile.dob, 'YYYY-MM-DD').toISOString(),
                address: updatedProfile.address,
                imageUrl: updatedProfile.imageUrl || userProfile.imageUrl
            };

            // Send updated profile to the backend
            const response = await axios.patch(`http://localhost:5000/api/receptionists/${receptionistId}`, updatedData);
            console.log("Profile updated successfully:", response.data);

            // Update local state with new profile data
            setUserProfile({
                ...userProfile,
                ...updatedData,
                dob: moment(updatedData.DOB).format('YYYY-MM-DD')
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
            {userProfile && (
                <ProfileEdit userProfile={userProfile} role="receptionist" onSave={handleSaveProfile} />
            )}
        </div>
    );
};

export default ProfileEdit_Recep;
