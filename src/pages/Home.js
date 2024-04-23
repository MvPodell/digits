import React, {useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { fetchHighestScoreUser, getUserHighScoreFromFirestore } from "../firebase/firestore";
import "../styles.css";
import { AppContext } from "./App";

export const Home = ({onStart, started, onLogin}) => {
  const { highScore, setHighScore } = useContext(AppContext);
  const [highestScoreUser, setHighestScoreUser] = useState(null);

  const navigate = useNavigate();
  const logoutUser = async (e) => {
    e.preventDefault();

    await signOut(auth);
    navigate("/home");
  }

  useEffect(() => {
    const fetchUserHighScore = async () => {
      if (user) {
        const userHighScore = await getUserHighScoreFromFirestore(user.uid);
        // console.log("current high score for user: ", userHighScore);
        setHighScore(userHighScore);
      }
    };
    fetchUserHighScore();
    fetchHighestScoreUser(setHighestScoreUser);
  }, []);

  const user = auth.currentUser;

  const handleStartClick = () => {
    console.log("Start button clicked");
    if (!started) {
      onStart(); // Call the onStart function passed from App
    }
};
const handleLoginClick = () => {
  console.log("login button clicked");
  if (!started) {
    onLogin(); // Call the onStart function passed from App
  }
};

  return (
    <div className="home">
      <div className="homeBody">
        {auth.currentUser && (
          <p>Welcome <em className="text-decoration-underline">{user.email}</em>. You are logged in!</p>
        )}
        <div className="header">
          {!auth.currentUser && (
            <Link to="/login">
              <button className="homeLoginButton" onClick={handleLoginClick}>Login</button>
            </Link>
            
          )}
          {auth.currentUser && (
            <button className="homeLoginButton" onClick={(e) => logoutUser(e)}>Log out</button>
          )}
        </div>
        <div className="homeContainer">
          <div className="blueRectangle">
            <h1>Digits Game</h1>
            <h3>Combine the given numbers to reach the target total!</h3>
          </div>
            {!started && (
              <Link to="/digits">
              <button className="startButton" onClick={handleStartClick}>Play</button>
            </Link>
            )}
            {started && (
              <Link to="/digits">
                <button className="startButton">Play</button>
              </Link>
            )}
            
        </div>
        <div className="scoreboard">
          {auth.currentUser && highestScoreUser && (
            <>
              <p>Your current high score is {highScore}.</p>
              <p>The current high score is {highestScoreUser.highScore} from user {highestScoreUser.username}. </p>
            </>

          )}
        </div>
      </div>

    </div>
  );
}