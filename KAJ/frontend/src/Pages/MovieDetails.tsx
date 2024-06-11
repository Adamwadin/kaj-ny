import { useParams } from "react-router-dom";

export const MovieDetails = () => {
  const { movieId } = useParams();
  return <h1>Details for {movieId}</h1>;
};

export default MovieDetails;
