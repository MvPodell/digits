import React from "react";
import { calculateResult } from "../Calculate";
import "../pages/game.css";
import { addHighScore } from "../firebase/firestore";
import { useAuth } from "../firebase/auth";
import { setDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";


export const CalculateButton = (props) => {

  const saveDatatoFireStore = async (userId, winTally) => {
    console.log("userID", userId);
    const docRef = await setDoc(doc(db, "scores", userId), {
      highScore: winTally+1
    });
    alert("doc written");
  }
  

  const {
    clickedButtons,
    targetNumber,
    success,
    setSuccess,
    winTally,
    setWinTally,
    setButtonStates
  } = props;

  const user = auth.currentUser;

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
      if (user) {
        saveDatatoFireStore(user.uid, winTally);
      }
      
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
        // addHighScore(authUser.uid, winTally)
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
