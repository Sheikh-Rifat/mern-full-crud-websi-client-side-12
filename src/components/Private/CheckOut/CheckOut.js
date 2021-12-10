import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51K4oTFGArCfxeiQOGUlMELTQR1qDTXJleXquO05TSggf8LWDOWbLbsBwxAoLu19YqxjBjUyfcMXrHsPeY8kpzReD00T8K6Gzwp"
);

const CheckOut = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    fetch(
      `http://https://enigmatic-taiga-27234.herokuapp.com/:4000/userorders/${orderId}`
    )
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [orderId]);
  document.title = "DJI / Check Out";
  return (
    <div>
      <h1>Pay for : {order.title}</h1>
      <h3 className="text-light">Price : ${order.price}</h3>
      {order?.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      )}
    </div>
  );
};

export default CheckOut;
