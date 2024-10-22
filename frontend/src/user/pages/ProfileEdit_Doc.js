import React, { useState, useEffect, useContext } from 'react';
import Header from '../../shared/Header';
import ProfileEdit from '../../shared/ProfileEdit';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import moment from 'moment';

function ProfileEdit_Doc() {
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
                    dob: moment(doctorData.DOB, 'DD-MM-YYYY').utc().toDate(),
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

    const handleSaveProfile = async (updatedProfile) => {
        try {
            const doctorId = auth.roleid;

            const updatedData = {
                docName: updatedProfile.name,
                docEmail: updatedProfile.email,
                docContact: updatedProfile.phone,
                docGender: updatedProfile.gender,
                docSpeciality: updatedProfile.specialization,
                docQualification: updatedProfile.docQualification,
                DOB: moment(updatedProfile.dob, 'MMMM Do YYYY').toISOString(), 
                docAddress: {
                    cityOrVillage: updatedProfile.address.split(', ')[0],
                    streetOrSociety: updatedProfile.address.split(', ')[1],
                    state: updatedProfile.address.split(', ')[2],
                    pincode: updatedProfile.address.split(', ')[3],
                    country: updatedProfile.address.split(', ')[4]
                },
                imageUrl: updatedProfile.imageUrl || userProfile.imageUrl
            };

            const response = await axios.patch(`http://localhost:5000/api/doctors/${doctorId}`, updatedData);
            console.log("Profile updated successfully:", response.data);

            setUserProfile({
                ...userProfile,
                ...updatedData,
                dob: moment(updatedData.dob).format('MMMM Do YYYY') 
            });
        } catch (err) {
            console.error('Error saving doctor profile:', err);
            setError('Failed to save doctor profile');
        }
    };

    return (
        <div>
            <Header/>
            <Sidebar/>
            <ProfileEdit userProfile={userProfile} role="doctor" onSave={handleSaveProfile} />
        </div>
    );
}

export default ProfileEdit_Doc;