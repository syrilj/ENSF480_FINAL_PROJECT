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
import AdminLogin from "./component/adminlogin"; // Import AdminLogin component
import AdminDashboard from './component/admindashboard.js';
import SearchResults from "./component/SearchResults";
import AddFlight from "./component/AddFlight";
import EditFlight from "./component/EditFlight";
import DeleteFlight from "./component/DeleteFlight";
import CancelFlight from "./component/cancelFlight";
import UserBookings from "./component/UserBookings";
import Manifest from "./component/manifest";
import BookFlight from "./component/BookFlight";
// Import AdminDashboard component
// import AdminDashboard from "./component/AdminDashboard";

function App() {
    const { isAuthenticated, checkAuthentication, setIsAuthenticated } = useAuthentication();
    const [forceRerender, setForceRerender] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Add state for admin

    useEffect(() => {
        // This effect will run whenever isAuthenticated changes
        setForceRerender(prev => !prev);
    }, [isAuthenticated]);

    useEffect(() => {
        // Check if user is admin
        const adminData = localStorage.getItem('adminData');
        if (adminData) {
            setIsAdmin(true);
        }
    }, []);

    return (
        <>
            <Navbar isAdmin={isAdmin} />

            <Routes>
                <Route path="/" element={<Home />} />
               
                <Route path="/seatmap" element={<SeatMap />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/SearchFlight" element={<SearchFlight />} />
                <Route path="/searchResults" component={SearchResults} />
                <Route path="/cancelflight" element={<CancelFlight />} />
                <Route path ="/bookflight" element={<BookFlight />} />


                <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />

                <Route
                    path="/login"
                    element={<Login checkAuthentication={checkAuthentication} />}
                />
                <Route path="/signup" element={<SignUpForm />} />

                <Route path="/adminlogin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
                {isAdmin && (
                    <>
                        <Route path="/addflight" element={<AddFlight />} />
                        <Route path="/editflight" element={<EditFlight />} />
                        <Route path="/deleteflight" element={<DeleteFlight />} />
                        <Route path="/userbookings" element={<UserBookings />} />
                        <Route path="/manifest" element={<Manifest />} />
                        <Route path="/admindashboard" element={<AdminDashboard />} />

                    </>

                )}
            </Routes>
        </>
    );
}

export default App;