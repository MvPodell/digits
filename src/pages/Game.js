import React, { useState, useEffect, useContext } from "react";
import "./game.css";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import { CalculateButton } from "../components/CalculateButton";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import "../firebase/firebase";
import { getUserHighScoreFromFirestore } from "../firebase/firestore";
import { AppContext } from "./App";

export const Game = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [success, setSuccess] = useState(null);
  const [winTally, setWinTally] = useState(0);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [buttonStates, setButtonStates] = useState([
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
  ]);

  const { highScore, setHighScore } = useContext(AppContext);

  const navigate = useNavigate();
  const logoutUser = async (e) => {
    e.preventDefault();

    await signOut(auth);
    navigate("/home");
  }

  const user = auth.currentUser;

  const generateTargetNumber = () => {
    const target = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(target);
  };

  useEffect(() => {
    generateTargetNumber();

    const fetchUserHighScore = async () => {
      if (user) {
        const userHighScore = await getUserHighScoreFromFirestore(user.uid);
        console.log("current high score for user: ", userHighScore);
        setHighScore(userHighScore);
      } else {
        setHighScore(0);
      }
    };

    fetchUserHighScore();
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
        {!user && (
          <Link to="/login">
            <button className="gameLoginButton">Login</button>
          </Link>
        )}
        {user && (
          <Link to="/login">
            <button className="gameLoginButton" onClick={(e) => logoutUser(e)}>Log Out</button>
          </Link>
        )}
      </div>
      <div className="bodyContainer">
        <div className="gameSidePanelLeft">
            <div className="sidePanelText">Target Number</div>
            <div className="sidePanelText">{targetNumber}</div>
        </div>
        <div className="targetContainer">
          <Button
            targetNumber={targetNumber}
            success={success}
            setSuccess={setSuccess}
            clickedButtons={clickedButtons}
            setClickedButtons={setClickedButtons}
            buttonStates={buttonStates}
            setButtonStates={setButtonStates}
          />
          <div className="calculate">
            <div className="row">
              <CalculateButton
                clickedButtons={clickedButtons}
                targetNumber={targetNumber}
                success={success}
                setSuccess={setSuccess}
                winTally={winTally}
                setWinTally={setWinTally}
                setButtonStates={setButtonStates}
              />
            </div>
          </div>
        </div>
        <div className="gameSidePanelRight">
          <div className="sidePanelText">
            <div>Top Score</div>
            <div> {highScore}</div>
          </div>
          <div className="row tally">
              Win Streak: {winTally}
            </div>
        </div>
      </div>

    </div>
  )
}