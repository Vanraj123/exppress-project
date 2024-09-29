import React from 'react';
import Header from '../../shared/Header';
import ProfileEdit from '../../shared/ProfileEdit';
import Sidebar from './Sidebar';

function ProfileEdit_recep() {
    const userProfile = {
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "555-123-4567",
        address: "789 Maple St, Anytown, USA",
        dob: "", // Assuming no DOB for receptionist
        gender: "", // Assuming no gender for receptionist
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.lsBQVUAihgwVe46z7gNq5wAAAA&pid=Api&P=0&h=180',
    };

    const handleSaveProfile = (updatedProfile) => {
        console.log("Profile updated:", updatedProfile);
        // Here, you can add logic to update the profile in your state or send it to the backend
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <ProfileEdit userProfile={userProfile} role="receptionist" onSave={handleSaveProfile} />
        </div>
    );
}

export default ProfileEdit_recep;
