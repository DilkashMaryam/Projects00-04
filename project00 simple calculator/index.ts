#! /usr/bin/env node

import inquirer from "inquirer";

const answer = await inquirer.prompt([
  { messsage: "Enter your first number", type: "number", name: "firstNumber" },
  {
    messsage: "Enter your second number",
    type: "number",
    name: "secondNumber",
  },
  {
    message: "select one of operators to perform action",
    type: "list",
    name: "operator",
    choices: ["addition", "subtraction", "multiplication", "division"],
  },
])
  // CONDITIONAL STATEMENT
  if (answer.operator === "addition"){
    console.log(answer.firstNumber + answer.secondNumber);
  } else if(answer.operator === "subtraction"){
    console.log(answer.firstNumber - answer.secondNumber);
  } else if(answer.operator === "multiplication"){
    console.log(answer.firstNumber * answer.secondNumber);
  } else if(answer.operator === "division"){
    console.log(answer.firstNumber / answer.secondNumber);
  }
  else {"Please select correct operator"}


