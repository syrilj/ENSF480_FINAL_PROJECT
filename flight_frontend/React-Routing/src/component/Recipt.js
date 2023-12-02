import React from 'react';

const Receipt = () => {
  // Retrieve data from local storage
  const storedUserData = localStorage.getItem('userData');
  const storedSelectedFlightData = localStorage.getItem('selectedFlight');

  // Check if data exists
  if (!storedUserData || !storedSelectedFlightData) {
    return <p>No receipt data found.</p>;
  }

  // Parse stored data
  const userData = JSON.parse(storedUserData);
  const selectedFlightData = JSON.parse(storedSelectedFlightData);
  const flightNumber = selectedFlightData.flightno;
  const selectedSeat = selectedFlightData.selectedSeat;

  // Check if selected seat information exists
  if (!selectedSeat) {
    return <p>No seat information found in the selected flight data.</p>;
  }

  const { seat, section, b_seat_price, c_seat_price, e_seat_price } = selectedSeat;

  // Generate a unique PNR
  const generateUniquePNR = () => {
    const userPart = userData.u_name.substring(0, 3).toUpperCase();
    return `${userPart}${"233"}`;
  };

  const uniquePNR = generateUniquePNR();

  // Calculate the cost based on the selected seat
  let cost = 1000;

  if (userData.travelInsurance) {
    // Add 200 to the cost if travel insurance is selected
    cost += 200;
  }

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-md max-w-md">
      <h2 className="text-center text-2xl font-bold mb-4">Receipt</h2>

      <div className="text-gray-700">
        <p>
          <strong>User:</strong> {userData.u_name}
        </p>
        <p>
          <strong>Email:</strong> {userData.u_email_id}
        </p>
        <p>
          <strong>Flight Information:</strong> Flight Number {flightNumber}
        </p>
        <p>
          <strong>Selected Seat:</strong> Seat Number {seat}, Section {section}
        </p>
        {/* Add more details from the stored data as needed */}
      </div>

      <div className="mt-4 border-t pt-4 text-sm text-gray-600">
        <p>
          <strong>PNR:</strong> {uniquePNR}
        </p>
      
        <p>Thank you for your purchase!</p>
        {/* Add more receipt details or messages as needed */}
      </div>
    </div>
  );
};

export default Receipt;
