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
    { style: "numberButton", disabled: false },
    { style: "numberButton", disabled: false },
    { style: "numberButton", disabled: false },
    { style: "numberButton", disabled: false },
    { style: "numberButton", disabled: false },
    { style: "numberButton", disabled: false },
  ]);
  const [buttonTexts, setButtonTexts] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [numbersGenerated, setNumbersGenerated] = useState(false);
  const [currentTotal, setCurrentTotal] = useState([]);
  const [success, setSuccess] = useState(null);

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
      setButtonStates([
        { style: "numberButton", disabled: false },
        { style: "numberButton", disabled: false },
        { style: "numberButton", disabled: false },
        { style: "numberButton", disabled: false },
        { style: "numberButton", disabled: false },
        { style: "numberButton", disabled: false },
      ]);

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

    // shuffle randomNumbers so that the order is not preserved
    // randomNumbers = shuffleArray(randomNumbers);
    // Create an array of strings representing the numbers and operations
    const buttonTexts = randomNumbers.map(({ number }) => {
      return `${number}`;
    });

    console.log("targetCopy and steps:", targetCopy, steps);

    setButtonTexts(buttonTexts);
    setNumbersGenerated(true);
    setSuccess(null);
    setClickedButtons([]);
    setClickedIndices([]);
    setCurrentTotal([]);
  };

  const handleOperationClick = (operation) => {
    if (numbersGenerated) {
      setClickedIndices([...clickedIndices, operation]);
      setClickedButtons([...clickedButtons, operation]);
      const result = calculateExpression(clickedButtons.concat([operation]));
      setCurrentTotal(result);
    }
  };

  const handleClick = (buttonText, index) => {
    if (numbersGenerated) {
      const updatedButtonStates = [...buttonStates];
      // set the button state to clicked and disabled
      updatedButtonStates[index].style = "clickedButton";
      updatedButtonStates[index].disabled = true;
      setButtonStates(updatedButtonStates);

      setClickedIndices([...clickedIndices, index]);
      setClickedButtons([...clickedButtons, buttonText]);
      // console.log("clickedButtons:", clickedButtons);
      let result = calculateExpression(clickedButtons.concat(buttonText));
      setCurrentTotal(result);
      // console.log("Result:", result); // You can use the result as needed
      // console.log("clickedIndices:", clickedIndices);
      // make a copy of button states
    }
  };

  const handleSuccess = () => {
    if (numbersGenerated) {
      if (success) {
        setButtonStates([
          { style: "successButton", disabled: true },
          { style: "successButton", disabled: true },
          { style: "successButton", disabled: true },
          { style: "successButton", disabled: true },
          { style: "successButton", disabled: true },
          { style: "successButton", disabled: true },
        ]);
      } else {
        setButtonStates([
          { style: "failureButton", disabled: true },
          { style: "failureButton", disabled: true },
          { style: "failureButton", disabled: true },
          { style: "failureButton", disabled: true },
          { style: "failureButton", disabled: true },
          { style: "failureButton", disabled: true },
        ]);
      }
    }
  };

  const handleUndo = () => {
    let index = clickedIndices[clickedIndices.length - 1];
    // if the last button clicked was a number button
    if (Number.isInteger(index)) {
      // make a copy of buttonState
      const undoButtonStates = [...buttonStates];
      // reset the last button clicked to it's default
      undoButtonStates[index].style = "numberButton";
      undoButtonStates[index].disabled = false;
      // set the copy as buttonState
      setButtonStates(undoButtonStates);
    }

    setClickedIndices(clickedIndices.slice(0, -1));
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
            onClick={() => handleClick(buttonTexts[index], index)}
            disabled={buttonStates[index].disabled}
          >
            {buttonTexts[index]}
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
        <button className="undoButton" disabled={success} onClick={() => handleUndo()}>
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
              console.log("success after set to true: ", success)
              // handleSuccess(true);
              setButtonTexts(["S", "U", "C", "C", "C", "SS"]);
              console.log("Congratulations! You've reached the target number.");
            } else {
              setSuccess(false);
              // handleSuccess(false);
            }
            console.log("success outside conditional: ", success)
            handleSuccess();
            // Handle result if needed
          }}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Button;
