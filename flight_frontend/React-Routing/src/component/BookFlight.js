import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from '@material-ui/core';
import {useNavigate} from "react-router-dom";

function FlightDetailsInput({ name, value, onChange }) {
    return (
        <div>
            <label>{name}:</label>
            <input type="text" name={name} value={value} onChange={onChange} />
        </div>
    );
}

function BookFlight() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [userData, setUserData] = useState(null);
    const [flightNumber, setFlightNumber] = useState('');
    const [selectedFlightData, setSelectedFlightData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        const storedSelectedFlightData = localStorage.getItem('selectedFlight');

        if (storedUserData && storedSelectedFlightData) {
            setUserData(JSON.parse(storedUserData));
            setSelectedFlightData(JSON.parse(storedSelectedFlightData));
            setFlightNumber(JSON.parse(storedSelectedFlightData).flightno);
        }
    }, []);

    const handleSubmit = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const flightData = JSON.parse(localStorage.getItem('selectedFlight'));

            const { selectedSeat } = flightData;

            if (selectedSeat) {
                const { seat, section, b_seat_price, c_seat_price, e_seat_price } = selectedSeat;

                console.log('Selected Seat Info:');
                console.log('Seat Number:', seat);
                console.log('Section:', section);
                console.log('Business Class Seat Price:', b_seat_price);
                console.log('First Class Seat Price:', c_seat_price);
                console.log('Economy Class Seat Price:', e_seat_price);
            } else {
                console.log('Selected seat not found in the flightData.');
            }

            const generateUniquePNR = () => {
                const userPart = userData.u_name.substring(0, 2).toUpperCase();
                const flightPart = flightNumber.substring(0, 2).toUpperCase();
                const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');

                return `${userPart}${flightPart}${randomDigits}`;
            };

            const uniquePNR = generateUniquePNR();

            const response = await axios.post(
                'http://localhost:8081/api/user/user_book_flight',
                {
                    p_fno: flightNumber,
                    p_from: flightData.from,
                    p_to: flightData.to,
                    p_dedate: flightData.dept_date,
                    p_ardate: flightData.arr_date,
                    p_detime: flightData.dept_time,
                    p_artime: flightData.arr_time,
                    p_status: flightData.status,
                    p_name: userData.u_name,
                    p_seatno: selectedSeat.seat,
                    p_sex: userData.p_sex,
                    p_class: selectedSeat.section,
                    pnr: uniquePNR,
                    p_email: userData.p_email,
                    cost: "1000",
                }
            );

            console.log('Response:', response);

            if (response.status === 200) {
                const updatedSelectedFlight = {
                    ...flightData,
                    pnr: uniquePNR,
                    cost: response.data
                };

                localStorage.setItem('selectedFlight', JSON.stringify(updatedSelectedFlight));
                setTotalCost(response.data);
                console.log(updatedSelectedFlight)
            } else {
                console.log(response.data);
                setErrorMessage(response.data);
            }
        } catch (error) {
            setErrorMessage('An error occurred while processing your request. Please try again.');
            console.error('Error:', error);
            // ... (rest of your existing error handling code)
        }
    };

    const handleContinueToPayment = () => {

        navigate("/Payment");
        console.log('Continue to Payment clicked!');
    };

    return (
        <div>
            <h1>Flight Booking</h1>

            <FlightDetailsInput
                name="Flight Number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Book Flight
            </Button>

            {errorMessage && <Typography style={{ color: 'red' }}>{errorMessage}</Typography>}
            {totalCost && <Typography>Total Cost: {totalCost}</Typography>}

            {totalCost && (
                <Button variant="contained" color="primary" onClick={handleContinueToPayment}>
                    Continue to Payment
                </Button>
            )}
        </div>
    );
}

export default BookFlight;
