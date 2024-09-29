import Header from '../../shared/Header';
import Profile from '../../shared/Profile';
import ProfileEdit from '../../shared/ProfileEdit';
import Sidebar from './Sidebar';

function ProfileEdit_pat() {
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

    const handleSaveProfile = (updatedProfile) => {
        console.log("Profile updated:", updatedProfile);
        // You can update the profile in your state or send it to the backend
    };

    return (
        <div>
            <Header/>
            <Sidebar/>
            <ProfileEdit userProfile={userProfile} role="patient" onSave={handleSaveProfile} />
        </div>
    );
}

export default ProfileEdit_pat;
