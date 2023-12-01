import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Select,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Container,
    Paper,
} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createTheme({
    palette: {
        type: 'dark',
    },
});

const FlightCancellation = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    const [flightBookings, setFlightBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingBookings, setFetchingBookings] = useState(false);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        const fetchUserBookings = async (pnr) => {
            try {
                const response = await axios.get(`http://localhost:8081/api/user/user_bookings?pnr=${pnr}`);
                console.log('User Bookings Response:', response.data);
                setFlightBookings(response.data);
            } catch (error) {
                console.error('Error fetching user bookings:', error);
                setError('Error fetching user bookings. Please try again.');
            } finally {
                setFetchingBookings(false);
            }
        };


        if (userData && userData.u_pnr) {
            setFetchingBookings(true);
            fetchUserBookings(userData.u_pnr);
        }
    }, [userData]);

    const handleBookingSelect = (selectedPnr) => {
        const selectedBooking = flightBookings.find((booking) => booking.pnr === selectedPnr);
        setSelectedBooking(selectedBooking);
    };

    const handleCancelBooking = async () => {
        if (!selectedBooking) {
            setError('Please select a booking to cancel');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8081/api/user/cancel_ticket', {
                pnr: selectedBooking.pnr,

            });

            if (response.status === 200) {
                setMessage('Booking has been successfully cancelled');
                setSelectedBooking(null);
            } else {
                setError('Failed to cancel the booking');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Flight Cancellation
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        User: {userData ? userData.u_username : 'Not logged in'}
                    </Typography>

                    {fetchingBookings ? (
                        <Typography variant="body1" align="center" gutterBottom>
                            Loading user bookings...
                        </Typography>
                    ) : (
                        <>
                            {flightBookings.length > 0 && (
                                <div style={{ marginBottom: 20 }}>
                                    <Typography variant="body1" align="center" gutterBottom>
                                        Choose a booking to view details:
                                    </Typography>
                                    <FormControl fullWidth>
                                        <InputLabel id="booking-select-label">Select a Booking</InputLabel>
                                        <Select
                                            labelId="booking-select-label"
                                            value={selectedBooking ? selectedBooking.pnr : ''}
                                            onChange={(e) => handleBookingSelect(e.target.value)}
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Select a Booking</em>
                                            </MenuItem>
                                            {flightBookings.map((booking) => (
                                                <MenuItem key={booking.pnr} value={booking.pnr}>
                                                    {booking.pnr}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}

                            {selectedBooking && (
                                <div style={{ marginBottom: 20 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Booking Details
                                    </Typography>
                                    {/* Display other booking details here */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleCancelBooking}
                                        disabled={loading}
                                        style={{ backgroundColor: '#424242', marginTop: 10 }}
                                    >
                                        Cancel Booking
                                    </Button>
                                </div>
                            )}
                        </>
                    )}

                    {error && (
                        <Typography variant="body1" style={{ color: 'red' }} align="center" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    {message && (
                        <Typography variant="body1" align="center" gutterBottom>
                            {message}
                        </Typography>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default FlightCancellation;
