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
exports.prompt = exports.sleep = exports.generateUsers = void 0;
const User_1 = require("./User");
// Randomly generate users with ID, PIN, and balance
function generateUsers(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
        const userId = Math.floor(1000 + Math.random() * 9000).toString(); // Random 4-digit ID
        const pin = Math.floor(1000 + Math.random() * 9000).toString(); // Random 4-digit PIN
        const balance = Math.floor(Math.random() * 100000); // Random balance between 0-100000
        users.push(new User_1.User(userId, pin, balance));
    }
    return users;
}
exports.generateUsers = generateUsers;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function prompt(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((resolve) => rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        }));
    });
}
exports.prompt = prompt;
