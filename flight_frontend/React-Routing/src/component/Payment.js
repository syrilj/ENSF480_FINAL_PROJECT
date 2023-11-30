import React, { useState } from 'react';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a simple validation
    if (!cardNumber || !expirationDate || !cvc || !name) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate a successful payment
    setPaymentSuccessful(true);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Payment Page</h2>

      {!paymentSuccessful ? (
        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-2 text-sm font-semibold text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="expirationDate" className="block mb-2 text-sm font-semibold text-gray-700">
              Expiration Date
            </label>
            <input
              type="text"
              id="expirationDate"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cvc" className="block mb-2 text-sm font-semibold text-gray-700">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="mt-4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Pay Now
          </button>
        </form>
      ) : (
        <p className="text-green-500 text-center my-4">Payment successful!</p>
      )}
    </div>
  );
};

export default PaymentPage;
