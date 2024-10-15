import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import phonepayImage from '../assets/phonepay.png';
import googlepayImage from '../assets/googlepay.png';
import paytmImage from'../assets/paytm.png';

const Subscriptions = () => {
  const navigate = useNavigate();
  const stripePromise = loadStripe('your_stripe_publishable_key_here');

  // State to track the selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({ holderName: '', cardNumber: '', expDate: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [bankTransferOption, setBankTransferOption] = useState('');
  const [emiAmount, setEmiAmount] = useState('');

  const handlePayment = async () => {
    const stripe = await stripePromise;

    // Logic for different payment methods
    if (selectedPaymentMethod === 'creditCard') {
      alert(`Processing credit card payment for ${cardDetails.holderName}`);
    } else if (selectedPaymentMethod === 'upi') {
      alert(`Processing UPI payment with UPI ID: ${upiId}`);
    } else if (selectedPaymentMethod === 'netbanking') {
      alert(`Processing Netbanking payment through ${bankTransferOption}`);
    } else if (selectedPaymentMethod === 'emi') {
      alert(`Processing EMI payment. Monthly amount: ${emiAmount}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  
    
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Subscribe to Premium</h1>
        <p className="text-gray-700 mb-6">
          Unlock all features by subscribing to our premium plan.
        </p>

        {/* Plan Information */}
        <div className="mb-8">
          <h2 className="text-2xl text-blue-600 font-semibold">Premium Plan</h2>
          <p className="text-lg text-gray-600 mt-2">$9.99/month</p>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6 text-left">
          <h3 className="text-xl text-blue-600 font-semibold mb-4">Select Payment Method:</h3>

          <label className="block text-gray-600 mb-2">
            <input
              type="radio"
              value="creditCard"
              checked={selectedPaymentMethod === 'creditCard'}
              onChange={() => setSelectedPaymentMethod('creditCard')}
              className="mr-2"
            />
            Credit Card / Debit Card
          </label>

          <label className="block text-gray-600 mb-2">
            <input
              type="radio"
              value="upi"
              checked={selectedPaymentMethod === 'upi'}
              onChange={() => setSelectedPaymentMethod('upi')}
              className="mr-2"
            />
            UPI
          </label>

          <label className="block text-gray-600 mb-2">
            <input
              type="radio"
              value="netbanking"
              checked={selectedPaymentMethod === 'netbanking'}
              onChange={() => setSelectedPaymentMethod('netbanking')}
              className="mr-2"
            />
            Netbanking
          </label>

          <label className="block text-gray-600 mb-2">
            <input
              type="radio"
              value="bankTransfer"
              checked={selectedPaymentMethod === 'bankTransfer'}
              onChange={() => setSelectedPaymentMethod('bankTransfer')}
              className="mr-2"
            />
            Bank Transfer
          </label>

          <label className="block text-gray-600 mb-2">
            <input
              type="radio"
              value="emi"
              checked={selectedPaymentMethod === 'emi'}
              onChange={() => setSelectedPaymentMethod('emi')}
              className="mr-2"
            />
            EMI
          </label>
        </div>

        {/* Conditional Input Fields for Each Payment Method */}
        {selectedPaymentMethod === 'creditCard' && (
          <div className="mb-6">
            <h4 className="text-lg text-blue-600 font-semibold mb-4">Enter Card Details</h4>
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardDetails.holderName}
              onChange={(e) => setCardDetails({ ...cardDetails, holderName: e.target.value })}
              className="mb-3 p-2 border rounded w-full text-black"
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              className="mb-3 p-2 border rounded w-full text-black"
            />
            <input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              value={cardDetails.expDate}
              onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
              className="mb-3 p-2 border rounded w-full text-black"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              className="p-2 border rounded w-full text-black"
            />
          </div>
        )}

        {selectedPaymentMethod === 'upi' && (
          <div className="mb-6">
            <h4 className="text-lg text-blue-600 font-semibold mb-4">Enter UPI ID</h4>
            <input
              type="text"
              placeholder="Your UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="p-2 border rounded w-full text-black"
            />
          </div>
        )}

        





{selectedPaymentMethod === 'netbanking' && (
  <div className="mb-6">
    <h4 className="text-lg text-blue-600 font-semibold mb-4">Select Netbanking Option</h4>
    <div className="flex justify-around">
      <div className="flex flex-col items-center">
        <a href="https://www.phonepe.com" target="_blank" rel="noopener noreferrer">
          <img src={phonepayImage} alt="PhonePe" className="w-16 h-15" />
        </a>
        <span className="mt-2 text-gray-700">PhonePe</span>
      </div>
      <div className="flex flex-col items-center">
        <a href="https://pay.google.com" target="_blank" rel="noopener noreferrer">
          <img src={googlepayImage} alt="Google Pay" className="w-16 h-15" />
        </a>
        <span className="mt-2 text-gray-700">Google Pay</span>
      </div>
      <div className="flex flex-col items-center">
        <a href="https://paytm.com" target="_blank" rel="noopener noreferrer">
          <img src={paytmImage} alt="Paytm" className="w-16 h-15" />
        </a>
        <span className="mt-2 text-gray-700">Paytm</span>
      </div>
    </div>
  </div>
)}

        {selectedPaymentMethod === 'bankTransfer' && (
          <div className="mb-6">
            <h4 className="text-lg text-blue-600 font-semibold mb-4">Select Bank for Transfer</h4>
            <select
              value={bankTransferOption}
              onChange={(e) => setBankTransferOption(e.target.value)}
              className="p-2 border rounded w-full text-black"
            >
              <option value="">Select Bank</option>
              <option value="HDFC">HDFC</option>
              <option value="SBI">SBI</option>
              <option value="ICICI">ICICI</option>
              <option value="Indian Bank">Indian Bank</option>
            </select>
          </div>
        )}

        {selectedPaymentMethod === 'emi' && (
          <div className="mb-6">
            <h4 className="text-lg text-blue-600 font-semibold mb-4">Enter EMI Amount</h4>
            <input
              type="text"
              placeholder="Monthly EMI Amount"
              value={emiAmount}
              onChange={(e) => setEmiAmount(e.target.value)}
              className="p-2 border rounded w-full text-black"
            />
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg"
        >
          Proceed to Pay
        </button>
        {/* Back to Homepage Link */}
        <button 
          onClick={() => navigate('/')}
          className="text-blue-500 mt-6  underline hover:text-blue-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Subscriptions;







