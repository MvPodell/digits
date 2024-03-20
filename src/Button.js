import {
  applyOperation,
  calculateResult,
  isIntegerAchievable,
  calculateExpression
} from "./Calculate";
import { React, useState, useEffect } from "react";
import { NumberButtons } from "./NumberButtons";
import { CalculateButton, handleVerdict } from "./CalculateButton";

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
  const [winTally, setWinTally] = useState(0);

  // only triggers handleVerdict when success is explicitly set to true, ignores when set to false
  useEffect(() => {
    if (success !== null) {
      handleVerdict(success, numbersGenerated, setButtonStates, generateRandomNumbers);
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

  return (
    <div>
      <div className="row">
        <button className="startButton" onClick={generateRandomNumbers}>
          Generate Numbers
        </button>
      </div>
      {numbersGenerated && currentTotal.length != 0 && (
        <div className="row stack">{currentTotal}</div>
      )}
      {currentTotal.length === 0 && (
        <div className="row stack">0</div>
      )}
      <NumberButtons
        buttonStates={buttonStates}
        setButtonStates={setButtonStates}
        clickedButtons={clickedButtons}
        setClickedButtons={setClickedButtons}
        clickedIndices={clickedIndices}
        setClickedIndices={setClickedIndices}
        setCurrentTotal={setCurrentTotal}
        numbersGenerated={numbersGenerated}
        success={success}
      />
      <CalculateButton
        clickedButtons={clickedButtons}
        targetNumber={targetNumber}
        setSuccess={setSuccess}
        winTally={winTally}
        setWinTally={setWinTally}
        setButtonStates={setButtonStates}
      />
      <div className="row tally">
        Number of wins in a row: {winTally}
      </div>
    </div>
  );
};

export default Button;
