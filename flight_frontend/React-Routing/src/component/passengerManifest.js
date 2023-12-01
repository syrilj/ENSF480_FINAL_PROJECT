import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PassengerManifest = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/bookings/admin');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Admin Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>{booking.name} - {booking.flightno}</li>
                ))}
            </ul>
        </div>
    );
};

export default PassengerManifest;
