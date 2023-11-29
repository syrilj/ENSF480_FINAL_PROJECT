import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUpForm from './component/Signup';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from './component/Login';
import SeatMap from './component/SeatMap';

//import AdminDashboard from './component/AdminDashboard'; // Add your AdminDashboard component import

function App() {
    // Assuming isAuthenticated is a state variable representing user authentication status
    const isAuthenticated = false; // Set this to true for authenticated users
    const isAdmin = false; // Set this to true for admin users

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                {isAuthenticated ? (
                    <>
                        {/* Routes accessible only to authenticated users */}
                        <Route path="/seatmap" element={<SeatMap />} />
                        {/*{isAdmin && <Route path="/admin" element={<AdminDashboard />} />}*/}
                    </>
                ) : (
                    <>
                        {/* Routes accessible to non-authenticated users */}

                        <Route path="/seatmap" element={<SeatMap />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUpForm />} />
                    </>
                )}
            </Routes>
        </>
    );
}

export default App;
