package com.devrev.flightticketbooking.model;

import java.util.List;

// Define a strategy interface
interface SeatMapStrategy {
    List<String> generateSeatMap(int numberOfSeats);
}
