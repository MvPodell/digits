import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Router,
  Routes,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import {App} from "./pages/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const router = createBrowserRouter([ 
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage fileName={"App"}/>,
    children: [
      {
        path: "/home",
        element: <Home />,
        errorElement: <ErrorPage fileName={"Home"}/>
      },
      {
        path: "/digits",
        element: <Game />,
        errorElement: <ErrorPage fileName={"Game"}/>,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage fileName={"login"}/>,
      },
      {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage fileName={"signup"}/>,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage fileName={"profile"}/>,
      }
    ]
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </RouterProvider>
  </StrictMode>
);
