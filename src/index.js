import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./pages/App";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: "/digits",
//     element: <Game />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/signup",
//     element: <Signup />
//   },
//   {
//     path: "/profile",
//     element: <Profile />
//   }
// ]);

root.render(
  <StrictMode>
    {/* <RouterProvider router={router}/> */}
    <App />
  </StrictMode>
);
