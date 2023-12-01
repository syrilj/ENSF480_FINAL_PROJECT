import React, { useState } from 'react';
import FlightService from './FlightService'; // Import your FlightService

function SearchFlights() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [deptDate, setDeptDate] = useState('');
  const [flights, setFlights] = useState([]);

  const handleSearch = async () => {
    try {
      console.log('Searching for flights:', from, to, deptDate);
      const flights = await FlightService.searchFlights(from, to, deptDate);
      console.log('Received flights:', flights);
      setFlights(flights);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div>
      <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From" />
      <input value={to} onChange={e => setTo(e.target.value)} placeholder="To" />
      <input value={deptDate} onChange={e => setDeptDate(e.target.value)} placeholder="Departure Date" />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.id}>
              <td>{flight.name}</td>
              <td>{flight.description}</td>
              <td>
                <button onClick={() => FlightService.bookFlight(flight.id)}>Book this flight</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchFlights;