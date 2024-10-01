import React, { useState, useEffect, useContext } from 'react';
import Header from '../../shared/Header';
import Sidebar from './Sidebar';
import Profile from '../../shared/Profile';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';

const Profile_Recep = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchReceptionistProfile = async () => {
            try {
                setLoading(true);
                const receptionistId = auth.roleid;
                const response = await axios.get(`http://localhost:5000/api/receptionists/${receptionistId}`);
                console.log(response.data.receptionist); // Log the raw response for debugging

                // Structure userProfile object based on response data
                const receptionistData = response.data.receptionist;
                const formattedProfile = {
                    name: receptionistData.name,
                    email: receptionistData.email,
                    phone: receptionistData.phone,
                    address: receptionistData.address,
                    dob: receptionistData.DOB || '', // Assuming DOB may not be available
                    gender: receptionistData.gender || '',
                    imageUrl: receptionistData.imageUrl || 'https://tse1.mm.bing.net/th?id=OIP.lsBQVUAihgwVe46z7gNq5wAAAA&pid=Api&P=0&h=180'
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

    return (
        <div className="profile-page">
            <Header />
            <Sidebar />
            {userProfile && (
                <Profile userProfile={userProfile} role="receptionist" />
            )}
        </div>
    );
};

export default Profile_Recep;
