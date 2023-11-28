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

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/api/user/user_login", formData);

            if (response.data.status === "success") {
                console.log("Login successful");
                navigate("/user_rights"); // Redirect to user_rights on successful login
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Error during login. Please try again!");
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Login</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="u_username"
                                value={u_username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="u_password"
                                value={u_password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                        <button type="submit" className="btn btn-outline-primary">
                            Login
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
