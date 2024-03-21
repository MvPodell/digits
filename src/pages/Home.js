import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="header">
          <h1>Digits Game</h1>
          <h3>Combine the given numbers to reach the target total!</h3>
        </div>
        <button className="startButton">
          <Link to={`/digits`}>Play</Link>
        </button>
      </div>
    </div>
  );
}