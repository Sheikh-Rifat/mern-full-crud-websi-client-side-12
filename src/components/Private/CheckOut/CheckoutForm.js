import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import { Spinner } from "react-bootstrap";
const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { price, name, _id } = order;
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(
      "http://https://enigmatic-taiga-27234.herokuapp.com/:4000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      //   console.log(error);
      setSuccess("");
    } else {
      setError("");
      console.log(paymentMethod);
    }

    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: user.email,
          },
        },
      });
    if (intentError) {
      setError(intentError.message);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Your payment processed successfully.");
      console.log(paymentIntent);
      setProcessing(false);

      //   save to database
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        transaction: paymentIntent.client_secret.slice("_secret")[0],
      };
      const url = `http://https://enigmatic-taiga-27234.herokuapp.com/:4000/userOrders/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {processing ? (
          <Spinner animation="border" />
        ) : (
          <button
            className="project-btn-payment"
            type="submit"
            disabled={!stripe}
          >
            Pay ${price}
          </button>
        )}
      </form>
      {error && (
        <p className="mt-3" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {success && (
        <p className="mt-3" style={{ color: "green" }}>
          {success}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;