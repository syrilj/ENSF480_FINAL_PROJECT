package com.flight.airline.model;

import java.util.List;

interface SeatMapStrategy {
    List<String> generateSeatMap(int numberOfSeats);
}
