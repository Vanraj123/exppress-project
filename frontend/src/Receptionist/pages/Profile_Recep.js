import React, { useState, useEffect, useContext } from 'react';
import Header from '../../shared/Header';
import Sidebar from './Sidebar';
import Profile from '../../shared/Profile';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import moment from 'moment';

const Profile_Recep = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchReceptionistProfile = async () => {
            try {
                setLoading(true);
                const receptionistId = auth.roleid; // Assuming 'auth.roleid' is the correct receptionist ID
                const response = await axios.get(`http://localhost:5000/api/receptionists/recep/${receptionistId}`);
                console.log(response.data.receptionist); // Log for debugging purposes

                const receptionistData = response.data.receptionist;
                console.log("tjere");
                console.log(receptionistData);
                // Format the address object as a string or render it in another way
                const formattedAddress = `${receptionistData.address?.streetOrSociety || 'Street/Society'}, ${receptionistData.address?.cityOrVillage || 'City/Village'}, ${receptionistData.address?.state || 'State'}, ${receptionistData.address?.pincode || 'Pincode'}, ${receptionistData.address?.country || 'Country'}`;

                const formattedProfile = {
                    name: receptionistData.name, 
                    email: receptionistData.email, 
                    phone: receptionistData.phone,
                    address: formattedAddress, // Now a formatted string
                    dob: moment(receptionistData.DOB).utc().format('DD-MM-YYYY'),
                    gender: receptionistData.gender || '',
                    imageUrl: receptionistData.imageUrl || 'https://tse1.mm.bing.net/th?id=OIP.L-PLw9YL0s6ErCIcuprlKgAAAA&pid=Api&P=0&h=180'
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
