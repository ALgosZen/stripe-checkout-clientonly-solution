import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_PK_TEST_KEY);
function App() {
  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: process.env.REACT_APP_PLAN_PRICE_ID, // Replace with the ID of your price
        quantity: 1,

      }],
      mode: 'subscription',
      successUrl: window.location.origin,
      cancelUrl: `${window.location.origin}/thankyou`,
      customerEmail: 'hello@sam.com'
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <button role="link" onClick={handleClick}>
      Subscribe Plan Link
    </button>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));