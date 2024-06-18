import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Movie from "../interfaces/Movie";
import "../App.css";

//från movie details ska det göras en get med /movies/${id} för att få fram rätt film.

export const MovieDetails = () => {
  // const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);

  useEffect(() => {
    const callApi = async () => {
      try {
        let call = await fetch(`http://localhost:3001/movies/${movie?.id}`, {
          method: "GET",
        });
        let json = await call.json();
        setMovie(json.movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    callApi();
  }, []);

  // useEffect(() => {
  //   //Hämtar filmer från localstorage, tom sträng om ingen nyckel.
  //   const storedMovies = JSON.parse(localStorage.getItem("moviesList") || "[]");
  //   //Letar i storedMovies och returnerar första filmen med matchande movieID och sätter till Selected. LÄS
  //   const selectedMovie = storedMovies.find(
  //     (m: Movie) => m.id.toString() === movieId
  //   );
  //   //uppdaterar state
  //   setMovie(selectedMovie);
  //   //beroenden för useEffect, dvs. körs när movieId ändras.
  // }, [movieId]);

  const navigate = useNavigate();

  const handleClick = (movie: any) => {
    navigate(
      `/checkout?products=` +
        JSON.stringify({ id: movie.id, price: movie.price })
    );
  };

  if (!movie) {
    return <p>Loading...</p>;
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
