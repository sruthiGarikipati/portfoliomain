import React from 'react';
import PaymentButton from './PaymentButton.jsx';

const PaymentPage = () => {
  return (
    <div className="payment-page flex flex-col items-center justify-center min-h-screen px-10 py-6">
      <h2 className="text-2xl font-bold mb-4"> Subscribe to Premium</h2>
      <p className="mb-6"> Unlock all features by subscribing to our premium plan.</p>
      <p className="text-lg text-gray-600 mt-2 mb-5">500/-</p>
      <PaymentButton/>
    </div>
  );
};

export default PaymentPage;






