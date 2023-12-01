import React, {useEffect, useState} from 'react';
import {NavLink, Route} from 'react-router-dom';
import AddFlight from "./AddFlight";
import EditFlight from "./EditFlight";
import DeleteFlight from "./DeleteFlight";
import AdminDashboard from "./admindashboard";

function Navbar() {
    // Use useEffect to log changes in isAuthenticated prop
    const [isAuthenticated, setIsAuthenticated,isAdmin] = useAuthentication();

    useEffect(() => {
        console.log('Navbar - isAuthenticated changed:', isAuthenticated);
        // Additional logic or updates based on isAuthenticated
    }, [isAuthenticated]);

    return (
        <nav className="flex items-center justify-between px-4 py-2 border-b shadow-lg">
            <div className="text-lg font-bold">
                <NavLink to="/">480- Software Principles</NavLink>
            </div>
            <div className="md:hidden text-gray-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                </svg>
            </div>
            <ul className="hidden md:flex space-x-2">
                <li>
                    <NavLink to="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Home</NavLink>
                </li>
                
                {isAuthenticated && !isAdmin && (
                    <>

                        <li>
                            <NavLink to="/seatmap" className="px-4 py-2 text-gray-700 hover:bg-gray-100">SeatMap</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cancelflight" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Cancel Flight</NavLink>
                        </li>

                     
                        <li>
                            <NavLink to="/payment" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Payment</NavLink>
                        </li>
                        <li>
                            <NavLink to="/SearchFlight" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Search Flight</NavLink>
                        </li>
                        <li>
                            <NavLink to="/bookflight" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Book Flight</NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</NavLink>
                        </li>
                    </>
                )}
    
                {isAdmin && (
                    <>

                        <li>
                            <NavLink to="/admindashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Admin Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/userbookings" className="px-4 py-2 text-gray-700 hover:bg-gray-100">User Bookings</NavLink>
                        </li>
                        <li>
                            <NavLink to="/manifest" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Manifest</NavLink>
                        </li>
                        <li>
                            <NavLink to="/editflight" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Edit Flight</NavLink>
                        </li>
                        <li>
                            <NavLink to="/deleteflight" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Delete Flight</NavLink>
                        </li>
                        <li>
                            <NavLink to="/addflight" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Add Flight</NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</NavLink>
                        </li>
                    </>
                )}
    
                {!isAuthenticated && !isAdmin && (
                    <>
                        <li>
                            <NavLink to="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Signup</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
function useAuthentication() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('userData') !== null
    );
    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem('adminData') !== null
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(localStorage.getItem('userData') !== null);
            setIsAdmin(localStorage.getItem('adminData') !== null);
        };

        // Check authentication status every second
        const intervalId = setInterval(handleStorageChange, 1000);

        // Cleanup function
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return [isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin];
}
export default Navbar;
