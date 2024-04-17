import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import "./game.css";
import { Link } from "react-router-dom";

export const Game = () => {
  const [targetNumber, setTargetNumber] = useState(0);

  const generateTargetNumber = () => {
    const target = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(target);
  };

  useEffect(() => {
    generateTargetNumber();
  }, []);
  return (
    <div className="gameContainer">
      <div className="gameHeader">
        <div className="backarrow">
          <Link to="/home">
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="16" viewBox="0 0 53 16" fill="none">
              <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM53 7L1 7L1 9L53 9L53 7Z" fill="#357EDD" />
            </svg>
          </Link>
        </div>
        <h1 className="game">Digits</h1>
        <Link to="/login">
          <button className="loginButton">Login</button>
        </Link>
      </div>
      {/* <div className="targetRow">
            <h3 className="targetDisplay">Target Number: {targetNumber}</h3>
          </div> */}
      <div className="bodyContainer">
        <div className="gameSidePanel">
          <div className="sidePanelText">Target Number</div>
        </div>
        <div className="targetContainer">
          <Button targetNumber={targetNumber} />
        </div>
        <div className="gameSidePanel">
          <div className="sidePanelText">Top Score</div>
        </div>
      </div>

    </div>
  )
}