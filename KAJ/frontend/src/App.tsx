import { Helmet } from 'react-helmet';
import Movies from "./components/movies";
import GoogleMap from "./components/Googlemaps";
import "./App.css";
import Loginsession from "./components/loginsession";
import { Layout } from "./Pages/Layout";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./components/CheckoutForm";
import "./App.css";
import Contactform from "./components/Contactemail";


function App() {
  return (
    <>
       <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8F2M4FRSTG"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8F2M4FRSTG');
          `}
        </script>
      </Helmet>
      <Loginsession />
      <GoogleMap />
      <Contactform />
      <Movies />
      
    </>
  );
}

export default App;