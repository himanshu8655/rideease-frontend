// src/routes/PaymentPg/Payment.js

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './Payment.css';

// 1) Load your Publishable key from Stripe
const stripePromise = loadStripe('pk_test_51RDZY2B2sb9Z6fmOHQL7ACvqDkel22GczUbiF4qhRRrim1KbozZU6iVDpSLzdxXVzEbYOR0KWwcBSzPTKWzOh9FR00ubqIzm7B');

const PaymentForm = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [success, setSuccess] = useState(false);

  // 2) Stripe Hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3) Ensure stripe and elements are ready
    if (!stripe || !elements) {
      alert('Stripe has not loaded yet. Please try again in a moment.');
      return;
    }

    // 4) Get Card details from CardElement
    const card = elements.getElement(CardElement);

    // 5) Create a PaymentMethod w/ Billing details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: nameOnCard,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    // (Optional) 6) Send paymentMethod.id to your backend to create a PaymentIntent
    // For now, we'll just simulate a success:
    setTimeout(() => {
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h2>Ride Payment</h2>
      {success ? (
        <div className="payment-success">
          <h3>Payment Successful ✅</h3>
          <p>Your ride has been confirmed!</p>
        </div>
      ) : (
        <form className="payment-form" onSubmit={handleSubmit}>
          <label>
            Name on Card
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              required
            />
          </label>

          {/* 7) The Stripe CardElement in place of manual fields */}
          <label>
            Card Details
            <CardElement
              options={{ style: { base: { fontSize: '16px', color: '#fff' } } }}
            />
          </label>

          <button type="submit" disabled={!stripe}>
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
};

// 8) Wrap PaymentForm inside <Elements> so CardElement works
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
