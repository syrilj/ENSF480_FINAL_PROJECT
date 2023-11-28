// Home.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = ({ userType }) => {
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    // Implement your search logic using the selected departure date, arrival date,
    // departure location, and destination
    console.log('Search logic goes here');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Flight Search</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Departure Date:</label>
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          dateFormat="yyyy-MM-dd"
          style={styles.datePicker}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Arrival Date:</label>
        <DatePicker
          selected={arrivalDate}
          onChange={(date) => setArrivalDate(date)}
          dateFormat="yyyy-MM-dd"
          style={styles.datePicker}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Departure From:</label>
        <input
          type="text"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          placeholder="Type departure location..."
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Type destination..."
          style={styles.input}
        />
      </div>
      <button style={styles.searchButton} onClick={handleSearch}>
        Search Flights
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
  },
  formGroup: {
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '1.2em',
    color: '#333',
    marginRight: '10px',
  },
  datePicker: {
    padding: '8px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px', // Added margin for spacing
  },
  input: {
    padding: '8px',
    fontSize: '1em',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px', // Added margin for spacing
  },
  searchButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
