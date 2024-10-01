import React from 'react';
import axios from 'axios';

const AppointmentCard = ({ id, title, date, time, patient, doctor,roleof, onDelete }) => {
  // Function to handle the appointment deletion
  const handleDelete = async () => {
    try {
      // Make a delete request to your backend API
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      
      // Notify the parent component about the deletion
      onDelete(id);
    } catch (error) {
      console.error('Failed to delete the appointment:', error);
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-details">
        <div>
          <h3>{title}</h3>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
        </div> 
        <div>
          <p>Patient: {patient}</p>
          <p>Doctor: {doctor}</p>
        </div>
      </div>
      {(roleof != "MedicalHistory") && <button className="btn-cancel" onClick={handleDelete}>Cancel</button> }
    </div>
  );
}

export default AppointmentCard;
