import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileEdit.css';
import moment from 'moment';

const ProfileEdit = ({ userProfile, role, onSave }) => {
    const navigate = useNavigate();

    // Initialize state with the current profile information and image
    const [editProfile, setEditProfile] = useState({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
<<<<<<< HEAD
        dob: userProfile.dob 
            ? moment(userProfile.dob, 'YYYY-MM-DD').isValid() 
                ? moment(userProfile.dob, 'YYYY-MM-DD').format('YYYY-MM-DD') 
                : '' 
            : '',
        specialization: userProfile.specialization || '',
=======
        dob: userProfile.dob ? moment(userProfile.dob, 'DD-MM-YYYY').format('YYYY-MM-DD') : '', // Convert to 'YYYY-MM-DD'
        specialization : userProfile.specialization || '',
        docQualification: userProfile.docQualification || '',
>>>>>>> 5c0c4db39f3814b38d76fedc9d70a66f1c1c224e
        gender: userProfile.gender || '',
        image: userProfile.imageUrl || 'https://tse1.mm.bing.net/th?id=OIP.L-PLw9YL0s6ErCIcuprlKgAAAA&pid=Api&P=0&h=180' // Assuming imageUrl holds the current profile picture URL
    });

    const [selectedImage, setSelectedImage] = useState(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editProfile, [name]: value });
    };

    // Handle image change and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setEditProfile({ ...editProfile, image: file });
        }
    };

    // Handle save button click
    const handleSave = () => {
        // Call the onSave function passed via props
        onSave(editProfile);

        // Navigate back to the profile page after saving
        if (role === "patient") {
            navigate('/patient/profile/');
        } else if (role === "receptionist") {
            navigate('/receptionist/profile');
        } else {
            navigate('/doc/profile/');
        }
    };

    return (
        <div className="profile-edit-container">
            <div className="profile-edit-card">
                <h2>Edit {role.charAt(0).toUpperCase() + role.slice(1)} Profile</h2>
                <div className="profile-edit-form">
                    {/* Profile Image Preview and Upload */}
                    <div className="profile-edit-field">
                        <div className="image-preview">
                            <img
                                src={selectedImage || editProfile.image}
                                alt="Profile Preview"
                                className="profile-image"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Editable Fields */}
                    <div className="profile-edit-field">
                        <label className="label">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editProfile.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="profile-edit-field">
                        <label className="label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editProfile.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="profile-edit-field">
                        <label className="label">Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={editProfile.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="profile-edit-field">
                        <label className="label">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={editProfile.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="profile-edit-field">
                        <label className="label">Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            value={editProfile.dob}
                            onChange={handleInputChange}  
                        />
                    </div>
                    <div className="profile-edit-field">
                        <label className="label">Gender:</label>
                        <select
                            name="gender"
                            value={editProfile.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Doctor-specific fields */}
                    {role === 'doctor' && (
<<<<<<< HEAD
                        <div className="profile-edit-field">
                            <label className="label">Specialization:</label>
                            <input
                                type="text"
                                name="specialization"
                                value={editProfile.specialization}
                                onChange={handleInputChange}
                            />
                        </div>
=======
                        <>
                            <div className="profile-edit-field">
                                <label className="label">docQualification:</label>
                                <input
                                    type="text"
                                    name="docQualification"
                                    value={editProfile.docQualification}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="profile-edit-field">
                                <label className="label">specialization:</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={editProfile.specialization}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
>>>>>>> 5c0c4db39f3814b38d76fedc9d70a66f1c1c224e
                    )}
                </div>

                {/* Save Button */}
                <button className="save-button" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;
