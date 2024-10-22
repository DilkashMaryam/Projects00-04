#! /usr/bin/env node

console.log("Guess a number between 1 to 10");
// now variable create
let a:number=Math.floor(Math.random()*5)
import inquirer from "inquirer";
while(true){
    let input = await inquirer.prompt(
        {name: "guess", type: "number",
    message: "Enter your guess number you want between 1 to 10:"}
    )
    //provide code
    let ans: number= input.guess
    if  (a==ans)
{console.log("Congratulations your guess number is correct")
break;}
else{console.log("Sorry you guess a wrong number, try again!")}
}