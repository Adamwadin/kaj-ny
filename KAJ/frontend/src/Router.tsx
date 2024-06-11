import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Pages/Layout";
import { MovieDetails } from "./Pages/MovieDetails";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
        index: true,
      },
      { path: "/details/:movieId", element: <MovieDetails /> },
    ],
  },
]);
