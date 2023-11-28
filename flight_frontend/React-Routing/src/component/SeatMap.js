import React, { useState } from 'react';
import axios from 'axios';

const SeatMap = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [seatData, setSeatData] = useState({
        seatMap: [],
        seatPrices: {},
    });

    const fetchSeatData = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/flight_seat_map/${flightNumber}`);
            setSeatData(response.data);
        } catch (error) {
            console.error('Error fetching seat data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchSeatData();
    };

    const renderSeatMap = () => {
        const { seatMap, seatPrices } = seatData;

        return (
            <div>
                <h2>Flight Seat Map - {flightNumber}</h2>
                <table>
                    <tbody>
                    {seatMap.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((seat, seatIndex) => (
                                <td key={seatIndex}>
                                    <div>
                                        <span>{seat}</span>
                                        <br />
                                        <span>{seatPrices[seat]}</span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Flight Number:
                    <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Fetch Seat Map</button>
            </form>
            {flightNumber && renderSeatMap()}
        </div>
    );
};

export default SeatMap;
