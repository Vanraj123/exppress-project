import React from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Profile from '../../shared/Profile';

const Profile_Pat = () => {
    const userProfile = {
        name: "John Doe",
        email: "user@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        dob: "01/01/1990",
        gender: "Male",
        medicalID: "MED1234567",
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.lsBQVUAihgwVe46z7gNq5wAAAA&pid=Api&P=0&h=180',
    };

    const handleEdit = () => {
        // Logic for editing the profile goes here
        console.log("Edit Profile Clicked");
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="sidebar">
                <a href="#">Dashboard</a>
                <a href="#">Upcoming Appointments</a>
                <a href="#">Medical History</a>
                <a href="#">Prescriptions</a>
                <a href="#">Settings</a>
            </div>
            <Profile userProfile={userProfile} role="patient" onEdit={handleEdit} />
        </div>
    );
};

export default Profile_Pat;
