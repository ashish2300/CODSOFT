console.log('Calculator script loaded');
const display = document.getElementById('display');
if (!display) {
    console.error('Display element not found');
} else {
    display.value = '0';
}

// Verify buttons are loaded
const buttons = document.querySelectorAll('button');
if (buttons.length === 0) {
    console.error('No buttons found');
}

let currentInput = '';
let operator = '';
let operand1 = '';
let operand2 = '';
let lastOperation = false; // Track if last operation was =

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      currentInput = '';
      operator = '';
      operand1 = '';
      operand2 = '';
      lastOperation = false;
      display.value = '0';
    } else if (value === '=') {
      if (operator && operand1 && currentInput) {
        operand2 = currentInput;
        let result;
        
        try {
          if (operator === '+') result = parseFloat(operand1) + parseFloat(operand2);
          else if (operator === '-') result = parseFloat(operand1) - parseFloat(operand2);
          else if (operator === '*') result = parseFloat(operand1) * parseFloat(operand2);
          else if (operator === '/') {
            if (parseFloat(operand2) === 0) {
              display.value = 'Error: Division by zero';
              return;
            }
            result = parseFloat(operand1) / parseFloat(operand2);
          }
          
          display.value = result;
          currentInput = result.toString();
          operand1 = currentInput;
          operator = '';
          lastOperation = true;
        } catch (e) {
          display.value = 'Error';
        }
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        operand1 = currentInput;
        operator = value;
        currentInput = '';
        lastOperation = false;
        display.value = operand1 + ' ' + operator;
      }
    } else {
      if (lastOperation) {
        currentInput = '';
        lastOperation = false;
      }
      
      // Handle decimal point
      if (value === '.' && currentInput.includes('.')) return;
      
      currentInput += value;
      display.value = currentInput;
    }
  });
});
