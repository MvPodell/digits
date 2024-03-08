import { useState } from "react";

export const applyOperation = (num1, operation, num2) => {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return num1;
  }
};

export const calculateExpression = (inputList) => {
  // if (inputList.length < 3 || inputList.length % 2 !== 0) {
  //   console.error("Invalid input format");
  //   return null;
  // }

  let result = parseFloat(inputList[0]);

  for (let i = 1; i < inputList.length - 1; i += 2) {
    const operation = inputList[i];
    const operand = parseFloat(inputList[i + 1]);

    switch (operation) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "/":
        if (operand === 0) {
          console.error("Division by zero");
          return null;
        }
        result /= operand;
        break;
      default:
        console.error("Invalid operation:", operation);
        return null;
    }
  }
  let lastOperation;
  let lastElement;

  const validOperations = ["+", "-", "*", "/"];
  if (inputList.length > 1) {
    lastElement = inputList[inputList.length - 1];
    if (validOperations.includes(lastElement)) {
      lastOperation = lastElement;
    }
  } else {
    lastOperation = "";
  }
  
  return [result, lastOperation];
};

export const isIntegerAchievable = (targetNumber, randomNumber) => {
  const operations = ["+", "-", "*", "/"];
  const randomIndex = Math.floor(Math.random() * operations.length); // Generate a random index
  const randomOperation = operations[randomIndex]; // Pick a random operation
  const result = applyOperation(targetNumber, randomOperation, randomNumber);

  if (Number.isInteger(result)) {
    return randomOperation;
  }

  return null; // If no operation results in an integer
};

export const calculateResult = (clickedButtons) => {
  if (clickedButtons.length === 1) {
    return clickedButtons[0];
  }
  // const [shifted, setShifted] = useState(true;)
  if (clickedButtons.length < 3 || clickedButtons.length % 2 !== 1) {
    console.error("Invalid number of operations");
    return null;
  } else {
    let operation;
    let operand;
    let result;
    // Pop the first integer from the queue
    while (clickedButtons.length >= 3) {
      // console.log("current stack:", clickedButtons);
      result = parseFloat(clickedButtons.shift());
      operation = clickedButtons.shift(); // Pop the operation from the queue
      operand = parseFloat(clickedButtons.shift()); // Pop the next integer from the queue
      switch (operation) {
        case "+":
          result += operand;
          clickedButtons.unshift(result.toString());
          // shifted = false;
          break;
        case "-":
          result -= operand;
          clickedButtons.unshift(result.toString());
          // shifted = false;
          break;
        case "*":
          result *= operand;
          clickedButtons.unshift(result.toString());
          // shifted = false;
          break;
        case "/":
          result /= operand;
          clickedButtons.unshift(result.toString());
          // shifted = false;
          break;
        default:
          // Handle invalid operations
          console.error("Invalid operation:", operation);
          break;
      }
    }
    return result;
  }
};

// Fisher-Yates (Knuth) Shuffle Algorithm
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
