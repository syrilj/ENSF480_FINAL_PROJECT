import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function FlightDetailsInput({ name, value, onChange }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>{name}:</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                readOnly
                style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '200px',
                }}
            />
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
    const [travelInsurance, setTravelInsurance] = useState(false);

    const [promo, setPromo] = useState('');
    const promo_code = "promo100";

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

            // Calculate the cost based on the selected seat
            let cost = 1000;

            if (travelInsurance) {
                // Add 200 to the cost if travel insurance is selected
                cost += 200;
            }

            if (promo === promo_code){
                cost -= 100;
            }

            const response = await axios.post('http://localhost:8081/api/user/user_book_flight', {
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
                cost: cost.toString(), // Convert cost to string before sending
            });

            console.log('Response:', response);

            if (response.status === 200) {
                const updatedSelectedFlight = {
                    ...flightData,
                    pnr: uniquePNR,
                    cost: response.data,
                };

                localStorage.setItem('selectedFlight', JSON.stringify(updatedSelectedFlight));
                setTotalCost(response.data);
                console.log(updatedSelectedFlight);
            } else {
                console.log(response.data);
                setErrorMessage(response.data);
            }
        } catch (error) {
            setErrorMessage('An error occurred while processing your request. Please try again.');
            console.error('Error:', error);

        }
    };

    const handleContinueToPayment = () => {
        navigate('/Payment');
        console.log('Continue to Payment clicked!');
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
                Flight Booking
            </Typography>

            <FlightDetailsInput
                name="Flight Number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
            />

            {/* Add checkbox for travel insurance */}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={travelInsurance}
                        onChange={(e) => setTravelInsurance(e.target.checked)}
                        color="primary"
                    />
                }
                label="Add Travel Insurance ($200)"
                style={{ marginBottom: '20px' }}
            />

            <div>
                <label>
                    Input a Promo Code:
                </label>

                <input type="text" 
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder='Promo Code'>
                </input>
            </div>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginRight: '10px' }}
            >
                Book Flight
            </Button>

            {errorMessage && (
                <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>
                    {errorMessage}
                </Typography>
            )}
            {totalCost && (
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                     {totalCost}
                </Typography>
            )}

            {totalCost && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleContinueToPayment}
                    style={{ marginTop: '20px' }}
                >
                    Continue to Payment
                </Button>
            )}
        </div>
    );
}

export default BookFlight;
