import React, { useState, useContext } from 'react';
import "./Auth.css"; // Move the CSS to a separate file for better organization.
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");

  // State to hold email, password, and user type (Doctor or Patient)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient"); // Default to 'patient'

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username":email,
          "password":password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if(userType == "patient"){
      const userId = data.user._id;
      // console.log('Extracted userId:', userId);
      
      if (userId) {
      const patient = await fetch(`http://localhost:5000/api/patients/${userId}`); 
      const patientdata = await patient.json();
      auth.login(data.user._id,patientdata.patient.patientName,patientdata.patient._id);
      console.log('Login successful:', patientdata);
      }
      navigate("/patient");
      }else if(userType == "receptionist"){
        // console.log(":hghghghghhg");
        const userId = data.user._id;
        // console.log(userId);
        if (userId) {
          // console.log(":hiiiiiiiiii");
          const receptionist = await fetch(`http://localhost:5000/api/receptionists/${userId}`); 
          // console.log(receptionist);
          const receptionistdata = await receptionist.json();
          // console.log(receptionistdata);
          auth.login(data.user._id,receptionistdata.receptionist.receptionistName ,receptionistdata.receptionist._id);
          console.log('Login successful:', receptionistdata);
          // console.log(receptionistdata.receptionist._id);
          }
        navigate("/receptionist");
      }else {
        const userId = data.user._id;
        if (userId) {
          const doctor = await fetch(`http://localhost:5000/api/doctors/${userId}`); 
          const doctordata = await doctor.json();
          auth.login(data.user._id,doctordata.doctor.docName,doctordata.doctor._id);
          console.log('Login successful:', doctordata);
          console.log(doctordata.doctor._id);
          }
        navigate("/doc");
      }
      
      if (response.ok) {
        // Handle success, e.g., store the token, redirect, etc.
        console.log('Login successful:', data);
        // console.log('Login successful:', patientdata);
        
      } else {
        // Handle error
        console.log(data.message || 'Login failed');
      }
      
    } catch (error) {
      setErrorMessage("Login failed! please fill correct Credentials");
    }
    // Add login logic here (e.g., Firebase authentication or other login service)
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User Type:", userType); // Log the selected user type
    
  };

  return (
    <div className="login-container">
      <h2>{isLoginMode ? "Signup" : "Login"}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Radio buttons for user type selection */}
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="doctor"
              checked={userType === "doctor"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Doctor
          </label>
          <label>
            <input
              type="radio"
              value="patient"
              checked={userType === "patient"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Patient
          </label>
          <label>
            <input
              type="radio"
              value="receptionist"
              checked={userType === "receptionist"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Receptionist
          </label>
          
        </div>

        <button type="submit">Login</button>
        <div className="links">
          <NavLink to="/forgot-password">Forgot Password?</NavLink> | <NavLink to="/register">Create Account</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Auth;
