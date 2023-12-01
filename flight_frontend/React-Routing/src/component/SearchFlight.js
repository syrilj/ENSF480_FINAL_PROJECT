import React, { useState } from "react";
import axios from "axios";

const SearchFlights = () => {
  const [flightSearchForm, setFlightSearchForm] = useState({
    from: "",
    to: "",
    dept_date: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8081/api/user/user_search_flight", flightSearchForm);

      if (response.status === 200) {
        setSearchResults(response.data);
        setError("");
        console.log(response.data);
      } else {
        setSearchResults([]);
        setError("Unable to fetch flights. Please try again.");
      }
    } catch (error) {
      setSearchResults([]);
      setError(`Error during search: ${error.message}`);
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFlightSearchForm({
      ...flightSearchForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="from">From: </label>
        <input
          type="text"
          id="from"
          name="from"
          value={flightSearchForm.from}
          onChange={handleChange}
          required
        />

        <label htmlFor="to">To: </label>
        <input
          type="text"
          id="to"
          name="to"
          value={flightSearchForm.to}
          onChange={handleChange}
          required
        />

        <label htmlFor="dept_date">Departure Date: </label>
        <input
          type="date"
          id="dept_date"
          name="dept_date"
          value={flightSearchForm.dept_date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching Flights..." : "Search Flights"}
        </button>
      </form>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((flight) => (
              <li key={flight.flightId}>
                {/* Display flight details as needed */}
                {flight.flightno}, {flight.from} to {flight.to}, {flight.dept_date}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SearchFlights;
