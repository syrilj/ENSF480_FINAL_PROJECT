import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    u_name: "",
    u_gender: "",
    u_address: "",
    u_email_id: "",
    u_contact: "",
    u_username: "",
    u_password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/user/user_register", formData);

      if (response.status === 200) {
        setSuccessMessage("Your registration is successful. Use your credentials for login!");
        setError("");
      } else {
        setSuccessMessage("");
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setSuccessMessage("");
      setError("Error during registration. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="u_name" value={formData.u_name} onChange={onInputChange} required />
          </div>
          <div>
            <label>Gender:</label>
            <input type="text" name="u_gender" value={formData.u_gender} onChange={onInputChange} required />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="u_address" value={formData.u_address} onChange={onInputChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="u_email_id" value={formData.u_email_id} onChange={onInputChange} required />
          </div>
          <div>
            <label>Contact:</label>
            <input type="text" name="u_contact" value={formData.u_contact} onChange={onInputChange} required />
          </div>
          <div>
            <label>Username:</label>
            <input type="text" name="u_username" value={formData.u_username} onChange={onInputChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="u_password" value={formData.u_password} onChange={onInputChange} required />
          </div>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
  );
};

export default SignUpForm;
