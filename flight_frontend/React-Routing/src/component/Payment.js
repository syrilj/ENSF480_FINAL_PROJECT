import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Initializing EmailJS with User ID:", 's7TbZMeWWJU0mXJ7U'); // Replace with your Email.js user ID
    emailjs.init('s7TbZMeWWJU0mXJ7U'); // Replace with your Email.js user ID
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate a simple validation
    if (!cardNumber || !expirationDate || !cvc || !name || !email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Simulate a successful payment
      setPaymentSuccessful(true);

      // Simulate sending a receipt
      await sendReceipt();

      // In a real-world scenario, you would send an actual email using Email.js
      await emailjs.send('service_ai83hic', 'template_ju8i3vt', {
        to_email: email,
        from_name: '480 Flights',
        message: 'Payment receipt details here:',
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const sendReceipt = () => {
    // Simulate sending a receipt to the entered email
    console.log(`Receipt sent to ${email}`);
    // In a real-world scenario, you might want to include more details in the receipt.
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-message-container">
          <div className={`success-message show`}>
            <div className="successHeader">Thank you!</div>
            <div className="successMessage">We'll be in touch soon.</div>
          </div>
        </div>
      </div>
    );
  }

  const handleContinueToRecipt = () => {
    navigate('/Recipt');
    console.log('Continue to Payment clicked!');
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

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
 
 
          <button
            type="submit"
            className="mt-4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            onClick={handleContinueToRecipt}
          >
            Pay Now
          </button>
        </form>
      ) : (
        <p className="text-green-500 text-center my-4">Payment successful! Receipt sent to {email}</p>
      )}
    </div>
  );
};

export default PaymentPage;

