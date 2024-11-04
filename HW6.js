// Select elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let previousInput = '';
let operator = null;

// Function to update the display
function updateDisplay(value) {
  display.textContent = value;
}

// Function to handle button clicks (Using Foreach method as mentioned in the class)
buttons.forEach(button => {
  
  button.addEventListener('click', () => {
    
    const value = button.textContent;

    // Handle clear button
    if (value === 'C') {
    
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay('0');
      
      return;
    }

    // To Handle backspace button
    if (value === '←') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
      
      return;
    }

    // To Handle number button clicks
    if (!isNaN(value) || value === '0') {
      currentInput += value;
      updateDisplay(currentInput);
      return;
    }

    // ToHandle operator button clicks
    if (['+', '-', '×', '÷'].includes(value)) {
      if (currentInput === '' && previousInput === '') {
        return; // Prevent operator entry if no numbers exist
      }

      if (currentInput !== '') {
        if (previousInput !== '') {
          previousInput = calculate(previousInput, currentInput, operator);
          updateDisplay(previousInput);
        } else {
          previousInput = currentInput;
        }
      }
      currentInput = '';
      operator = value;
      return;
    }

    // To Handle equal button click
    if (value === '=') {
      if (operator && previousInput !== '' && currentInput !== '') {
        currentInput = calculate(previousInput, currentInput, operator);
        
        updateDisplay(currentInput);
        previousInput = '';
        operator = null;
      }
    }
  });
});

// The Function to perform the calculations (basic switch case statements)

function calculate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case '+':
      return (num1 + num2).toString();
    case '-':
      return (num1 - num2).toString();
    case '×':
      return (num1 * num2).toString();
    case '÷':
      if (num2 !== 0) {
        return (num1 / num2).toString();
      } else {
        alert('Error: Division by zero');
        return '0';
      }
    default:
      return num2.toString();
  }
}
