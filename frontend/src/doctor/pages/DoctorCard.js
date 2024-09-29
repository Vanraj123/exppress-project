import React from 'react';

const DoctorCard = ({ doctor }) => {
  const defaultImage = 'https://img.freepik.com/free-photo/rendering-anime-doctor-job_23-2151151782.jpg'; // Replace with the path to your default image

  return (
    <div className="doctor-card">
      <img src={doctor.imgSrc || defaultImage} alt={`Dr. ${doctor.docName}`} />
      <div className="doctor-details">
        <h3>Dr. {doctor.docName}</h3>
        <p>Specialty: {doctor.docSpeciality}</p>
        <p>Email: {doctor.docEmail}</p>
        <p>Phone: {doctor.docContact}</p>
        <p>Qualification: {doctor.docQualification} from {doctor.docQualificationFrom}</p>
        <p>Gender: {doctor.docGender}</p>
        {/* <p>Address: {`${doctor.docAddress.streetOrSociety}, ${doctor.docAddress.cityOrVillage}, ${doctor.docAddress.state}, ${doctor.docAddress.country}, ${doctor.docAddress.pincode}`}</p> */}
      </div>
    </div>
  );
};

export default DoctorCard;
