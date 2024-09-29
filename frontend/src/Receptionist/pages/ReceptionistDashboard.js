// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ReceptionistDashboard.css'; // Custom styles for this page
// import { NavLink } from 'react-router-dom';
// import Footer from '../../shared/Footer';

// const ReceptionistDashboard = () => {
//     const [pendingAppointments, setPendingAppointments] = useState([]);
//     const [confirmedAppointments, setConfirmedAppointments] = useState([]);
//     const [canceledAppointments, setCanceledAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const receptionistName = "Alice Brown"; // You can get this dynamically from context or state

//     // Fetch appointments on component load
//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 const response = await axios.get('/api/appointments'); // Adjust API endpoint as necessary
//                 const { pending, confirmed, canceled } = response.data; // Adjust based on your API response structure

//                 setPendingAppointments(pending);
//                 setConfirmedAppointments(confirmed);
//                 setCanceledAppointments(canceled);
//             } catch (err) {
//                 setError('Error fetching appointments.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAppointments();
//     }, []);

//     if (loading) return <p>Loading appointments...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <div className="header">
//                 <div className="logo">
//                     <h1>Reception App</h1>
//                 </div>
//                 <div className="welcome-message">
//                     <span>Welcome, {receptionistName}</span>
//                 </div>
//                 <div className="user-menu">
//                     <span>{receptionistName}</span> | <a href="#" style={{ color: 'white' }}>Logout</a>
//                 </div>
//             </div>
//             <div className="sidebar">
//                 <NavLink to="/receptionist/dashboard">Dashboard</NavLink>
//                 <NavLink to="/receptionist/appointments">Appointments</NavLink>
//                 <NavLink to="/receptionist/manage">Manage</NavLink>
//                 <NavLink to="/receptionist/profile">Profile</NavLink>
//                 <a href="#">Settings</a>
//             </div>
//             <div className="main">
//                 <h2>Dashboard</h2>
//                 <div className="stats">
//                     <div className="stat-card">
//                         <h3>Pending Appointments</h3>
//                         <p>{pendingAppointments.length}</p>
//                     </div>
//                     <div className="stat-card">
//                         <h3>Confirmed Appointments</h3>
//                         <p>{confirmedAppointments.length}</p>
//                     </div>
//                     <div className="stat-card">
//                         <h3>Canceled Appointments</h3>
//                         <p>{canceledAppointments.length}</p>
//                     </div>
//                 </div>
//                 <div className="card pending-appointments">
//                     <h3>Pending Appointments</h3>
//                     <ul>
//                         {pendingAppointments.map((appointment, index) => (
//                             <li key={index}>{appointment.time} - {appointment.patient}</li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="card confirmed-appointments">
//                     <h3>Confirmed Appointments</h3>
//                     <ul>
//                         {confirmedAppointments.map((appointment, index) => (
//                             <li key={index}>{appointment.time} - {appointment.patient}</li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="card canceled-appointments">
//                     <h3>Canceled Appointments</h3>
//                     <ul>
//                         {canceledAppointments.map((appointment, index) => (
//                             <li key={index}>{appointment.time} - {appointment.patient}</li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="card profile">
//                     <h3>Profile</h3>
//                     <p>Name: {receptionistName}</p>
//                     <p>Email: receptionist@example.com</p>
//                     <p>Phone: 123-456-7890</p>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default ReceptionistDashboard;

import React, { useState, useContext } from 'react';
import './ReceptionistDashboard.css'; // Custom styles for this page
import { NavLink, useLoaderData } from 'react-router-dom';
import Footer from '../../shared/Footer';
import Sidebar from './Sidebar';
import Header from '../../shared/Header';

