
import React, { useEffect, useState } from "react";

import "./App.css";

interface Movie {
    id: number;
    name: string;
    description: string;
    author: string;
   director: string;
    price: number;
    image: string; }

function App() {
  return (
  
    <div className="App">
      <header className="App-header">
        <h1>KAJ</h1>
        <p>Frontend</p>
      </header>
    </div>


   
  );
}


export default App;