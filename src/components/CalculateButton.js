import React, { useEffect, useContext } from "react";
import { calculateResult } from "../Calculate";
import "../pages/game.css";
import { updateDataFromFirestore } from "../firebase/firestore";
import { auth } from "../firebase/firebase";
import { AppContext } from "../pages/App";


export const CalculateButton = (props) => {
  const { highScore, setHighScore } = useContext(AppContext);

  const {
    clickedButtons,
    targetNumber,
    success,
    setSuccess,
    winTally,
    setWinTally,
    setButtonStates,
  } = props;

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      console.log('getting user data!');
      updateDataFromFirestore(user.uid, winTally);
    }
  }, [winTally]);

  useEffect(() => {
    console.log("checking if new high score: ", winTally, highScore);
    if (winTally > highScore) {
      setHighScore(winTally)
    }
  }, [winTally, highScore])

  const handleClick = () => {
    const result = calculateResult(clickedButtons);

    // correct answer
    if (result === targetNumber) {
      setSuccess(true);
      setButtonStates(prevButtonStates => {
        return prevButtonStates.map((state, index) => {
          const successText = ["S", "U", "C", "C", "E", "SS"];
          return {
            ...state,
            text: successText[index]
          };
        });
      });
      console.log("Congratulations! You've reached the target number.");
      setWinTally(winTally + 1);
    } else {
      // incorrect answer - reset win tally
      setSuccess(false);
      setWinTally(0);
    }
  }

  return (
    <div className="calculateButtonContainer">
      <button
        className="calculateButton"
        onClick={handleClick}
      >
        Calculate
      </button>
    </div>

  )
};

export const handleVerdict = (success, numbersGenerated, setButtonStates, generateRandomNumbers, authUser) => {
  
  
  if (numbersGenerated) {
    setButtonStates(prevButtonStates => {
      if (success) {
        return prevButtonStates.map((_, index) => {
          const successText = ["S", "U", "C", "C", "E", "SS"];
          return {
            style: "successButton",
            disabled: true,
            text: successText[index]
          };
        });

      } else {
        return prevButtonStates.map((_, index) => {
          const failureText = ["F", "AI", "L", "U", "R", "E"];
          return {
            style: "failureButton",
            disabled: true,
            text: failureText[index]
          };
        });
      }
    });
    setTimeout(generateRandomNumbers, 2000);
  }
};
