import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Typography, TextField, Button } from "@material-ui/core";

const UserBookings = () => {
    const [pnr, setPnr] = useState('');
    const [bookingList, setBookingList] = useState([]);
    const [error, setError] = useState(null);

    const fetchUserBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/user/user_bookings?pnr=${pnr}`);
            setBookingList(response.data);
            setError(null);
        } catch (error) {
            setError(error.response ? error.response.data : 'Error retrieving user bookings.');
            setBookingList([]);
        }
    };

    const handleInputChange = (event) => {
        setPnr(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchUserBookings();
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                User Bookings
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <TextField
                    label="Enter PNR"
                    variant="outlined"
                    fullWidth
                    value={pnr}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Fetch Bookings
                </Button>
            </form>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {bookingList.length > 0 && (
                <div>
                    <Typography variant="h6" gutterBottom>
                        Passenger List
                    </Typography>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', margin: 'auto' }}>
                        <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Name</th>
                            <th style={{ textAlign: 'center' }}>Seat No</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                            <th style={{ textAlign: 'center' }}>Class</th>
                            <th style={{ textAlign: 'center' }}>Booking Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookingList.map((passenger, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{passenger.p_name}</td>
                                <td style={{ textAlign: 'center' }}>{passenger.p_seatno}</td>
                                <td style={{ textAlign: 'center' }}>{passenger.p_status}</td>
                                <td style={{ textAlign: 'center' }}>{passenger.p_class}</td>
                                <td style={{ textAlign: 'center' }}>{passenger.p_bookingdate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Paper>
    );
};

export default UserBookings;
