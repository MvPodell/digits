import { React, useState, useEffect } from "react";
import { calculateExpression } from "../Calculate";

export const NumberButtons = ({ buttonStates, setButtonStates, clickedButtons, setClickedButtons, clickedIndices, setClickedIndices, setCurrentTotal, numbersGenerated, success }) => {
    const validOperations = ["+", "-", "*", "/"];


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
        }
    };

    const handleOperationClick = (operation) => {
        if (numbersGenerated && !validOperations.includes(clickedButtons[clickedButtons.length - 1]) && clickedButtons.length != 0) {
            // setClickedIndices([...clickedIndices, operation]);
            setClickedButtons([...clickedButtons, operation]);
            const result = calculateExpression(clickedButtons.concat([operation]));
            setCurrentTotal(result);
        } else {
            console.log("invalid operation use");
        }
    };

    const handleUndo = () => {
        let lastButton = clickedButtons[clickedButtons.length - 1];
        let result;
        if (!validOperations.includes(lastButton)) {
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
        <div className="buttonContainer">
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
        </div>
    )
};