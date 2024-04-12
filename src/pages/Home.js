import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles.css";

export const Home = ()=> {
  const navigate = useNavigate();
  const startGame = () => {
    navigate("./digits")
  };
  const handleLogin = () => {
    navigate("./login")
  };
  return (
    <div className="home">
      <div className="homeBody">
        <div className="header">
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </div>
        <div className="homeContainer">
          <div className="blueRectangle">
            <h1>Digits Game</h1>
            <h3>Combine the given numbers to reach the target total!</h3>
          </div>
          <button className="startButton" onClick={startGame}>
            Play
          </button>
        </div>
      </div>

    </div>
  );
}