import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingConfirmationPage = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [userData, setUserData] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        const selectedFlightData = localStorage.getItem('selectedFlight');

        if (storedUserData && selectedFlightData) {
            setUserData(JSON.parse(storedUserData));
            const flightData = JSON.parse(selectedFlightData);
            setFlightNumber(flightData.flightno);
        }
    }, []);

    const handleSeatSelection = async (e) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const flightData = JSON.parse(localStorage.getItem('selectedFlight'));

            if (!userData) {
                console.error('User data not available.');
                return;
            }

            console.log('Username:', userData.u_name);
            console.log('selectedflight',flightData)

            const response = await axios.post('http://localhost:8081/api/user/user_book_flight', {
                pnr: flightNumber, // Assuming "pnr" is the correct field name expected by the server
                username: userData.u_name,
            });

            console.log(response.data);

            // Set the booking details in the state for display
            setBookingDetails(response.data);

            // Reset selected seat after successful selection (if needed)
        } catch (error) {
            console.error('Error selecting seat:', error);
        }
    };

    return (
        <div>
            <h1>Booking Confirmation</h1>
            <p>Flight Number: {flightNumber}</p>

            {userData && <p>User Name: {userData.u_name}</p>}

            <button onClick={handleSeatSelection}>Confirm Booking</button>

            {bookingDetails && (
                <div>
                    <h2>Booking Details</h2>
                    <p>Passenger Name: {bookingDetails.PassengerName}</p>
                    <p>Flight No: {bookingDetails.FlightNo}</p>
                    <p>From: {bookingDetails.From}</p>
                    <p>To: {bookingDetails.To}</p>
                    {/* Add other booking details as needed */}
                </div>
            )}
        </div>
    );
};

export default BookingConfirmationPage;
