import React, { useState, useContext } from 'react';
import "./Auth.css"; // Move the CSS to a separate file for better organization.
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Authlogin = () => {
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
      
      const userId = data.user._id;
      // console.log('Extracted userId:', userId);
      console.log(data.user._id);
      if (userId) {
      const admin = await fetch(`http://localhost:5000/api/admins/${userId}`); 
      const admindata = await admin.json();
      auth.login(data.user._id,admindata.admin.adminName,admindata.admin._id);
      console.log('Login successful:', admindata);
      navigate("/admin");
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
      console.log(error);
      // setErrorMessage("Login failed! please fill correct Credentials");
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
        

        <button type="submit">Login</button>
        <div className="links">
          <NavLink to="/forgot-password">Forgot Password?</NavLink> | <NavLink to="/register">Create Account</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Authlogin;
