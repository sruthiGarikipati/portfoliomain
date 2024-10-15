import React from 'react';
import axios from 'axios';

const PaymentButton = () => {
  const handlePayment = () => {
    if (!window.Razorpay) {
      console.error('Razorpay script not loaded');
      return;
    }

    const options = {
      key: "rzp_test_9AF2S8rH5IeCQR", // Your Razorpay Key ID
      amount: "50000", // Amount in currency subunits (500 INR in this case)
      currency: "INR",
      name: "Razorpay",
      description: "Test Transaction",
      handler: async function (response) {
        alert("Payment Successful: " + response.razorpay_payment_id);

        // Verify payment on the server
        try {
          const result = await axios.post('/verify-razorpay-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email: "customer@example.com", // Update with actual customer email
            amount: 50000 // Amount in paise
          });
          alert(result.data.message);
        } catch (error) {
          console.error('Error verifying payment:', error);
          alert('Failed to verify payment');
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#F37254"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={handlePayment} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg">Pay with Razorpay</button>
  );
};

export default PaymentButton;









