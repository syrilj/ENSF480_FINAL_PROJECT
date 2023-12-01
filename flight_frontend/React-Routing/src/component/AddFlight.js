import React, { useState } from "react";
import axios from "axios";

const AddFlight = () => {
    const [flightDetails, setFlightDetails] = useState({
        flightno: "",
        from: "",
        to: "",
        dept_date: "",
        arr_date: "",
        dept_time: "",
        arr_time: "",
        e_seats_left: 0,
        c_seats_left: 0,
        b_seats_left: 0,
        e_seat_price: 0.0,
        c_seat_price: 0.0,
        b_seat_price: 0.0,
        flight_company: "",
        status: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8081/api/admin/admin_add_flight", flightDetails);
    
          if (response.status === 200) {
            setSuccessMessage("Flight Added!");
            setError("");
          } else {
            setSuccessMessage("");
            setError("Unable to add flight.");
          }
        } catch (error) {
          setSuccessMessage("");
          setError("Error during addition. Please try again.");
          console.error("Error during addition:", error);
        }
      };
    

    const handleChange = (e) => {
        setFlightDetails({
            ...flightDetails,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 'bold' }}>Add Flight</h2>
            <div style={{ height: '20px' }}></div>
        </div>
            <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <label htmlFor="from">Flight Number: </label>
                <input
                    type="text"
                    name="flightno"
                    placeholder="FL123"
                    value={flightDetails.flightno}
                    onChange={handleChange}
                />
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <label htmlFor="from">From: </label>
                <input
                    type="text"
                    name="from"
                    placeholder="Calgary"
                    value={flightDetails.from}
                    onChange={handleChange}
                />
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="to">To: </label>
                    <input
                        type="text"
                        name="to"
                        placeholder="Vancouver"
                        value={flightDetails.to}
                        onChange={handleChange}
                    />
                </div>


                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="departureDate">Departure Date: </label>
                    <input
                        type="date"
                        id="departureDate"
                        name="dept_date"
                        placeholder="Departure Date"
                        value={flightDetails.dept_date}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="arrivalDate">Arrival Date: </label>
                    <input
                        type="date"
                        id="arrivalDate"
                        name="arr_date"
                        placeholder="Arrival Date"
                        value={flightDetails.arr_date}
                        onChange={handleChange}
                    />
                </div>
            </div>


                <div style={{ display: 'flex', flexDirection: 'row', gap: '52px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="departureTime">Departure Time: </label>
                    <input
                        type="time"
                        id="departureTime"
                        name="dept_time"
                        placeholder="Departure Time"
                        value={flightDetails.dept_time}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="arrivalTime">Arrival Time: </label>
                    <input
                        type="time"
                        id="arrivalTime"
                        name="arr_time"
                        placeholder="Arrival Time"
                        value={flightDetails.arr_time}
                        onChange={handleChange}
                    />
                </div>
            </div>


                <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="eSeatsLeft">Total Ordinary Seats: </label>
                    <input
                        type="number"
                        id="eSeatsLeft"
                        name="e_seats_left"
                        placeholder=""
                        value={flightDetails.e_seats_left}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="cSeatsLeft">Total Comfort Seats: </label>
                    <input
                        type="number"
                        id="cSeatsLeft"
                        name="c_seats_left"
                        placeholder=""
                        value={flightDetails.c_seats_left}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="bSeatsLeft">Total Business Seats: </label>
                    <input
                        type="number"
                        id="bSeatsLeft"
                        name="b_seats_left"
                        placeholder=""
                        value={flightDetails.b_seats_left}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="eSeatsPrice">Ordinary Seat Price: </label>
                    <input
                        type="number"
                        id="eSeatsPrice"
                        name="e_seat_price"
                        placeholder="80.00"
                        value={flightDetails.e_seat_price}
                        onChange={handleChange}
                        step="0.01" // Step attribute for decimal input
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="cSeatsPrice">Comfort Seat Price: </label>
                    <input
                        type="number"
                        id="cSeatsPrice"
                        name="c_seat_price"
                        placeholder="250.00"
                        value={flightDetails.c_seat_price}
                        onChange={handleChange}
                        step="0.01" // Step attribute for decimal input
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <label htmlFor="bSeatsPrice">Business Seat Price: </label>
                    <input
                        type="number"
                        id="bSeatsPrice"
                        name="b_seat_price"
                        placeholder="1000.00"
                        value={flightDetails.b_seat_price}
                        onChange={handleChange}
                        step="0.01" // Step attribute for decimal input
                    />
                </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                <label htmlFor="flightcompany">Flight Company: </label>
                <input
                    type="text"
                    name="flight_company"
                    placeholder="Flight Airlines"
                    value={flightDetails.flight_company}
                    onChange={handleChange}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                <label htmlFor="status">Status: </label>
                <input
                    type="text"
                    name="status"
                    placeholder="On Time"
                    value={flightDetails.status}
                    onChange={handleChange}
                />
             </div>

             <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Add Flight
            </button>
            {/* Success and Error Messages */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AddFlight;