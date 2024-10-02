import React from 'react';
import './Hospital.css'
const HospitalCard = ({ imgSrc, Hos_Name, E_Date, ManageBy, hosaddress }) => {
  return (
    <div className="hospital-card">
      <img src={imgSrc} alt={`${Hos_Name} Image`} />
      <div className="hospital-details">
        <h3>{Hos_Name}</h3>
        <p>Established: {new Date(E_Date).toDateString()}</p>
        <p>Managed By: {ManageBy}</p>
        <p>Address: {`${hosaddress.streetOrSociety}, ${hosaddress.cityvillage}, ${hosaddress.state}, ${hosaddress.country}, ${hosaddress.pincode}`}</p>
      </div>
    </div>
  );
};

export default HospitalCard;
