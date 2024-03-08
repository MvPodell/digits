import {
  applyOperation,
  calculateResult,
  isIntegerAchievable,
  shuffleArray,
  calculateExpression
} from "./Calculate";
import { React, useState, useEffect } from "react";

export const Button = ({ targetNumber }) => {
  let randomNumbers;
  const [buttonStates, setButtonStates] = useState([
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
    { style: "numberButton", disabled: false, text: "" },
  ]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [numbersGenerated, setNumbersGenerated] = useState(false);
  const [currentTotal, setCurrentTotal] = useState([]);
  const [success, setSuccess] = useState(null);

  // only triggers handleSuccess when success is explicitly set to true, ignores when set to false
  useEffect(() => {
    if (success !== null) {
      handleSuccess();
    }
  }, [success]);

  // generate the numbers that go into the buttons
  const generateRandomNumbers = () => {
    let targetCopy = targetNumber;
    let steps;
    do {
      targetCopy = targetNumber;
      let oppOperations = {
        "+": "-",
        "-": "+",
        "*": "/",
        "/": "*",
      };
      steps = [];

      // Generate 6 random numbers
      randomNumbers = Array.from({ length: 5 }, () => {
        let rand;
        let operation = null;
        do {
          rand = Math.floor(Math.random() * (20 - 2) + 2); // Generate a random number
          operation = isIntegerAchievable(targetCopy, rand); // Check if it makes targetNumber an integer
        } while (!operation); // Continue generating until an operation is found

        // keep track of the correct step to reach target
        steps.unshift(`${oppOperations[operation]} ${rand}`);
        // update target so that we can generate more buttons without conflict
        targetCopy = applyOperation(targetCopy, operation, rand); // Update targetCopy
        return { number: rand, operation };
      });
      steps.unshift(targetCopy);
    } while (targetCopy > 100);
    randomNumbers.push({ number: targetCopy });

    console.log("targetCopy and steps:", targetCopy, steps);

    // Map over the defaultButtonState array and assign the buttonTexts
    setButtonStates(prevButtonStates => {
      return prevButtonStates.map((_, index) => {
        return {
          style: "numberButton",
          disabled: false,
          text: randomNumbers[index].number
        }
      });
    });

    setNumbersGenerated(true);
    setSuccess(null);
    setClickedButtons([]);
    setClickedIndices([]);
    setCurrentTotal([]);
  };

  const handleOperationClick = (operation) => {
    if (numbersGenerated) {
      // setClickedIndices([...clickedIndices, operation]);
      setClickedButtons([...clickedButtons, operation]);
      const result = calculateExpression(clickedButtons.concat([operation]));
      setCurrentTotal(result);
    }
  };

  const handleClick = (index) => {
    if (numbersGenerated) {
      const updatedButtonStates = [...buttonStates];
      // set the button state to clicked and disabled
      updatedButtonStates[index].style = "clickedButton";
      updatedButtonStates[index].disabled = true;
      setButtonStates(updatedButtonStates);
      setClickedIndices([...clickedIndices, index]);
      setClickedButtons([...clickedButtons, updatedButtonStates[index].text]);

      let result = calculateExpression(clickedButtons.concat(updatedButtonStates[index].text));
      setCurrentTotal(result);
      // console.log("Result:", result); // You can use the result as needed
      // console.log("clickedIndices:", clickedIndices);
    }
  };



  const handleSuccess = () => {
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
    }
  };

  const validOperations = ["+", "-", "*", "/"];


  const handleUndo = () => {
    let lastButton = clickedButtons[clickedButtons.length - 1];
    if (!validOperations.includes(lastButton)) {
      // if the last button clicked is a number button, 
      // get the index of the last button clicked
      let index = clickedIndices[clickedIndices.length - 1];
      const undoButtonStates = [...buttonStates];
      undoButtonStates[index].style = "numberButton";
      undoButtonStates[index].disabled = false;
      setButtonStates(undoButtonStates);
      setClickedIndices(clickedIndices.slice(0, -1));
    }
    setClickedButtons(clickedButtons.slice(0, -1));
    const result = calculateExpression(clickedButtons);
    setCurrentTotal(result);
  };

  return (
    <div>
      <div className="row">
        <button className="startButton" onClick={generateRandomNumbers}>
          Generate Numbers
        </button>
      </div>
      <div
        className="row stack"
        style={{ visibility: numbersGenerated ? "visible" : "hidden" }}
      >
        Clicked Buttons: {clickedButtons}
      </div>
      <div
        className="row stack"
        style={{ visibility: numbersGenerated ? "visible" : "hidden" }}
      >Current Total: {currentTotal}</div>
      <div className="numberButtonContainer">
        {[...Array(6)].map((_, index) => (
          <button
            key={index}
            className={buttonStates[index].style}
            onClick={() => handleClick(index)}
            disabled={buttonStates[index].disabled}
          >
            {buttonStates[index].text}
          </button>
        ))}
      </div>
      <div>
        <button
          className="operationButton"
          onClick={() => handleOperationClick("+")}
        >
          +
        </button>
        <button
          className="operationButton"
          onClick={() => handleOperationClick("-")}
        >
          -
        </button>
        <button
          className="operationButton"
          onClick={() => handleOperationClick("*")}
        >
          *
        </button>
        <button
          className="operationButton"
          onClick={() => handleOperationClick("/")}
        >
          /
        </button>
        <button className="undoButton" disabled={success | clickedButtons.length === 0} onClick={() => handleUndo()}>
          Undo
        </button>
      </div>
      <div>
        <button
          className="calculateButton"
          onClick={() => {
            const result = calculateResult(clickedButtons);
            // console.log("result:", result);
            if (result === targetNumber) {
              setSuccess(true);
              // handleSuccess(true);
              setButtonStates(prevButtonStates => {
                return prevButtonStates.map((state, index) => {
                  const successText = ["S", "U", "C", "C", "C", "SS"];
                  return {
                    ...state,
                    text: successText[index]
                  };
                });
              });
              console.log("Congratulations! You've reached the target number.");
            } else {
              setSuccess(false);
              // handleSuccess(false);
            }
            handleSuccess();
          }}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Button;
