import React, { useEffect, useState } from 'react';

import { getAdmins, addAdmin, updateAdmin, deleteAdmin ,mockAdmins} from '../../api/adminService';

import './AdminFormComp.css'
const AdminForm = ({ admin, onClose }) => {
  const [formData, setFormData] = useState({
    adminName: '',
    adminEmail: '',
    adminContact: '',
    adminAddress: {
      cityVillage: '',
      pincode: '',
      state: '',
      country: '',
      streetOrSociety: ''
    },
    user: ''
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        ...admin,
        adminAddress: admin.adminAddress || { cityVillage: '', pincode: '', state: '', country: '', streetOrSociety: '' }
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("adminAddress.")) {
      const addressField = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        adminAddress: { ...prevData.adminAddress, [addressField]: value }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (admin._id) {
        await updateAdmin(admin._id, formData);
      } else {
        await createAdmin(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{admin._id ? 'Edit Admin' : 'Add Admin'}</h2>
      <input
        type="text"
        name="adminName"
        value={formData.adminName}
        onChange={handleChange}
        placeholder="Admin Name"
        required
      />
      <input
        type="email"
        name="adminEmail"
        value={formData.adminEmail}
        onChange={handleChange}
        placeholder="Admin Email"
        required
      />
      <input
        type="text"
        name="adminContact"
        value={formData.adminContact}
        onChange={handleChange}
        placeholder="Admin Contact"
        required
      />
      {/* Address Fields */}
      <input
        type="text"
        name="adminAddress.cityVillage"
        value={formData.adminAddress.cityVillage}
        onChange={handleChange}
        placeholder="City/Village"
        required
      />
      <input
        type="number"
        name="adminAddress.pincode"
        value={formData.adminAddress.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        required
      />
      <input
        type="text"
        name="adminAddress.state"
        value={formData.adminAddress.state}
        onChange={handleChange}
        placeholder="State"
        required
      />
      <input
        type="text"
        name="adminAddress.country"
        value={formData.adminAddress.country}
        onChange={handleChange}
        placeholder="Country"
        required
      />
      <input
        type="text"
        name="adminAddress.streetOrSociety"
        value={formData.adminAddress.streetOrSociety}
        onChange={handleChange}
        placeholder="Street/Society"
        required
      />
      <button type="submit">{admin._id ? 'Update' : 'Create'} Admin</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AdminForm;
