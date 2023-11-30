import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button, withStyles } from '@material-ui/core';
import {useLocation} from "react-router-dom";

const styles = (theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: '#f5f5f5',
        borderRadius: '15px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: 'auto',
    },
    form: {
        marginBottom: theme.spacing(2),
        textAlign: 'center',
    },
    sectionPaper: {
        marginBottom: theme.spacing(3),
        borderRadius: '15px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    },
    sectionHeader: {
        background: theme.palette.primary.main,
        color: '#fff',
        padding: theme.spacing(2),
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
    },
    seatGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
        gap: '10px',
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
    },
    seat: {
        width: '30px',
        height: '30px',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        textAlign: 'center',
        lineHeight: '30px',
        cursor: 'pointer',
    },
    priceContainer: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        borderRadius: '0 0 15px 15px',
    },
});

const SeatMap = ({ classes }) => {
    const [flightNumber, setFlightNumber] = useState('');
    const [seatData, setSeatData] = useState({
        seatMap: [],
        seatPrices: {},
    });
    const [selectedSeat, setSelectedSeat] = useState(null);

    const fetchSeatData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/user/flight_seat_map/${flightNumber}`);
            setSeatData(response.data);
        } catch (error) {
            console.error('Error fetching seat data:', error);
            setSeatData({ seatMap: [], seatPrices: {} });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchSeatData();
    };

    const handleSeatClick = (section, seat) => {
        setSelectedSeat({ section, seat });
    };
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleSeatSelection = async (e) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                console.error('User data not available.');
                return;
            }

            console.log('Username:', userData.u_name);
            console.log('Selected Seat:', selectedSeat)



            const response = await axios.post('http://localhost:8081/api/user/selectseat', {
                p_pnr: flightNumber,
                p_name: userData.u_name,
                p_seatno: selectedSeat.seat,
            });

            console.log(response.data); // Handle response as needed

            // Reset selected seat after successful selection
            setSelectedSeat(null);
        } catch (error) {
            console.error('Error selecting seat:', error);
        }
    };


    const renderSeatMap = () => {
        const { seatMap, seatPrices } = seatData;

        if (!seatMap.length || !seatPrices) {
            return <Typography variant="body1">No seat data available.</Typography>;
        }

        const sections = ['Business', 'Comfort', 'Ordinary'];

        const getSectionColor = (sectionType) => {
            switch (sectionType) {
                case 'Business':
                    return '#FFD700'; // Gold
                case 'Comfort':
                    return '#87CEEB'; // Sky Blue
                case 'Ordinary':
                    return '#98FB98'; // Pale Green
                default:
                    return '#FFF'; // Default White
            }
        };

        return (
            <div className={classes.root}>
                <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Flight Seat Map - {flightNumber}
                </Typography>
                {sections.map((sectionType, index) => (
                    <Paper key={index} className={classes.sectionPaper}>
                        <Typography variant="h5" className={classes.sectionHeader} style={{ backgroundColor: getSectionColor(sectionType) }}>
                            {sectionType}
                        </Typography>
                        <div className={classes.seatGrid} style={{ backgroundColor: getSectionColor(sectionType) }}>
                            {Array.from({ length: seatMap[index] }).map((_, seatIndex) => (
                                <div
                                    key={seatIndex}
                                    className={classes.seat}
                                    onClick={() => handleSeatClick(sectionType, seatIndex + 1)}
                                    style={{
                                        backgroundColor:
                                            selectedSeat && selectedSeat.section === sectionType && selectedSeat.seat === seatIndex + 1 ? 'red' : '#ddd',
                                    }}
                                >
                                    {seatIndex + 1}
                                </div>
                            ))}
                        </div>
                        <div className={classes.priceContainer}>
                            <Typography variant="body1">{`Price: ${seatPrices[sectionType]}`}</Typography>
                        </div>
                    </Paper>
                ))}
            </div>
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    label="Enter Flight Number"
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    required
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Fetch Seat Map
                </Button>
            </form>
            {flightNumber && renderSeatMap()}

            {selectedSeat && (
                <form onSubmit={handleSeatSelection} className={classes.form}>
                    <Typography variant="h5" style={{ marginTop: '20px' }}>
                        Selected Seat: {selectedSeat.section} - {selectedSeat.seat}
                    </Typography>
                    <Button variant="contained" color="primary" type="submit">
                        Confirm Seat Selection
                    </Button>
                </form>
            )}
        </div>
    );
};

export default withStyles(styles)(SeatMap);
