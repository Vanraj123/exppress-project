import React, { useState } from 'react';
import "./Auth.css"; // Move the CSS to a separate file for better organization.
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("patient"); // Default role is patient
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": email,
          "password": password,
        }),
      });

      const data = await response.json();
      const use = data.user._id;
      if(role == "patient")
      {
        const response = await fetch('http://localhost:5000/api/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "patientName": fullname,
            "patientEmail": email,
            "patientContact":phonenumber,
            "user":use,
          }),
        });
  
        const data = await response.json();
      }else
      {
        const response = await fetch('http://localhost:5000/api/doctors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "docName": fullname,
            "docEmail": email,
            "docContact":phonenumber,
            "user":use,
          }),
        });
  
        const data = await response.json();
      }
      if (response.ok) {
        console.log("User registered successfully:", data);
        navigate('/'); // Redirect to the login page or dashboard after registration
      } else {
        console.error("Registration error:", data.message);
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Error during registration");
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
        
        {/* Radio buttons for selecting Doctor or Patient */}
        <div className="role-selection">
          <label>
            <input
              type="radio"
              value="patient"
              checked={role === "patient"}
              onChange={(e) => setRole(e.target.value)}
            />
            Patient
          </label>
          <label>
            <input
              type="radio"
              value="doctor"
              checked={role === "doctor"}
              onChange={(e) => setRole(e.target.value)}
            />
            Doctor
          </label>
        </div>
        
        <button type="submit">Register</button>
        <div className="links">
          <NavLink to="/">Already have an Account? Login</NavLink> 
        </div>
      </form>
    </div>
  );
};

export default Register;
