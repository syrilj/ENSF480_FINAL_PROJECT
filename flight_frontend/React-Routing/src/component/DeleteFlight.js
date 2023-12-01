import React, { useState } from 'react';
import axios from 'axios';

const DeleteFlight = () => {
    const [flightNo, setFlightNo] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const deleteFlight = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/api/admin/delete_flight_details?flightno=${flightNo}`);

            if (response.status === 200) {
                setMessage('Flight details deleted successfully');
                setError('');
            } else {
                setMessage('');
                setError('Failed to delete flight details');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('');
            setError('Server Error. Please check the console for details.');
        }
    };

    const handleInputChange = (event) => {
        setFlightNo(event.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 'bold' }}>Delete Flight</h2>
                <div style={{ height: '20px' }}></div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label htmlFor="flightNumber" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Flight Number:
                    <input
                        type="text"
                        id="flightNumber"
                        placeholder="FL100"
                        value={flightNo}
                        onChange={handleInputChange}
                    />
                </label>
                <button
                    className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={deleteFlight}
                >
                    Delete Flight
                </button>
            </div>

            {/* Display Success or Error Messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DeleteFlight;