import React, { useState, useEffect, useContext } from 'react';
import Header from '../../shared/Header';
import Profile from '../../shared/Profile';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import moment from 'moment';

const Profile_Doc = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                setLoading(true);
                const doctorId = auth.roleid; 
                const response = await axios.get(`http://localhost:5000/api/doctors/doc/${doctorId}`);
                console.log(response.data.doctor); // Log the raw response for debugging

                // Structure userProfile object based on response data
                const doctorData = response.data.doctor;
                const formattedAddress = `${doctorData.docAddress?.streetOrSociety || 'Street/Society'}, ${doctorData.docAddress?.cityOrVillage || 'City/Village'}, ${doctorData.docAddress?.state || 'State'}, ${doctorData.docAddress?.pincode || 'Pincode'}, ${doctorData.docAddress?.country || 'Country'}`;

                const formattedProfile = {
                    name: doctorData.docName,
                    email: doctorData.docEmail,
                    phone: doctorData.docContact,
                    specialization: doctorData.docSpeciality,
                    docQualification: doctorData.docQualification,
                    address: formattedAddress,
                    dob: moment(doctorData.DOB).format('MMMM Do YYYY'), 
                    gender: doctorData.docGender,
                    imageUrl: doctorData.imageUrl || 'https://img.freepik.com/free-photo/rendering-anime-doctor-job_23-2151151782.jpg' // Default image if none provided
                };

                setUserProfile(formattedProfile); 
                setLoading(false);
            } catch (err) {
                console.error('Error fetching doctor profile:', err);
                setError('Failed to load doctor profile');
                setLoading(false);
            }
        };

        fetchDoctorProfile();
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
            <Sidebar/>
            {userProfile && (
                <Profile userProfile={userProfile} role="doctor" />
            )}
        </div>
    );
};

export default Profile_Doc;
