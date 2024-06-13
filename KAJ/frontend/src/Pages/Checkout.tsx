import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PJEZvRvdqCDotXI09aONw6ac9lAO9pmMNYHUlOZ7U8tCv2V0y6OkuiVJfU5V8J8vcIKlB3iep35feOOkCAMS9Vk0078rcmY6I"
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  let query = useQuery();
  let products = query.get("products");
  console.log(products);

  useEffect(() => {
    const callApi = async () => {
      let parsedProducts;
      if (products) {
        parsedProducts = JSON.parse(products);
      } else {
        parsedProducts = []; // or handle the null case appropriately
      }
      console.log(parsedProducts);

      try {
        let response = await fetch(
          "http://localhost:3001/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: parsedProducts }),
          }
        );

        let json = await response.json();

        console.log(json);
        setClientSecret(json.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    callApi();
  }, [products]);

  const appearance = {
    theme: "stripe" as "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
