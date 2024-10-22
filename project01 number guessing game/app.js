#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Guess a number between 1 to 10");
// now variable create
let a = Math.floor(Math.random() * 5);
const inquirer_1 = __importDefault(require("inquirer"));
while (true) {
    let input = await inquirer_1.default.prompt({ name: "guess", type: "number",
        message: "Enter your guess number you want between 1 to 10:" });
    //provide code
    let ans = input.guess;
    if (a == ans) {
        console.log("Congratulations your guess number is correct");
        break;
    }
    else {
        console.log("Sorry you guess a wrong number, try again!");
    }
}
