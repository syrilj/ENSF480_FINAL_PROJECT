import React, { useState } from 'react';
import axios from 'axios';

const EditFlight = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [flightDetails, setFlightDetails] = useState({
        flightno: "",
        from: "",
        to: "",
        dept_date: "",
        arr_date: "",
        dept_time: "",
        arr_time: "",
        e_seats_left: 0,
        c_seats_left: 0,
        b_seats_left: 0,
        e_seat_price: 0.0,
        c_seat_price: 0.0,
        b_seat_price: 0.0,
        flight_company: "",
        status: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightDetails({ ...flightDetails, [name]: value });
    };

    const onSubmitFlightNumber = async (e) => {
        e.preventDefault();
        // Fetch flight details based on the provided flight number
        try {
            const response = await axios.get(`http://localhost:8081/api/admin/edit_flight_details?flightno=${flightNumber}`);
            setFlightDetails(response.data);
            setError(null);
        } catch (error) {
            setError('Flight not found');
        }
    };

    const onSubmitFlightDetails = async (e) => {
        e.preventDefault();
        // Update flight details if any fields other than flight number are changed
        try {
            const response = await axios.post(`http://localhost:8081/api/admin/edit_flight_details?flightno=${flightNumber}`, flightDetails);

            if (response.status === 200) {
                setSuccessMessage('Flight Updated!');
                setError(null);
            } else {
                setSuccessMessage('');
                setError('Unable to update flight.');
            }
        } catch (error) {
            setSuccessMessage('');
            setError('Error during update. Please try again.');
            console.error('Error during update:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 'bold' }}>Edit Flight</h2>
                <div style={{ height: '20px' }}></div>
            </div>
            <form onSubmit={onSubmitFlightNumber}>
                <label htmlFor="flightno">Flight Number: </label>
                <input
                    type="text"
                    id="flightno"
                    name="flightno"
                    placeholder="FL100"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                />
                <button
                    className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                    Fetch Flight
                </button>
            </form>

            {flightDetails.flightno && (
                <form onSubmit={onSubmitFlightDetails}>
                    <label htmlFor="from">From: </label>
                    <input
                        type="text"
                        id="from"
                        name="from"
                        value={flightDetails.from || ''}
                        onChange={handleChange}
                    />
                    <label htmlFor="to">To: </label>
                    <input
                        type="text"
                        id="to"
                        name="to"
                        value={flightDetails.to || ''}
                        onChange={handleChange}
                    />

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="dept_date">Departure Date: </label>
                            <input
                                type="date"
                                id="dept_date"
                                name="dept_date"
                                value={flightDetails.dept_date || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="arr_date">Arrival Date: </label>
                            <input
                                type="date"
                                id="arr_date"
                                name="arr_date"
                                value={flightDetails.arr_date || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '52px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="dept_time">Departure Time: </label>
                            <input
                                type="time"
                                id="dept_time"
                                name="dept_time"
                                value={flightDetails.dept_time || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="arr_time">Arrival Time: </label>
                            <input
                                type="time"
                                id="arr_time"
                                name="arr_time"
                                value={flightDetails.arr_time || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="e_seats_left">Ordinary Seats Left: </label>
                            <input
                                type="number"
                                id="e_seats_left"
                                name="e_seats_left"
                                value={flightDetails.e_seats_left || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="c_seats_left">Comfort Seats Left: </label>
                            <input
                                type="number"
                                id="c_seats_left"
                                name="c_seats_left"
                                value={flightDetails.c_seats_left || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="b_seats_left">Business Seats Left: </label>
                            <input
                                type="number"
                                id="b_seats_left"
                                name="b_seats_left"
                                value={flightDetails.b_seats_left || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="e_seat_price">Ordinary Seat Price: </label>
                            <input
                                type="number"
                                id="e_seat_price"
                                name="e_seat_price"
                                value={flightDetails.e_seat_price || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="c_seat_price">Comfort Seat Price: </label>
                            <input
                                type="number"
                                id="c_seat_price"
                                name="c_seat_price"
                                value={flightDetails.c_seat_price || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                            <label htmlFor="b_seat_price">Business Seat Price: </label>
                            <input
                                type="number"
                                id="b_seat_price"
                                name="b_seat_price"
                                value={flightDetails.b_seat_price || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <label htmlFor="flight_company">Flight Company: </label>
                    <input
                        type="text"
                        id="flight_company"
                        name="flight_company"
                        value={flightDetails.flight_company || ''}
                        onChange={handleChange}
                    />

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <label htmlFor="status">Status: </label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={flightDetails.status || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                        Update Flight
                    </button>
                </form>
            )}

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
export default EditFlight;