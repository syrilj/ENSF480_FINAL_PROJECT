package com.devrev.flightticketbooking.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import com.devrev.flightticketbooking.model.Admin;
import com.devrev.flightticketbooking.model.Bookings;
import com.devrev.flightticketbooking.model.Flights;
import com.devrev.flightticketbooking.service.FlightService;
import com.devrev.flightticketbooking.service.LoginService;

// @SessionAttributes({ "admin" })
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    LoginService service;
    @Autowired
    FlightService fservice;

    Admin admindata;

    ArrayList<Bookings> Booking_list = new ArrayList<Bookings>();

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);
    ArrayList<Flights> Flight_list = new ArrayList<Flights>();

    @GetMapping("/")
    public ResponseEntity<String> showWelcomePage() {
        return ResponseEntity.ok("welcome");
    }


	@PostMapping("/admin_login")
	public ResponseEntity<Map<String, Object>> validateAdmin(@RequestBody Map<String, String> adminData) {
		String username = adminData.get("username");
		String password = adminData.get("password");

		Map<String, Object> response = new HashMap<>();

		if (service.validateAdmin(username, password)) {
			response.put("status", "success");
			response.put("message", "Admin authenticated successfully.");
			response.put("data", "admin_rights");
			return ResponseEntity.ok(response);
		} else {
			response.put("status", "error");
			response.put("message", "Wrong Credentials. Please try again.");
			response.put("data", null);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}




	@GetMapping("/admin_rights")
	public ResponseEntity<Admin> showAdminRights(Admin admin) {
		return ResponseEntity.ok(admin);
	}

	@GetMapping("/admin_edit_flight_details")
	public String showFlightDetailstoEdit(ModelMap model) {

		LOGGER.info("Start");
		model.addAttribute("Flight_list", fservice.getFlight_details());
		LOGGER.info("End");
		return "admin_edit_flight_details";
	}

	@GetMapping("/admin_add_flight")
	public String showAddFlightForm() {
		return "admin_add_flight";
	}

	@PostMapping("/admin_add_flight")
	public ResponseEntity<String> addFlightDetails(@RequestBody Map<String, String> flightDetails) {
		LOGGER.info("Start");
		fservice.addFlight(
				flightDetails.get("flightno"),
				flightDetails.get("from"),
				flightDetails.get("to"),
				flightDetails.get("dept_date"),
				flightDetails.get("arr_date"),
				flightDetails.get("dept_time"),
				flightDetails.get("arr_time"),
				Integer.parseInt(flightDetails.get("e_seats_left")),
				Integer.parseInt(flightDetails.get("c_seats_left")),  // Add Comfort class seats parameter
				Integer.parseInt(flightDetails.get("b_seats_left")),
				Float.parseFloat(flightDetails.get("e_seat_price")),
				Float.parseFloat(flightDetails.get("c_seat_price")),  // Add Comfort class price parameter
				Float.parseFloat(flightDetails.get("b_seat_price")),
				flightDetails.get("flight_company"),
				flightDetails.get("status")
		);
		LOGGER.info("End");

		return ResponseEntity.ok("Flight details added successfully");
	}


	@GetMapping("/edit_flight_details")
	public ResponseEntity<Flights> showEditFlightdetails(@RequestParam String flightno) {
		LOGGER.info("Start");

		Flights flight = fservice.getFlight(flightno);

		if (flight == null) {
			return ResponseEntity.notFound().build();
		}

		LOGGER.info("End");
		return ResponseEntity.ok(flight);
	}


	@PostMapping("/edit_flight_details")
	public ResponseEntity<String> modifyFlightDetails(@RequestParam String flightno, @RequestBody Flights flight,
													  BindingResult bindingResult) {
		LOGGER.info("Start");

		if (bindingResult.hasErrors()) {
			return ResponseEntity.badRequest().body("Invalid input. Please check your request.");
		}

		fservice.updateFlight(flight);

		LOGGER.info("End");
		return ResponseEntity.ok("Flight details updated successfully");
	}


	@GetMapping("/delete_flight_details")
	public ResponseEntity<String> showDeletingFlightDetail() {
		LOGGER.info("Start");

		// Additional logic related to showing details can be added here if needed

		LOGGER.info("End");
		return ResponseEntity.ok("Viewing details for deleting flight");
	}


	@PostMapping("/delete_flight_details")
	public ResponseEntity<String> deleteFlightDetails(@RequestParam String flightno) {
		LOGGER.info("Start");

		fservice.deleteFlight(flightno);

		LOGGER.info("End");
		return ResponseEntity.ok("Flight details deleted successfully");
	}



	@GetMapping("/admin_view_booking_details")
	public ResponseEntity<String> showSearchBookings() {
		LOGGER.info("Start");

		// Additional logic related to showing booking details can be added here if needed

		LOGGER.info("End");
		return ResponseEntity.ok("Viewing booking details as an admin");
	}


	@PostMapping("/admin_view_booking_details")
	public ResponseEntity<List<Bookings>> showBookings(@SessionAttribute("admin") Admin admin) throws ParseException {
		LOGGER.info("Start");

		List<Bookings> adminBookingList = fservice.getAdminBooking_details();

		LOGGER.info("End");
		return ResponseEntity.ok()
				.header("PassengerName", "Passenger Name")
				.header("FlightNo", "Flight Number")
				.header("From", "From")
				.header("To", "To")
				.header("DepartureDate", "Departure Date")
				.header("ArrivalDate", "Arrival Date")
				.header("DepartureTime", "Departure Time")
				.header("ArrivalTime", "Arrival Time")
				.header("Class", "Class")
				.header("SeatNumber", "Seat Number")
				.header("Action", "Action")
				.body(adminBookingList);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logoutAdmin(@SessionAttribute("admin") Admin admin, HttpSession session, SessionStatus status) {
		status.setComplete();
		session.removeAttribute("admin");
		return ResponseEntity.ok("Logout successful");
	}

	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<String> exceptionHandlerGeneric(HttpSession session) {
		session.invalidate();
		return ResponseEntity.status(401).body("Please login first.");
	}

//	@ModelAttribute("admin")
//	public Admin populateForm() {
//		return new Admin(); // populates form for the first time if its null
//	}

}