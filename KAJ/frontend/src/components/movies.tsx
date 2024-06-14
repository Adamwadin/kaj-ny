// src/pages/MainPage.tsx
import Movie from "../interfaces/Movie";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "./paging";
import "../index.css";

const stripePromise = loadStripe(
  "pk_test_51PIrfLRpqezBlhwYBoU2drHiDmH7PPKjY1qq5gt2Rum3NOj92CrJdCY6X05u3sdSmpvL84Y9rR0E3pxjio9O5Cdx00YSvE6JsF"
);

const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [data, setData] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (movie: any) => {
    navigate(
      `/checkout?products=` +
        JSON.stringify({ id: movie.id, price: movie.price })
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentPageData = data.slice(start, end);

  const navigate = useNavigate();

  return (
    <div className="MainPage">
      <div className="data-container">
        {movies.map((movie) => (
          <div key={movie.id} className="item">
            <img src={movie.image} alt={movie.name} className="movie-image" />
            <div className="movie-details">
              <h2>
                {movie.name} ({movie.year})
              </h2>
              <p>{movie.description}</p>
              <p>
                <strong>Author:</strong> {movie.author}
              </p>
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
              <p>
                <strong>Price:</strong> ${movie.price}
              </p>
              <button
                onClick={() => {
                  navigate("/details/" + movie.id);
                }}
              >
                Read More
              </button>
              <p>
                <button onClick={() => handleClick(movie)}>
                  {movie.price} Sek - Köp nu
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MainPage;
