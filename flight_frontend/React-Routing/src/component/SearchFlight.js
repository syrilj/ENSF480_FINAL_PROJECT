import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  const navigate = useNavigate();

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
      localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
      console.log("Selected Flight:", selectedFlight);
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
      <Grid container spacing={4} justify="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Search Flights
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      fullWidth
                      label="Departure Date"
                      type="date"
                      id="dept_date"
                      name="dept_date"
                      value={flightSearchForm.dept_date}
                      onChange={handleChange}
                      required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      fullWidth
                  >
                    {loading ? <CircularProgress size={24} /> : "Search Flights"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        {searchResults.length > 0 && (
            <Grid item xs={12} sm={8}>
              <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Flight Number</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Departure Date</TableCell>
                        <TableCell>Action</TableCell>
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
              </Paper>
            </Grid>
        )}
        {error && (
            <Grid item xs={12} sm={8}>
              <Typography variant="body2" align="center" style={{ color: "red" }}>
                {error}
              </Typography>
            </Grid>
        )}
      </Grid>
  );
};

export default SearchFlights;
