import React, { useState, useContext, useEffect } from 'react';
import "./Auth.css"; // Move the CSS to a separate file for better organization.
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");

  // Fetch hospitals when component loads
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hospitals'); // Your API endpoint for hospitals
        const data = await response.json();
        setHospitals(data.hospitals); // Assuming your backend returns an array under 'hospitals'
      } catch (error) {
        console.log("Failed to fetch hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
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
      const userId = data.user._id;

      if (userType === "patient") {
        const patient = await fetch(`http://localhost:5000/api/patients/${userId}`);
        const patientData = await patient.json();
        auth.login(data.user._id, patientData.patient.patientName, patientData.patient._id);
        navigate("/patient");
      } else if (userType === "receptionist") {
        // if (selectedHospital) {
          const receptionistResponse = await fetch(`http://localhost:5000/api/receptionists/${userId}`);
          const receptionistData = await receptionistResponse.json();

          // Check if the selected hospital matches the hospital associated with the receptionist
          // const receptionistHospital = receptionistData.receptionist.hospital; // Assuming 'hospital' contains the hospital ID

          // if (receptionistHospital !== selectedHospital) {
          //   setErrorMessage("Selected hospital is not associated with this receptionist.");
          //   return;
          // }

          // Proceed with login if the hospital matches
          auth.login(data.user._id, receptionistData.receptionist.receptionistName, receptionistData.receptionist._id);
          navigate("/receptionist");
        // } else {
        //   setErrorMessage("Please select a hospital");
        // }
      } else if (userType === "doctor") {
        // if (selectedHospital) {
          const doctor = await fetch(`http://localhost:5000/api/doctors/${userId}`);
          const doctorData = await doctor.json();
          
          // Check if the selected hospital matches the hospital associated with the doctor
          // const doctorHospitals = doctorData.doctor.hospital; // Assuming 'hospital' is an array of associated hospital IDs

          // if (!doctorHospitals.includes(selectedHospital)) {
          //   setErrorMessage("Selected hospital is not associated with this doctor.");
          //   return;
          // }

          // Proceed with login if the hospital matches
          auth.login(data.user._id, doctorData.doctor.docName, doctorData.doctor._id);
          navigate("/doc");
        //  }
        //  else {
        //   setErrorMessage("Please select a hospital");
        // }
      }

      if (!response.ok) {
        console.log(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage("Login failed! Please fill in the correct credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>{isLoginMode ? "Signup" : "Login"}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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

        {/* Dropdown for hospital selection (visible when "Receptionist" or "Doctor" is selected) */}
        {/* {(userType === "receptionist" || userType === "doctor") && (
          <div className="hospital-dropdown">
            <label htmlFor="hospital-select">Select Hospital:</label>
            <select
              id="hospital-select"
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              required
            >
              <option value="">-- Select a hospital --</option>
              {hospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.Hos_Name} - {hospital.hosaddress.cityvillage}
                </option>
              ))}
            </select>
          </div>
        )} */}

        <button type="submit">Login</button>
        <div className="links">
          | <NavLink to="/register">Create Account</NavLink> |
        </div>
      </form>
    </div>
  );
};

export default Auth;
