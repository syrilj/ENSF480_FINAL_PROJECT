import axios from 'axios';

class FlightService {
  async searchFlights(from, to, deptDate) {
    const response = await axios.post('http://localhost:8081/api/user/user_search_flight', { from, to, deptDate });
    return response.data;
  }

  async bookFlight(flightId) {
    const response = await axios.post('http://localhost:8081//api/user/user_book_flight', { flightId });
    return response.data;
  }
}

export default new FlightService();