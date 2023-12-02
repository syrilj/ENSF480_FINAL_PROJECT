import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import {
    Button,
    TextField,
    Typography,
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
    const [pnr, setPnr] = useState('');
    const [pName, setPName] = useState('');
    const [pClass, setPClass] = useState('');
    const [flightNo, setFlightNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        console.log("Initializing EmailJS with User ID:", 's7TbZMeWWJU0mXJ7U'); // Replace with your Email.js user ID
        emailjs.init('s7TbZMeWWJU0mXJ7U'); // Replace with your Email.js user ID
    }, []);

    const handleCancelBooking = async () => {
        try {
            setLoading(true);

            // Validate the presence of required fields
            if (!pnr || !pName || !pClass || !flightNo) {
                setError('Please provide all required information.');
                return;
            }

            const response = await axios.post('http://localhost:8081/api/user/cancel_ticket', {
                pnr: pnr,
                p_name: pName,
                p_class: pClass,
                flightno: flightNo,
            });

            if (response.status === 200) {
                setMessage('Booking has been successfully cancelled');
                sendEmailConfirmation();
            } else {
                setError('Failed to cancel the booking');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const sendEmailConfirmation = async () => {
        try {
            await emailjs.send('service_ai83hic', 'template_wmpcm7h', {
                to_email: email,
                from_name: '480 Flights',
                message: `Your flight with PNR ${pnr} has been canceled.`,
            });
            setMessage('Email confirmation sent successfully.');
        } catch (error) {
            setError('Error sending email confirmation.');
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Flight Cancellation
                    </Typography>

                    <TextField
                        label="Enter PNR"
                        variant="outlined"
                        fullWidth
                        value={pnr}
                        onChange={(e) => setPnr(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Enter Passenger Name"
                        variant="outlined"
                        fullWidth
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Enter Class"
                        variant="outlined"
                        fullWidth
                        value={pClass}
                        onChange={(e) => setPClass(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Enter Flight Number"
                        variant="outlined"
                        fullWidth
                        value={flightNo}
                        onChange={(e) => setFlightNo(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="Enter Email for Confirmation"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCancelBooking}
                        disabled={loading}
                        style={{ backgroundColor: '#424242', marginTop: 10 }}
                    >
                        {loading ? 'Cancelling...' : 'Cancel Booking'}
                    </Button>

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
