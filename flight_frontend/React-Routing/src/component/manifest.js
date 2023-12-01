import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const AdminManifest = () => {
    const [adminBookingList, setAdminBookingList] = useState([]);
    const [error, setError] = useState(null);

    const fetchAdminBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/admin/admin_manifest');
            setAdminBookingList(response.data);
            setError(null);
        } catch (error) {
            setError(error.response ? error.response.data : 'Error retrieving admin bookings.');
            setAdminBookingList([]);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', marginTop: '20px' }}>
            <Typography variant="h3" gutterBottom>
                Browse Passenger List
            </Typography>
            <Button variant="contained" color="primary" onClick={fetchAdminBookings}>
                Fetch Passenger Manifest
            </Button>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {adminBookingList.length > 0 && (
                <div>
                    <Typography variant="h6" gutterBottom>
                        Passenger List
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Seat No</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell>Booking Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {adminBookingList.map((booking, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{booking.p_name}</TableCell>
                                        <TableCell>{booking.p_seatno}</TableCell>
                                        <TableCell>{booking.p_status}</TableCell>
                                        <TableCell>{booking.p_class}</TableCell>
                                        <TableCell>{booking.p_bookingdate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </Paper>
    );
};

export default AdminManifest;
