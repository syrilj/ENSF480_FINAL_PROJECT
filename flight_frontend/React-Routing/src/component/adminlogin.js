import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setIsAdmin }) => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { username, password } = formData;
    const [error, setError] = useState("");

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/admin/admin_login', formData);

            if (response.data.status === 'success') {
                // Admin authenticated successfully
                // Store admin data in localStorage or context
                localStorage.setItem('adminData', JSON.stringify(response.data.data));
                setIsAdmin(true);
                // Redirect to admin dashboard or update state
                navigate("/"); // Redirect to admin dashboard on successful login
            } else {
                // Handle error
                setError(response.data.message);
            }
        } catch (err) {
            // Handle error
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onInputChange}
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default AdminLogin;