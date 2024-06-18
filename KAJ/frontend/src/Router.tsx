import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Pages/Layout";
import App from "./App";
import Checkout from "./Pages/Checkout";

import { MovieDetails } from "./Pages/MovieDetails";

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
      { path: "/movies/:movieId", element: <MovieDetails /> },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);
