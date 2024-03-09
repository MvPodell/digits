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
  const [winTally, setWinTally] = useState(0);

  // only triggers handleVerdict when success is explicitly set to true, ignores when set to false
  useEffect(() => {
    if (success !== null) {
      handleVerdict();
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



  const handleVerdict = () => {
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

  const validOperations = ["+", "-", "*", "/"];
  const operationsDict = [{ "+": "-" }, { "-": "+" }, { "*": "/" }, { "/": "*" }]


  const handleUndo = () => {
    let lastButton = clickedButtons[clickedButtons.length - 1];
    let result;
    console.log("button being undone: ", lastButton);

    if (!validOperations.includes(lastButton)) {
      console.log("number undone!")
      // if the last button clicked is a number button, 
      // get the index of the last button clicked
      let index = clickedIndices[clickedIndices.length - 1];
      // change the last number button clicked back to normal styling
      const undoButtonStates = [...buttonStates];
      undoButtonStates[index].style = "numberButton";
      undoButtonStates[index].disabled = false;
      setButtonStates(undoButtonStates);
      // remove record that number button was clicked
      setClickedIndices(clickedIndices.slice(0, -1));
      setClickedButtons(clickedButtons.slice(0, -1));
      // recalculate total without undone number

      if (clickedButtons.length > 3) {
        result = calculateExpression(clickedButtons.slice(0, -1));
        setCurrentTotal(result);
      } else if (clickedButtons.length === 3) {
        setCurrentTotal(clickedButtons.slice(0, -1));
      } else if (clickedButtons.length === 1) {
        setCurrentTotal([]);
      } 
    } else {
      // if last button is an operator, remove record of it
      setClickedButtons(clickedButtons.slice(0, -1));
      // result = calculateExpression(clickedButtons.slice(0, -1));
      if (clickedButtons.length === 2) {
        setCurrentTotal([calculateExpression(clickedButtons.slice(0, -1))])
      } else {
        // setCurrentTotal([calculateExpression(clickedButtons.slice(0, -2)), clickedButtons[clickedButtons.length - 2]]);
        setCurrentTotal([calculateExpression(clickedButtons.slice(0, -1))]);
      };

    }

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
            // correct answer
            if (result === targetNumber) {
              setSuccess(true);
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
              setWinTally(winTally + 1);
            } else {
              // incorrect answer - reset win tally
              setSuccess(false);
              setWinTally(0);
            }
            handleVerdict();
          }}
        >
          Calculate
        </button>
      </div>
      <div className="row tally">
        Number of wins in a row: {winTally}
      </div>
    </div>
  );
};

export default Button;
