import React, { useState, useEffect } from 'react';
import "./Auth.css"; // CSS file
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
  const [hospitals, setHospitals] = useState([]); // Initialize as an empty array
  const [selectedHospital, setSelectedHospital] = useState(""); // Store selected hospital

  // Fetch the list of hospitals from the backend when the component mounts
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hospitals');
        const data = await response.json();
        console.log(data);
        // Check if data is an array or if it contains hospitals inside an object
        if (Array.isArray(data)) {
          setHospitals(data); // Directly set the hospitals if it's an array
        } else if (data.hospitals && Array.isArray(data.hospitals)) {
          setHospitals(data.hospitals); // If hospitals are nested in an object
        } else {
          setHospitals([]); // Set empty array if data format is unexpected
        }

      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitals([]); // On error, ensure hospitals is set to an empty array
      }
    };

    fetchHospitals();
  }, []);

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
      const userId = data.user._id; // Get the user ID from the response

      let responseData;

      if (role === "patient") {
        responseData = await fetch('http://localhost:5000/api/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "patientName": fullname,
            "patientEmail": email,
            "patientContact": phonenumber,
            "user": userId,
          }),
        });
      } else if (role === "doctor") {
        responseData = await fetch('http://localhost:5000/api/doctors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "docName": fullname,
            "docEmail": email,
            "docContact": phonenumber,
            "user": userId,
            "hospital": selectedHospital, // Pass selected hospital for doctor
          }),
        });
      } else if (role === "receptionist") {
        responseData = await fetch('http://localhost:5000/api/receptionists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "receptionistName": fullname,
            "receptionistEmail": email,
            "receptionistContact": phonenumber,
            "user": userId,
            "hospital": selectedHospital, // Pass selected hospital for receptionist
          }),
        });
      }

      const finalData = await responseData.json();
      if (response.ok && finalData) {
        console.log("User registered successfully:", finalData);
        navigate('/'); // Redirect to login or dashboard after successful registration
      } else {
        console.error("Registration error:", finalData.message);
        setError(finalData.message || "Registration failed");
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
        
        {/* Radio buttons for selecting Doctor, Patient, or Receptionist */}
        <div className="radio-group">
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
          <label>
            <input
              type="radio"
              value="receptionist"
              checked={role === "receptionist"}
              onChange={(e) => setRole(e.target.value)}
            />
            Receptionist
          </label>
        </div>

        {/* Show hospital dropdown if role is doctor or receptionist */}
        {(role === "doctor" || role === "receptionist") && (
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.Hos_Name}
                </option>
              ))
            ) : (
              <option value="">No hospitals available</option>
            )}
          </select>
        )}
        
        <button type="submit">Register</button>
        <div className="links">
          <NavLink to="/">Already have an Account? Login</NavLink> 
        </div>
      </form>
    </div>
  );
};

export default Register;
