// auth.js
import { useState } from 'react';

export const useAuthentication = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('userData') !== null
    );

    const checkAuthentication = () => {
        const isAuthenticated = localStorage.getItem('userData') !== null;
        setIsAuthenticated(isAuthenticated);
        return isAuthenticated;
    };

    return { isAuthenticated, checkAuthentication, setIsAuthenticated };
};
