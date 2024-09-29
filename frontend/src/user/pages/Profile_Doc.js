import React from 'react';
import './Profile_Doc.css'; // Assuming you create a separate CSS file for Profile styles
import Header from './Header';
import Footer from './Footer';
const Profile_Doc = () => {
    const userProfile = {
        name: "John Doe",
        email: "user@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        dob: "01/01/1990",
        gender: "Male",
        medicalID: "MED1234567",
    };

    return (
        <div className="profile-page">
            <Header/>
            {/* <div className="header">
                <h1>Profile</h1>
            </div> */}
            <div className="sidebar">
                <a href="#">Dashboard</a>
                <a href="#">Upcoming Appointments</a>
                <a href="#">Medical History</a>
                <a href="#">Prescriptions</a>
                <a href="#">Settings</a>
            </div>
            <div className="profile-card">
                <h2>Personal Information</h2>
                <div className="profile-info">
                    <div className="profile-field">
                        <span className="label">Name:</span>
                        <span className="value">{userProfile.name}</span>
                    </div>
                    <div className="profile-field">
                        <span className="label">Email:</span>
                        <span className="value">{userProfile.email}</span>
                    </div>
                    <div className="profile-field">
                        <span className="label">Phone:</span>
                        <span className="value">{userProfile.phone}</span>
                    </div>
                    <div className="profile-field">
                        <span className="label">Address:</span>
                        <span className="value">{userProfile.address}</span>
                    </div>
                    <div className="profile-field">
                        <span className="label">Date of Birth:</span>
                        <span className="value">{userProfile.dob}</span>
                    </div>
                    <div className="profile-field">
                        <span className="label">Gender:</span>
                        <span className="value">{userProfile.gender}</span>
                    </div>
                    <div className="profile-field">
                        <span className="label">Medical ID:</span>
                        <span className="value">{userProfile.medicalID}</span>
                    </div>
                </div>
                <button className="edit-button">Edit Profile</button>
            </div>
            <Footer/>
        </div> 
    );
};

export default Profile_Doc;
