// src/pages/MainPage.tsx
import React, { useState, useEffect } from "react";
import Movie from "../interfaces/Movie";
import Pagination from "./paging";
import "../index.css";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies");
        const result = await response.json();
        setData(result.movies);
        localStorage.setItem("moviesList", JSON.stringify(result.movies));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
        {currentPageData.map((movie) => (
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
