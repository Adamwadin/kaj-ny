import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Pages/Layout";
import App from "./App";
import Checkout from "./Pages/Checkout";

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
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);
