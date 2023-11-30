import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    // Use useEffect to log changes in isAuthenticated prop
    const [isAuthenticated, setIsAuthenticated] = useAuthentication();

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
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavLink to="/seatmap" className="px-4 py-2 text-gray-700 hover:bg-gray-100">SeatMap</NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</NavLink>
                        </li>
                    </>
                ) : (
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

    // You can include additional authentication logic here if needed

    return [isAuthenticated, setIsAuthenticated];
}
export default Navbar;
