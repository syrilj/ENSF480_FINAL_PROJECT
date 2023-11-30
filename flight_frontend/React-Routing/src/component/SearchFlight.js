import React, { useState } from 'react';

const FlightSearchPage = () => {
  const cities = ['Calgary', 'Vancouver', 'Los Angeles', 'New York'];

  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform the flight search logic based on the selected options
    console.log('Departure City:', departureCity);
    console.log('Destination City:', destinationCity);
    console.log('Departure Date:', departureDate);
    console.log('Arrival Date:', arrivalDate);
    // Implement your flight search logic or send the selected options to a backend API
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Flight Search</h2>

      <form onSubmit={handleSearch} className="mx-auto max-w-md">
        <div className="mb-4">
          <label htmlFor="departureCity" className="block mb-2 text-sm font-semibold text-gray-700">
            Departure City
          </label>
          <select
            id="departureCity"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          >
            <option value="">Select Departure City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="destinationCity" className="block mb-2 text-sm font-semibold text-gray-700">
            Destination City
          </label>
          <select
            id="destinationCity"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
          >
            <option value="">Select Destination City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="departureDate" className="block mb-2 text-sm font-semibold text-gray-700">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="arrivalDate" className="block mb-2 text-sm font-semibold text-gray-700">
            Arrival Date
          </label>
          <input
            type="date"
            id="arrivalDate"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};

export default FlightSearchPage;
