import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ userProfile, role }) => {
    const navigate = useNavigate();
    const username = userProfile.name || '';
    // Navigate to the ProfileEdit page when 'Edit Profile' is clicked
    const handleEdit = () => {
        navigate('edit-profile'); // This assumes you have a route set up for '/edit-profile'
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Profile</h2> */}
                <h2>{username.charAt(0).toUpperCase() + username.slice(1)}</h2>
                <div className="profile-info">
                    {/* Profile Image */}
                    <div className="profile-image">
                        <img src={userProfile.imageUrl} alt="Profile" />
                    </div>

                    {/* Profile Fields */}
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
                    {/* Patient-specific fields */}
                    {role === 'doctor' && (
                        <>
                            <div className="profile-field">
                                <span className="label">Speciality:</span>
                                <span className="value">{userProfile.specialization}</span>
                            </div>
                            <div className="profile-field">
                                <span className="label">Gender:</span>
                                <span className="value">{userProfile.gender}</span>
                            </div>
                            <div className="profile-field">
                                <span className="label">docQualification:</span>
                                <span className="value">{userProfile.docQualification}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Edit Button */}
                <button className="edit-button-profile" onClick={handleEdit}>
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
