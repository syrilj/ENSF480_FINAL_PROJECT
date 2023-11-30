import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// ... (previous imports)

// ... (previous imports)

const FlightSearchPage = () => {
  const cities = ['Calgary', 'Vancouver', 'Los Angeles', 'New York'];

  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = `http://localhost:8081/api/user/user_search_flight/${departureCity}/${destinationCity}/${departureDate}`;
      const response = await axios.get(url);

      // Assuming you want the first object in the response array
      const data = response.data[0];

      // Extracting relevant data
      const {
        from,
        to,
        dept_date,
        arr_date,
        dept_time,
        arr_time,
        e_seats_left,
        e_seat_price,
        b_seats_left,
        b_seat_price,
        c_seats_left,
        c_seat_price,
      } = data;

      // Displaying relevant data
      console.log('From:', from);
      console.log('To:', to);
      console.log('Departure Date:', dept_date);
      console.log('Arrival Date:', arr_date);
      console.log('Departure Time:', dept_time);
      console.log('Arrival Time:', arr_time);
      console.log('Economy Seats Left:', e_seats_left);
      console.log('Economy Seat Price:', e_seat_price);
      console.log('Business Seats Left:', b_seats_left);
      console.log('Business Seat Price:', b_seat_price);
      console.log('First Class Seats Left:', c_seats_left);
      console.log('First Class Seat Price:', c_seat_price);

      setFlights(response.data);
      setError(null);
    } catch (error) {
      setFlights([]);
      setError('Error fetching flights. Please try again.');
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
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

          <button
              type="submit"
              className="mt-4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Search Flights
          </button>
        </form>

        {loading && <p>Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {flights.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Flight Results</h3>
              <table className="min-w-full bg-white border border-gray-300">
                {/* Your table code here */}
              </table>
            </div>
        )}

        {flights.length > 0 && (
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {flights.map((flight) => (
                  <Marker
                      key={flight.id}
                      position={[parseFloat(flight.from.lat), parseFloat(flight.from.lon)]}
                  >
                    <Popup>
                      Flight: {flight.flightno}<br />
                      Departure City: {flight.from_city}<br />
                      Arrival City: {flight.to_city}<br />
                      Departure Date: {flight.departure_date}
                    </Popup>
                  </Marker>
              ))}
            </MapContainer>
        )}
      </div>
  );
};

export default FlightSearchPage;


