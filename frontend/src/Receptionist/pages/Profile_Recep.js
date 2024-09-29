import React from 'react';
// import './Profile.css'; // Make sure to import the CSS file
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Profile from '../../shared/Profile';
import Sidebar from './Sidebar';

const Profile_Recep = () => {
    const userProfile = {
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "555-123-4567",
        address: "789 Maple St, Anytown, USA",
        imageUrl: "https://tse2.mm.bing.net/th?id=OIP.lsBQVUAihgwVe46z7gNq5wAAAA&pid=Api&P=0&h=180",
        role: "Receptionist",
    };

    const handleEdit = () => {
        console.log("Edit Profile Clicked");
    };

    return (
        <div className="profile-page">
            <Header />
            <Sidebar/>
            <div className="main-content">
                <Profile userProfile={userProfile} role="receptionist" onEdit={handleEdit} />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Profile_Recep;
