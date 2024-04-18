import React from "react";
import { calculateResult } from "../Calculate";
import "../pages/game.css";
import { auth, db } from "../firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// const docRef = doc(db, "users");
// const docSnap = await getDoc(docRef);

export const CalculateButton = (props) => {

  

  const {
    clickedButtons,
    targetNumber,
    setSuccess,
    winTally,
    setWinTally,
    setButtonStates
  } = props;

  // const userId = auth.currentUser.uid;

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
    // if (auth.currentUser) {
    //   setDoc(doc(db, "users", userId), {
    //      highScore: winTally
    //   })
    // }

    handleVerdict();
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

export const handleVerdict = (success, numbersGenerated, setButtonStates, generateRandomNumbers) => {
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
    // generateRandomNumbers();
  }
};
