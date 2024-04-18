import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import { signOut } from "firebase/auth";
import "../styles.css";

export const Home = () => {
  const navigate = useNavigate();
  const logoutUser = async (e) => {
    e.preventDefault();

    await signOut(auth);
    navigate("/home");
  }

  const user = auth.currentUser;

  return (
    <div className="home">
      <div className="homeBody">
        {auth.currentUser && (
          <p>Welcome <em className="text-decoration-underline">{user.email}</em>. You are logged in!</p>
        )}
        <div className="header">
          {!auth.currentUser && (
            <Link to="/login">
              <button className="homeLoginButton">Login</button>
            </Link>
            
          )}
          {auth.currentUser && (
            <button className="loginButton" onClick={(e) => logoutUser(e)}>Log out</button>
          )}
        </div>
        <div className="homeContainer">
          <div className="blueRectangle">
            <h1>Digits Game</h1>
            <h3>Combine the given numbers to reach the target total!</h3>
          </div>
            <Link to="/digits">
              <button className="startButton">Play</button>
            </Link>
        </div>
        <div className="scoreboard">
          {auth.currentUser && (
            <>
              <p>Your current high score is __.</p>
              <p>The current high score is ___ from user ___. </p>
            </>

          )}
        </div>
      </div>

    </div>
  );
}