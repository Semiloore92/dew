const result = document.getElementById("result");
const previous = document.getElementById("previous");
const buttons = document.getElementById("buttons");

let current = "0";
let firstNumber = null;
let operator = null;
let waitingForNumber = false;

function updateDisplay() {
result.textContent = current;
}

function formatNumber(number) {
if (!Number.isFinite(number)) return "Error";
 
return Number(number.toPrecision(12)).toString();
}

function inputNumber(value) {

if (current === "Error") clearCalculator();

if (waitingForNumber) {
current = value === "." ? "0." : value;
waitingForNumber = false;
}

else if (value === ".") {

if (!current.includes(".")) {
current += ".";
}

}
 

else {

current = current === "0"
? value
: current + value;

}

updateDisplay();
}

function chooseOperator(nextOperator) {

const input = parseFloat(current);

if (current === "Error") return;

if (operator && !waitingForNumber) {
calculate();
 
}

else {
firstNumber = input;
}

operator = nextOperator;
waitingForNumber = true;

previous.textContent =
formatNumber(firstNumber) + " " +
getSymbol(operator);
}

function getSymbol(op) {

const symbols = {
"+": "+",
"-": "−",
"*": "×",
 
"/": "÷"
};

return symbols[op];
}

function calculate() {

if (operator === null || firstNumber === null) return;

const secondNumber = parseFloat(current);

let answer;

switch (operator) {

case "+":
answer = firstNumber + secondNumber;
break;
 

case "-":
answer = firstNumber - secondNumber;
break;

case "*":
answer = firstNumber * secondNumber;
break;

case "/":
answer = secondNumber === 0
? NaN
: firstNumber / secondNumber;
break;

default:
return;
}

previous.textContent =
 
formatNumber(firstNumber) + " " +
getSymbol(operator) + " " +
formatNumber(secondNumber) + " =";

current = Number.isFinite(answer)
? formatNumber(answer)
: "Error";

firstNumber = null;
operator = null;
waitingForNumber = true;

updateDisplay();
}

function clearCalculator() {

current = "0";
firstNumber = null;
operator = null;
 
waitingForNumber = false;

previous.textContent = "";

updateDisplay();
}

function deleteNumber() {

if (waitingForNumber || current === "Error") return;

current = current.length > 1
? current.slice(0, -1)
: "0";

updateDisplay();
}

function percentage() {
 

if (current === "Error") return;

current = formatNumber(parseFloat(current) / 100);

updateDisplay();
}

// BUTTON CLICK EVENTS

buttons.addEventListener("click", function(event) {

const button = event.target.closest("button");

if (!button) return;

const action = button.dataset.action;
const value = button.dataset.value;
 

if (action === "clear") {
clearCalculator();
}

else if (action === "delete") {
deleteNumber();
}

else if (action === "percent") {
percentage();
}

else if (action === "equal") {
calculate();
}

else if (["+", "-", "*", "/"].includes(value)) {
chooseOperator(value);
}
 

else if (value !== undefined) {
inputNumber(value);
}

});

// KEYBOARD SUPPORT

document.addEventListener("keydown", function(event) {

const key = event.key;

if (/^[0-9.]$/.test(key)) {
inputNumber(key);
}

else if (["+", "-", "*", "/"].includes(key)) {
chooseOperator(key);
 
}

else if (key === "Enter" || key === "=") {
event.preventDefault();
calculate();
}

else if (key === "Backspace") {
deleteNumber();
}

else if (key === "Escape") {
clearCalculator();
}

else if (key === "%") {
percentage();
}

});
 