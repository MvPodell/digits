import "../styles.css";
import { useState, useEffect } from "react";
import { Home } from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import { Game } from "./Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>} ></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/digits" element={<Game />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}
      {/* <Outlet /> */}
    </div>
  );
}
