// Get the display element
const display = document.getElementById('display');
// Initialize current input and operator states
let currentInput = '';
let operator = null;
let previousInput = '';
let isResultDisplayed = false;

// Function to append a number to the display
function appendNumber(number) {
    // If a result was just displayed, start a new calculation
    if (isResultDisplayed) {
        currentInput = number.toString();
        isResultDisplayed = false;
    } else {
        currentInput += number.toString();
    }
    updateDisplay();
}

// Function to append an operator
function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    // If an operator is already set and we have a current input,
    // perform the previous calculation before setting the new operator
    if (operator && currentInput !== '') {
        calculate();
        previousInput = display.textContent;
    } else if (currentInput !== '') {
        previousInput = currentInput;
    }
    operator = op;
    currentInput = '';
    isResultDisplayed = false;
    updateDisplay();
}

// Function to perform the calculation
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === null) {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    // Use if-else if statements to determine the operation
    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        if (current === 0) {
            display.textContent = 'Error';
            resetCalculator();
            return;
        }
        result = prev / current;
    } else if (operator === '%') {
        // Modulo operator for the new '%' button
        result = prev % current;
    } else if (operator === '^') {
        // Power operator for the new '^' button
        result = Math.pow(prev, current);
    }

    display.textContent = result;
    currentInput = result.toString();
    previousInput = '';
    operator = null;
    isResultDisplayed = true;
}

// Function to clear the display and reset the calculator
function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = '';
    isResultDisplayed = false;
    display.textContent = '0';
}

// Function to update the display text
function updateDisplay() {
    // Use a loop to check if the current input is a single decimal point
    if (currentInput === '.') {
        display.textContent = '0.';
    } else {
        display.textContent = currentInput;
    }

    // Update display to show previous and current values during operation
    if (previousInput !== '' && operator !== null) {
        display.textContent = `${previousInput} ${operator} ${currentInput}`;
    }
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9') {
        appendNumber(parseInt(key));
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '^') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault(); // Prevent default action for "Enter" key
        calculate();
    } else if (key === 'Backspace') {
        // A basic backspace functionality
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
