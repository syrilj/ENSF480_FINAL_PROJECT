package com.devrev.flightticketbooking.model;

import java.util.ArrayList;
import java.util.List;

class ComfortSeatMapStrategy implements SeatMapStrategy {
    @Override
    public List<String> generateSeatMap(int numberOfSeats) {
        List<String> seatMap = new ArrayList<>();
        for (int i = 0; i < numberOfSeats; i++) {
            seatMap.add("Comfort");
        }
        return seatMap;
    }
}
