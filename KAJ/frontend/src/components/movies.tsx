import Movie from "../interfaces/Movie";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PIrfLRpqezBlhwYBoU2drHiDmH7PPKjY1qq5gt2Rum3NOj92CrJdCY6X05u3sdSmpvL84Y9rR0E3pxjio9O5Cdx00YSvE6JsF"
);

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    const callApi = async () => {
      let call = await fetch("http://localhost:3001/movies", {
        method: "GET",
      });

      let json = await call.json();

      setMovies(json.movies);
    };

    callApi();
  }, []);

  // .then((data) => setClientSecret(data.clientSecret));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <div className="movies">
          {movies.map((movie) => (
            <div key={movie.id} className="movie">
              <img src={movie.image} alt={movie.name} />
              <h2>{movie.name}</h2>
              <p>Director: {movie.director}</p>
              <p>Year: {movie.year}</p>
              <p>
                <button onClick={handleClick}>€{movie.price} - Köp nu</button>
              </p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Movies;
