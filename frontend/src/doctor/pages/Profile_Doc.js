import React from 'react';
import Header from './Header';
import Footer from '../../shared/Footer';
import Profile from '../../shared/Profile';

const Profile_Doc = () => {
    const userProfile = {
        name: "Dr. Jane Smith",
        email: "dr.jane@example.com",
        phone: "987-654-3210",
        address: "456 Elm St, Anytown, USA",
        specialization: "Cardiology",
        medicalID: "DOC9876543",
    };

    const handleEdit = () => {
        console.log("Edit Profile Clicked");
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="sidebar">
                <a href="#">Dashboard</a>
                <a href="#">Patient Appointments</a>
                <a href="#">Medical History</a>
                <a href="#">Prescriptions</a>
                <a href="#">Settings</a>
            </div>
            <Profile userProfile={userProfile} role="doctor" onEdit={handleEdit} />
            <Footer />
        </div>
    );
};

export default Profile_Doc;
