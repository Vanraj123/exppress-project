import React from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Profile from '../../shared/Profile';

const Profile_Recep = () => {
    const userProfile = {
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "555-123-4567",
        address: "789 Maple St, Anytown, USA",
        role: "Receptionist",
    };

    const handleEdit = () => {
        console.log("Edit Profile Clicked");
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="sidebar">
                <a href="#">Dashboard</a>
                <a href="#">Manage Appointments</a>
                <a href="#">Patient Records</a>
                <a href="#">Settings</a>
            </div>
            <Profile userProfile={userProfile} role="receptionist" onEdit={handleEdit} />
            <Footer />
        </div>
    );
};

export default Profile_Recep;
