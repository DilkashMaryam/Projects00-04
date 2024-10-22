"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, pin, balance) {
        this.userId = userId;
        this.pin = pin;
        this.balance = balance;
    }
    checkBalance() {
        return this.balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Successfully deposited Rs.${amount}. New balance: Rs.${this.balance}`);
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient balance!");
            return false;
        }
        else {
            this.balance -= amount;
            console.log(`Successfully withdrew Rs.${amount}. New balance: Rs.${this.balance}`);
            return true;
        }
    }
}
exports.User = User;
