
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        u_username: "",
        u_password: "",
    });

    const { u_username, u_password } = formData;
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/user/show_user_details", {
                params: {
                    username: u_username,
                    password: u_password,
                },
            });

            if (response.data) {
                setUserData(response.data);
                console.log(response.data);
            } else {
                setError("User details not found");
            }
        } catch (error) {
            setError("Error fetching user details");
            console.error("Error fetching user details:", error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/api/user/user_login", formData);

            if (response.data.status === "success") {
                console.log("Login successful");

                // Store user data in localStorage
                localStorage.setItem("userData", JSON.stringify(response.data.user));
                console.log(JSON.stringify(response.data.user));


                // Fetch and store user details
                await getUserDetails();

                navigate("/"); // Redirect to user_rights on successful login
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Error during login. Please try again!");
            console.error("Error during login:", error);
        }
    };








    return (
        <section className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-gray-800 capitalize dark:text-white lg:text-4xl">
                    Login
                </h2>

                <div className="mt-8 w-full max-w-md mx-auto">
                    <form onSubmit={(e) => onSubmit(e)} className="px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:shadow-black/50">
                        <div className="mb-3">
                            <label htmlFor="Username" className="block mb-2 text-sm text-black dark:text-black">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Enter your username"
                                name="u_username"
                                value={u_username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="block mb-2 text-sm text-black dark:text-black">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Enter your password"
                                name="u_password"
                                value={u_password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Login
                        </button>
                        <Link
                            className="w-full block px-6 py-3 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-400 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            to="/"
                        >
                            Cancel
                        </Link>
                        <Link
                            className="w-full block px-6 py-3 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-400 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            to="/Signup"
                        >
                            Sign Up
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
