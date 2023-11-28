import React, { useState } from 'react';
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
    <section className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize dark:text-white lg:text-4xl">
          Sign Up for 480 Flight Assistance
        </h1>

        <div className="mt-8 w-full max-w-md mx-auto">
          <form
            onSubmit={onSubmit}
            className="px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:shadow-black/50"
          >
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm text-black dark:text-black">
                Full Name
              </label>
              <input
                type="text"
                name="u_name"
                value={formData.u_name}
                onChange={onInputChange}
                placeholder="John Doe"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2 text-sm text-black dark:text-black">
                Gender
              </label>
              <input
                type="text"
                name="u_gender"
                value={formData.u_gender}
                onChange={onInputChange}
                placeholder="Male/Female/Other"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-sm text-black dark:text-black">
                Address
              </label>
              <input
                type="text"
                name="u_address"
                value={formData.u_address}
                onChange={onInputChange}
                placeholder="123 Main St, City, Country"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-black dark:text-black">
                Email address
              </label>
              <input
                type="email"
                name="u_email_id"
                value={formData.u_email_id}
                onChange={onInputChange}
                placeholder="johndoe@example.com"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label htmlFor="contact" className="block mb-2 text-sm text-black dark:text-black">
                Contact Number
              </label>
              <input
                type="tel"
                name="u_contact"
                value={formData.u_contact}
                onChange={onInputChange}
                placeholder="(555) 123-4567"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm text-black dark:text-black">
                Username
              </label>
              <input
                type="text"
                name="u_username"
                value={formData.u_username}
                onChange={onInputChange}
                placeholder="johndoe123"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm text-black dark:text-black">
                Password
              </label>
              <input
                type="password"
                name="u_password"
                value={formData.u_password}
                onChange={onInputChange}
                placeholder="********"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            {/* Success and Error Messages */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
