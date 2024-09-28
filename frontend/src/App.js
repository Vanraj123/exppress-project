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
        <Route path="/doc/doctor" element={<Doctor />} />
        <Route path="/doc/patient" element={<Patient />} />
        {/* <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
           <Route path="/" element={<Auth />} />
           {/* <Route path="/auth" element={<Auth />} /> */}
           <Route path="/register" element={<Register />} />
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
