package com.devrev.flightticketbooking.controller;

import java.sql.Date;
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
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.devrev.flightticketbooking.model.Bookings;
import com.devrev.flightticketbooking.model.Flights;
import com.devrev.flightticketbooking.model.User;
import com.devrev.flightticketbooking.service.FlightService;
import com.devrev.flightticketbooking.service.LoginService;

//@SessionAttributes({ "user" })
@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:3000")
public class UserController {

	@Autowired
	FlightService fservice;

	@Autowired
	LoginService service;

	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@GetMapping("/user_register")
	public String showRegisterationPage() {
		return "user_register";
	}

	@PostMapping("/user_register")
	public String addUserData(@RequestBody Map<String, String> userData) {
		String u_name = userData.get("u_name");
		String u_gender = userData.get("u_gender");
		String u_address = userData.get("u_address");
		String u_email_id = userData.get("u_email_id");
		String u_contact = userData.get("u_contact");
		String u_username = userData.get("u_username");
		String u_password = userData.get("u_password");
		LOGGER.info("Start");
		service.addUser(u_name, u_gender, u_address, u_email_id, u_contact, u_username, u_password);
		LOGGER.info("End");
		return "Your registration is successful. Use your credentials for login!";
	}

	@GetMapping("/user_login")
	public String showUserLogin() {
		return "user_login";
	}

