import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PIrfLRpqezBlhwYBoU2drHiDmH7PPKjY1qq5gt2Rum3NOj92CrJdCY6X05u3sdSmpvL84Y9rR0E3pxjio9O5Cdx00YSvE6JsF"
);

interface IMovie {
  id: number;
  name: string;
  price: number;
  image: string;
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [movieDetails, setMovieDetails] = useState<IMovie>();
  let query = useQuery();
  let products = query.get("products");

  useEffect(() => {
    const callApi = async () => {
      let parsedProducts;
      if (products) {
        parsedProducts = JSON.parse(products);
      } else {
        parsedProducts = [];
      }

      const movieId = parsedProducts.id;
      let movieResponse = await fetch(
        `http://localhost:3001/movies/${movieId}`
      );
      let movieToCheckout = await movieResponse.json();
      setMovieDetails(movieToCheckout);

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

        setClientSecret(json.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    callApi();
  }, []);

  const appearance = {
    theme: "stripe" as "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <h2>Du köper:</h2>
      <div className="checkoutMovieContainer">
        <img src={movieDetails?.image} />
      </div>
      <h3>{movieDetails?.name}</h3>
      <span>{movieDetails?.price} sek</span>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
