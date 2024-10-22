import logo from './logo.svg';
import './App.css';
import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Auth from "./user/pages/Auth";

import Dashboard from "./user/pages/Dashboard";


import { AuthContext } from "./shared/context/auth-context";
import PatientAppointment from './appointment/pages/Appointment';
import Register from './user/pages/register';
import PatientDashboard from './patient/pages/PatientDashboard';
import DocAppointment from './appointment/Docpages/DocAppointment';
import MakeAppointment from './appointment/pages/MakeAppointment';
import Doctor from './doctor/pages/Doctor';
import Patient from './patient/pages/Patient';

import Profile_Doc from './user/pages/Profile_Doc';
import Profile_Pat from './patient/pages/Profile_Pat';
import Profile_Recep from './Receptionist/pages/Profile_Recep'
import Profile_Admin from './admin/pages/Profile_Admin'

import ReceptionistDashboard from './Receptionist/pages/ReceptionistDashboard';

import Hospital from './hospital/pages/Hospital';

import PatientList from './admin/pages/PatientList';
import DoctorList from './admin/pages/DoctorList';
import ReceptionistList from './admin/pages/ReceptionistList';

import ReceptionistAppointmentTable from './Receptionist/pages/ReceptionistAppointmentTable';

import ProfileEdit_pat from './patient/pages/ProfileEdit_pat';
import ProfileEdit_recep from './Receptionist/pages/ProfileEdit_recep';
import ProfileEdit_Doc from './user/pages/ProfileEdit_Doc';

import AdminDashboard from './admin/pages/AdminDashboard';
import MedicalHistory from './appointment/pages/MedicalHistory';
import HospitalList from './admin/pages/HospitalList';
import Authlogin from './admin/pages/Auth';

import DoctorAppointmentHistory from './user/pages/AppointmentHistory';
import ReviewPage from './shared/ReviewPage';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState('');
  const [roleId, setRoleId] = useState('');

  const login = useCallback((uid,username,roleid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    // console.log(uid);
    // console.log(username);
    setUsername(username);
    setRoleId(roleid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/doc" element={<Dashboard />} />
        <Route path="/patient/appointment" element={<PatientAppointment />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doc/appointment" element={<DocAppointment />} />
        <Route path="/patient/makeappo" element={<MakeAppointment />} />
        <Route path="/patient/doctor" element={<Doctor />} />
        <Route path="/doc/patient" element={<Patient />} />
        <Route path="/patient/profile" element={<Profile_Pat />} />
        <Route path="/doc/profile" element={<Profile_Doc />} />
        <Route path="/doc/History" element={< DoctorAppointmentHistory/>} />
        <Route path="/receptionist/profile" element={<Profile_Recep />} />
        <Route path="/admin/profile" element={<Profile_Admin />} />
        <Route path="/patient/hospital" element={<Hospital />} />
        <Route path="/receptionist" element={<ReceptionistDashboard/>}/>
        <Route path="/receptionist/appointments" element={<ReceptionistAppointmentTable/>}/>
        <Route path="/patient/profile/edit-profile" element={<ProfileEdit_pat />} />
        <Route path="/doc/profile/edit-profile" element={<ProfileEdit_Doc />} />
        <Route path="/receptionist/profile/edit-profile" element={<ProfileEdit_recep />} />
        <Route path="/patient/medicalhistory/" element={<MedicalHistory/>}/>
        {/* <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="/admin" element={<AdminDashboard/>}/>
           <Route path="/admin/doctors" element={<DoctorList/>}/>
           <Route path="/admin/hospitals" element={<HospitalList/>}/>
           <Route path="/admin/receptionists" element={<ReceptionistList/>}/>
           <Route path="/admin/patients" element={<PatientList/>}/>
           <Route path=" /reviews" element={<ReviewPage/>}/>
          
      </Routes>
    );
  } else {
    routes = (
      <Routes>
           <Route path="/" element={<Auth />} />
           {/* <Route path="/auth" element={<Auth />} /> */}
           <Route path="/register" element={<Register />} />

{/* for testing  */}
           <Route path="/receptionist" element={<ReceptionistDashboard/>}/>
           <Route path="/receptionist/profile" element={<Profile_Recep />} />
           <Route path="receptionist/profile/edit-profile" element={<ProfileEdit_recep />} />
           {/* <Route path="/receptionist/appointments" element={</>}/> */}
           
           {/* <Route path="/admin" element={<AdminDashboard/>}/> */}
            <Route path="/admin" element={<Authlogin/>}/>
           {/* <Route path="/admin/doctors" element={<DoctorList/>}/>
           <Route path="/admin/hospitals" element={<HospitalList/>}/>
           <Route path="/admin/receptionists" element={<ReceptionistList/>}/>
           <Route path="/admin/patients" element={<PatientList/>}/> */} 
           {/* <Route path="/:userId/places" element={<UserPlaces />} />
           <Route path="/auth" element={<Auth />} />
           <Route path="*" element={<Navigate to="/auth" />} /> */}
         </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userid:userId, roleid:roleId, username:username, login: login, logout: logout }}
    >
      <Router>
      
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};



export default App;
