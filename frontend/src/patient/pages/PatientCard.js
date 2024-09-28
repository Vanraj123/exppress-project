import React from 'react';

const PatientCard = ({ patient }) => {
  const address = patient.patientAddress || {}; // Safeguard against undefined address
  const {
    streetOrSociety = 'N/A', // Default value if undefined
    cityOrVillage = 'N/A',
    state = 'N/A',
    country = 'N/A',
    pincode = 'N/A',
  } = address;

  return (
    <div className="patient-card">
      <img src={patient.image || 'default.jpg'} alt={patient.patientName} />
      <div className="patient-details">
        <h3>{patient.patientName}</h3>
        {/* <p>Condition: {patient.condition || 'N/A'}</p> */}
        <p>Email: {patient.patientEmail}</p>
        <p>Phone: {patient.patientContact}</p>
        <p>Address: {streetOrSociety}, {cityOrVillage}, {state}, {country}, {pincode}</p>
      </div>
    </div>
  );
};

export default PatientCard;
