import "./styles.css";
import { useState, useEffect } from "react";
import { Button } from "./Button";

export default function App() {
  const [targetNumber, setTargetNumber] = useState(0);

  const generateTargetNumber = () => {
    const target = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(target);
  };

  useEffect(() => {
    generateTargetNumber();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Digits Game</h1>
          <h3>Combine the numbers below to reach the target number!</h3>
          <div className="targetRow">
            <h3 className="targetDisplay">Target Number: {targetNumber}</h3>
          </div>
        </div>
        <div className="buttonContainer">
          <Button targetNumber={targetNumber} />
        </div>
      </div>
    </div>
  );
}
