import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Movie from "../interfaces/Movie";
import "../App.css";

export const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState(true); // Lägg till loading state
  const [error, setError] = useState<string | null>(null); // Lägg till error state

  console.log(movieId);

  useEffect(() => {
    const callApi = async () => {
      try {
        let call = await fetch(`http://localhost:3001/movies/${movieId}`, {
          method: "GET",
        });
        if (!call.ok) {
          throw new Error(`HTTP error! status: ${call.status}`);
        }
        let json = await call.json();
        console.log(json);
        setMovie(json); // Sätt hela JSON-objektet direkt till movie state
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Stäng av loading state
      }
    };

    callApi();
  }, [movieId]);

  const navigate = useNavigate();

  const handleClick = (movie: Movie) => {
    navigate(
      `/checkout?products=` +
        JSON.stringify({ id: movie.id, price: movie.price })
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="go-back-button"
      >
        🔙
      </button>
      <h1>{movie.name}</h1>
      <div className="movie-detail">
        <div className="detail-image-container">
          <img src={movie.image} alt={movie.name} />
        </div>
        <div className="detail-content">
          <p>{movie.description}</p>
          <div className="detail-button-container">
            <p>
              <button onClick={() => handleClick(movie)}>
                {movie.price} Sek - Köp nu
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
