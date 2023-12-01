import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const SearchFlights = ({ onSelectFlight }) => {
  const [flightSearchForm, setFlightSearchForm] = useState({
    from: "",
    to: "",
    dept_date: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const locations = ["Calgary", "Vancouver", "New York", "Los Angeles"];
  const navigate = useNavigate(); // Move useNavigate outside of the event handler

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
          "http://localhost:8081/api/user/user_search_flight",
          flightSearchForm
      );

      if (response.status === 200) {
        setSearchResults(response.data);
        setError("");
      } else {
        setSearchResults([]);
        setError("Unable to fetch flights. Please try again.");
      }
    } catch (error) {
      setSearchResults([]);
      setError(`Error during search: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFlight = (selectedFlight) => {
    try {
      // Store the selected flight in local storage
      localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
      console.log("Selected Flight:", selectedFlight);

      // Navigate to the seat map page
      // Replace the following line with your actual navigation logic
      // For example, you can use react-router-dom or window.location.href
      // For demonstration purposes, I'm using a console.log statement
      navigate("/seatmap");

      console.log("Navigating to Seat Map Page...");
    } catch (error) {
      console.error("Error while handling selected flight:", error);
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
          <FormControl>
            <InputLabel htmlFor="from">From</InputLabel>
            <Select
                label="From"
                id="from"
                name="from"
                value={flightSearchForm.from}
                onChange={handleChange}
                required
            >
              {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="to">To</InputLabel>
            <Select
                label="To"
                id="to"
                name="to"
                value={flightSearchForm.to}
                onChange={handleChange}
                required
            >
              {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
              label="Departure Date"
              type="date"
              id="dept_date"
              name="dept_date"
              value={flightSearchForm.dept_date}
              onChange={handleChange}
              required
          />

          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Search Flights"}
          </Button>
        </form>

        {/* Display Search Results */}
        {searchResults.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Flight Number</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Departure Date</TableCell>
                    <TableCell>Action</TableCell> {/* New column for the action button */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((flight) => (
                      <TableRow key={flight.id}>
                        <TableCell>{flight.flightno}</TableCell>
                        <TableCell>{flight.from}</TableCell>
                        <TableCell>{flight.to}</TableCell>
                        <TableCell>{flight.dept_date}</TableCell>
                        <TableCell>
                          <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleSelectFlight(flight)}
                          >
                            Select Flight
                          </Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}

        {/* Display Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
  );
};

export default SearchFlights;
