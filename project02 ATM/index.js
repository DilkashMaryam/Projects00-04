"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function atmMenu(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let exit = false;
        while (!exit) {
            console.log(`
            ATM Menu:
            1.Check Balance
            2.Deposite Money
            3.Widrawl Cash
            4.Exit
            `);
            const option = yield (0, utils_1.prompt)("Choose an option(1-4): ");
            switch (option) {
                case '1':
                    console.log(`Your balance is Rs.${user.checkBalance()}`);
                    break;
                case '2':
                    const depositeAmount = parseInt(yield (0, utils_1.prompt)("Enter amount to deposite: "));
                    if (!isNaN(depositeAmount) && depositeAmount > 0) {
                        user.deposit(depositeAmount);
                    }
                    else {
                        console.log("Invalid deposite amount.");
                    }
                    break;
                case '3':
                    const withdrawAmount = parseInt(yield (0, utils_1.prompt)("Enter amount to withdraw: "));
                    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
                        user.withdraw(withdrawAmount);
                    }
                    else {
                        console.log("Invalid withdrawal amount");
                    }
                    break;
                case '4':
                    exit = true;
                    console.log("Thankyou for using our ATM, Goodbye!");
                    break;
                default:
                    console.log("Invalid option. Please choose between 1-4.");
            }
            yield (0, utils_1.sleep)(1000);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = (0, utils_1.generateUsers)(5); // Generate 5 random users
        console.log("Welcome to the ATM!");
        let loggedIn = false;
        let currentUser = null;
        while (!loggedIn) {
            const userId = yield (0, utils_1.prompt)("Enter User ID: ");
            const pin = yield (0, utils_1.prompt)("Enter PIN: ");
            const user = users.find(u => u.userId === userId && u.pin === pin);
            if (user) {
                console.log("Login successful!");
                currentUser = user;
                loggedIn = true;
            }
            else {
                console.log("Invalid User ID or PIN. Please try again.");
            }
        }
        if (currentUser) {
            yield atmMenu(currentUser);
        }
    });
}
main();
