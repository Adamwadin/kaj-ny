import Movies from "./components/movies";

import "./App.css";
import Loginsession from "./components/loginsession";
import { Layout } from "./Pages/Layout";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

function App() {
  return (
    <>
      <Loginsession />
      <Movies />
    </>
  );
}

export default App;
