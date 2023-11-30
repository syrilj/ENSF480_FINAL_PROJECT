import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthentication } from './component/auth';
import SeatMap from "./component/SeatMap";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import Logout from "./component/Logout";
import Login from "./component/Login";
import SignUpForm from "./component/Signup";
import Payment from "./component/Payment";
import SearchFlight from "./component/SearchFlight.js";

function App() {
    const { isAuthenticated, checkAuthentication, setIsAuthenticated } = useAuthentication();
    const [forceRerender, setForceRerender] = useState(false);

    useEffect(() => {
        // This effect will run whenever isAuthenticated changes
        setForceRerender(prev => !prev);
    }, [isAuthenticated]);

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/seatmap"
                    element={isAuthenticated ? <SeatMap /> : <Navigate to="/login" />}
                />

                <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />

                <Route
                    path="/login"
                    element={<Login checkAuthentication={checkAuthentication} />}
                />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/SearchFlight" element={<SearchFlight />} />
            </Routes>
        </>
    );
}

export default App;