const ReceptionistDashboard = () => {
    const receptionistName = "Alice Brown"; // You can get this dynamically from context or state
    const [appointment, setappointment] = useState("");
    const pendingAppointments = [
        { time: "9:00 AM", patient: "John Doe" ,doctor: "Dr.John Doe"},
        { time: "10:30 AM", patient: "Jane Smith",doctor: "Dr.John Doe" },
        { time: "1:00 PM", patient: "Michael Lee",doctor: "Dr.John Doe" }
    ];

    const useLoaderData = async() => {
    try {
        const hosId = "66b310f22787242ec946b79a";
        const response = await fetch(`http://localhost:5000/api/appointments/hos/${hosId}` , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        setappointment(data);
      //   auth.login();
        if (response.ok) {
          // Handle success, e.g., store the token, redirect, etc.
          console.log('Login successful:', data);
          // if(userType == "doctor"){
          //   navigate("/doc");
          // }else{
          //   navigate("/patient");
          // }
        } else {
          // Handle error
          console.log(data.message || 'Login failed');
        }
        
      } catch (error) {
        
      }
    }
    useLoaderData();
    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
          const ap_id = "66f91f8a19f38dec3aebcdfa";
          const response = await fetch(`http://localhost:5000/api/appointments/appo/${ap_id}` , {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = await response.json();
          
        //   auth.login();
          if (response.ok) {
            // Handle success, e.g., store the token, redirect, etc.
            console.log('Login successful:', data);
            // if(userType == "doctor"){
            //   navigate("/doc");
            // }else{
            //   navigate("/patient");
            // }
          } else {
            // Handle error
            console.log(data.message || 'Login failed');
          }
          
        } catch (error) {
          
        }
        // Add login logic here (e.g., Firebase authentication or other login service)
        // console.log("Email:", email);
        // console.log("Password:", password);
        // console.log("User Type:", userType); // Log the selected user type
        
      };
    
    // const confirmedAppointments = [
    //     { time: "11:00 AM", patient: "Sarah Connor" },
    //     { time: "2:00 PM", patient: "Bruce Wayne" },
    //     { time: "4:00 PM", patient: "Diana Prince" }
    // ];

    // const canceledAppointments = [
    //     { time: "3:00 PM", patient: "Peter Parker" },
    //     { time: "5:30 PM", patient: "Tony Stark" }
    // ];

    return (
        <div>
          <Header/>
            {/* <div className="header">
                <div className="logo">
                    <h1>Reception App</h1>
                </div>
                <div className="welcome-message">
                    <span>Welcome, {receptionistName}</span>
                </div>
                <div className="user-menu">
                    <span>{receptionistName}</span> | <a href="#" style={{ color: 'white' }}>Logout</a>
                </div>
            </div> */}
            {/* <div className="sidebar">
                <NavLink to="/receptionist/dashboard">Dashboard</NavLink>
                <NavLink to="/receptionist/appointments">Appointments</NavLink>
                <NavLink to="/receptionist/manage">Manage</NavLink>
                <NavLink to="/receptionist/profile">Profile</NavLink>
                <a href="#">Settings</a>
            </div> */}
            <Sidebar/>
            <div className="main-recep">
                <h2>Dashboard</h2>
                <div className="stats">
                    <div className="stat-card">
                        <h3>Pending Appointments</h3>
                        <p>{pendingAppointments.length}</p>
                    </div>
                    {/* <div className="stat-card">
                        <h3>Confirmed Appointments</h3>
                        <p>{confirmedAppointments.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Canceled Appointments</h3>
                        <p>{canceledAppointments.length}</p>
                    </div> */}
                </div>
                <h3>Pending Appointments</h3>
                <div className="card pending-appointments">
                    <ul>
                        {pendingAppointments.map((appointment, index) => (
                            <li key={index}>{appointment.doctor} - {appointment.time} - {appointment.patient}
                            <button className='confirm_app' type='submit' onClick={handleConfirm}>Confirm</button></li>
                        ))}
                    </ul>
                </div>
                {/* <div className="card confirmed-appointments">
                    <h3>Confirmed Appointments</h3>
                    <ul>
                        {confirmedAppointments.map((appointment, index) => (
                            <li key={index}>{appointment.time} - {appointment.patient}</li>
                        ))}
                    </ul>
                </div> */}
                {/* <div className="card canceled-appointments">
                    <h3>Canceled Appointments</h3>
                    <ul>
                        {canceledAppointments.map((appointment, index) => (
                            <li key={index}>{appointment.time} - {appointment.patient}</li>
                        ))}
                    </ul>
                </div> */}
            </div>
            {/* <Footer/>  */}
        </div>
    );
};

export default ReceptionistDashboard;
