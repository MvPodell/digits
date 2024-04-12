import React, {useState, useEffect} from "react";
import Button from "../components/Button";
import "../styles.css";

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
            <div className="blueRectangle">
                <h1>Digits Game</h1>
                <div className="targetRow">
                    <h3 className="targetDisplay">Target Number: {targetNumber}</h3>
                </div>
            </div>
            <div className="targetContainer">
                <Button targetNumber={targetNumber} />
            </div>
        </div>
    )
}