	@PostMapping("/user_login")
	public ResponseEntity<Map<String, Object>> validateUser(@RequestBody Map<String, String> userData) {
		String u_username = userData.get("u_username");
		String u_password = userData.get("u_password");

		User user = fservice.getUserDetails(u_username, u_password);
		boolean isValidUser = user != null;

		Map<String, Object> response = new HashMap<>();

		if (isValidUser) {
			response.put("status", "success");
			response.put("message", "Login successful");
			response.put("user", user);
			return ResponseEntity.ok(response);
		} else {
			response.put("status", "error");
			response.put("message", "Wrong Credentials. Please try again!");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}



//	@ModelAttribute("user")
//	public User populateForm() {
//		return new User();
//	}

	@GetMapping("/user_rights")
	public ResponseEntity<User> showUserRights(User user) {
		return ResponseEntity.ok(user);
	}

//	@GetMapping("/user_search_flight")
//	public ResponseEntity<ArrayList<Flights>> showFlightsSearched(
//			@RequestParam String from,
//			@RequestParam String to,
//			@RequestParam String dept_date
//	) {
//		LOGGER.info("Start");
//		ArrayList<Flights> flights = fservice.getUserFlight_details(from, to, dept_date);
//		LOGGER.info("End");
//		return ResponseEntity.ok(flights);
//	}


	@GetMapping("/{flightNumber}")
	public ResponseEntity<Flights> getFlightDetails(@PathVariable String flightNumber) {
		Flights flight = fservice.getFlight(flightNumber);

		if (flight != null) {
			return ResponseEntity.ok(flight);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	@PostMapping("/user_search_flight")
	public ResponseEntity<ArrayList<Flights>> showFlightsSearched(@RequestBody Flights flightSearchForm) {
		LOGGER.info("Start");
		ArrayList<Flights> flights = fservice.getUserFlight_details(
				flightSearchForm.getFrom(),
				flightSearchForm.getTo(),
				flightSearchForm.getDept_date()
		);
		LOGGER.info("End");
		return ResponseEntity.ok(flights);
	}
	@GetMapping("/user_search_flight/{from}/{to}/{dept_date}")
	public ResponseEntity<ArrayList<Flights>> showFlightsSearched(
			@PathVariable String from,
			@PathVariable String to,
			@PathVariable String dept_date
	) {
		LOGGER.info("Start");
		ArrayList<Flights> flights = fservice.getUserFlight_details(from, to, dept_date);
		LOGGER.info("End");
		return ResponseEntity.ok(flights);
	}





	@GetMapping("/user_book_flight")
	public ResponseEntity<String> showBookingPage(@ModelAttribute("flight") Flights flight,
												User user) {
		return ResponseEntity.ok("user_book_flight");
	}

	@PostMapping("/user_book_flight")
	public ResponseEntity<String> addPassenger(@RequestBody Map<String, String> passengerData
											  ) {

		String p_fno = passengerData.get("p_fno");
		String p_from = passengerData.get("p_from");
		String p_to = passengerData.get("p_to");
		Date p_dedate = Date.valueOf(passengerData.get("p_dedate"));
		Date p_ardate = Date.valueOf(passengerData.get("p_ardate"));
		String p_detime = passengerData.get("p_detime");
		String p_artime = passengerData.get("p_artime");
		String p_status = passengerData.get("p_status");
		String p_name = passengerData.get("p_name");
		String p_age = passengerData.get("p_age");
		String p_sex = passengerData.get("p_sex");
		String p_class = passengerData.get("p_class");
		String pnr = passengerData.get("pnr");
		String p_email = passengerData.get("p_email");
		double cost = Double.parseDouble(passengerData.getOrDefault("cost", "0"));

		LOGGER.info("Start");

		double totalCost = fservice.addPassenger(p_fno, p_from, p_to, p_dedate, p_ardate, p_detime, p_artime, p_status,
				p_name, p_age, p_sex, p_class, pnr, p_email, cost);

		if (totalCost == 0) {
			return ResponseEntity.badRequest().body("Not enough seats left, please check the available seats");
		} else {
			return ResponseEntity.ok("Total cost: " + (cost + totalCost));
		}
	}

//does not work need fixing
	@GetMapping("/user_bookings")
	public ResponseEntity<?> showUserBookings(@RequestParam String pnr) {

		LOGGER.info("Start");

		try {
			List<Bookings> bookingList = fservice.getUserBooking_details(pnr);

			if (bookingList.isEmpty()) {
				LOGGER.info("No bookings found for user: {}", pnr);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No bookings found for the user: " + pnr);
			}

			LOGGER.info("End");
			return ResponseEntity.ok(bookingList);
		} catch (ParseException e) {
			LOGGER.error("Error parsing date in user bookings.", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user bookings.");
		}
	}


	@PostMapping("/user_bookings")
	public ResponseEntity<Map<String, Object>> showUserBookings(@RequestBody Map<String, String> bookingData) throws ParseException {
		LOGGER.info("Start");
		String pnr = bookingData.get("pnr");
		List<Bookings> bookingList = fservice.getUserBooking_details(pnr);

		Map<String, Object> response = new HashMap<>();
		response.put("Booking_list", bookingList);
		response.put("pnr", pnr);

		// Dynamically add details for each booking in the response
		for (Bookings booking : bookingList) {
			response.put("PassengerName", booking.getP_name());
			response.put("FlightNo", booking.getP_fno());
			response.put("From", booking.getP_from());
			response.put("To", booking.getP_to());
			response.put("DepartureDate", booking.getP_dedate());
			response.put("ArrivalDate", booking.getP_ardate());
			response.put("DepartureTime", booking.getP_detime());
			response.put("ArrivalTime", booking.getP_artime());
			response.put("Class", booking.getP_class());
			response.put("SeatNumber", booking.getP_seatno());
			response.put("Action", booking.getP_status());
		}

		LOGGER.info("End");
		return ResponseEntity.ok(response);
	}

	@GetMapping("/cancel_ticket")
	public ResponseEntity<String> showCancelBooking(@RequestParam String username) {
		return ResponseEntity.ok("cancel_ticket");
	}

	@PostMapping("/cancel_ticket")
	public ResponseEntity<String> cancelUserBookings(@RequestBody Map<String, String> bookingData) throws ParseException {
		LOGGER.info("Start");
		String pnr = bookingData.get("pnr");
		String p_name = bookingData.get("p_name");
		String p_class = bookingData.get("p_class");
		String flightno = bookingData.get("flightno");
		fservice.cancelBooking(p_name, pnr, p_class, flightno);
		LOGGER.info("End");
		return ResponseEntity.ok("Airticket has been successfully cancelled");
	}
	@GetMapping("/show_user_details")
	public ResponseEntity<User> showUserDetails(@RequestParam String username, @RequestParam String password) {
		LOGGER.info("Start");
		User user = fservice.getUserDetails(username, password);
		LOGGER.info("End");
		return ResponseEntity.ok(user);
	}

	@PostMapping("/show_user_details")
	public ResponseEntity<User> saveUpdatedDetails(@RequestBody Map<String, String> userData) {
		LOGGER.info("Start");
		String name = userData.get("name");
		String contact = userData.get("contact");
		String address = userData.get("address");
		String gender = userData.get("gender");
		String email_id = userData.get("email_id");
		String password = userData.get("password");
		String username = userData.get("username");
		fservice.update_UserDetails(name, contact, address, gender, email_id, password, username);
		User updatedUser = fservice.getUserDetails(username, password);
		LOGGER.info("End");
		return ResponseEntity.ok(updatedUser);
	}
	@GetMapping("/user_edit_details")
	public ResponseEntity<String> showEditDetailsForm(@RequestParam String username) {
		return ResponseEntity.ok("user_edit_details");
	}

	@GetMapping("/confirm_payment")
	public ResponseEntity<List<Bookings>> showConfirmPayment(@RequestParam String pnr_no) throws ParseException {
		LOGGER.info("Start");
		List<Bookings> bookingList = fservice.getUserBooking_details(pnr_no);
		LOGGER.info("End");
		return ResponseEntity.ok(bookingList);
	}

	@PostMapping("/confirm_payment")
	public ResponseEntity<String> confirmAndSendMail(@RequestBody Map<String, String> paymentData) {
		LOGGER.info("Start");
		String pnr_no = paymentData.get("pnr_no");
		String cost = paymentData.get("cost");
		// Here you can add the logic to confirm the payment and send the mail
		LOGGER.info("End");
		return ResponseEntity.ok("Ticket Booked Successfully! You can check in Manage Bookings.");
	}
	@GetMapping("/flight_seat_map/{flightNumber}")
	public ResponseEntity<Map<String, Object>> getFlightSeatMapWithPrices(@PathVariable String flightNumber) {
		LOGGER.info("Start");

		// Assuming your FlightService has a method to get the list of flight details
		ArrayList<Flights> flightsList = fservice.getFlight_details();

		// Find the specific flight with the matching flight number
		Flights flight = null;
		for (Flights f : flightsList) {
			if (f.getFlightno().equals(flightNumber)) {
				flight = f;
				break;
			}
		}

		if (flight == null) {
			return ResponseEntity.notFound().build();
		}

		// Instead of seat type strings, use the number of seats in each section
		List<Integer> seatMap = new ArrayList<>();
		seatMap.add(flight.getE_seats_left()); // Ordinary seats count
		seatMap.add(flight.getC_seats_left()); // Comfort seats count
		seatMap.add(flight.getB_seats_left()); // Business seats count

		// Calculate prices for each seat type using existing functions in Flights class
		Map<String, Float> seatPrices = new HashMap<>();
		seatPrices.put("Ordinary", flight.getE_seat_price());
		seatPrices.put("Comfort", flight.getB_seat_price() * 1.4f); // Assuming Comfort seat is 40% more than Ordinary
		seatPrices.put("Business", flight.getB_seat_price() * 2.0f); // Assuming Business-Class is more than double

		Map<String, Object> response = new HashMap<>();
		response.put("seatMap", seatMap);
		response.put("seatPrices", seatPrices);

		LOGGER.info("End");
		return ResponseEntity.ok(response);
	}

	@PostMapping("/selectseat")
	public ResponseEntity<String> selectSeatForPassenger(@RequestBody Map<String, Object> payload) {
		try {
			String p_pnr = (String) payload.get("p_pnr");
			String p_name = (String) payload.get("p_name");
			int p_seatno = (int) payload.get("p_seatno");

			// Assuming you have a service class to handle business logic
			fservice.updateSeatNumberForPassenger(p_pnr, p_name, p_seatno);
			return ResponseEntity.ok("Seat selection successful");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Seat selection failed: " + e.getMessage());
		}
	}




	@GetMapping("/finish")
	public ResponseEntity<String> logoutUser(@RequestParam String username) {
		// This logic needs to be done on the fronedn side to complete later
		return ResponseEntity.ok("User logged out successfully");
	}


	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<String> exceptionHandlerGeneric() {
		//  logic to handle exceptions make seperate into seprate class depending
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please login first or register if you are a new user");
	}
}
