export class User {
    userId: string;
    pin: string;
    balance: number;

    constructor(userId: string, pin: string, balance: number) {
        this.userId = userId;
        this.pin = pin;
        this.balance = balance;
    }

    checkBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Successfully deposited Rs.${amount}. New balance: Rs.${this.balance}`);
    }
    
    withdraw(amount: number): boolean {
        if (amount > this.balance) {
            console.log("Insufficient balance!");
            return false;
        } else {
            this.balance -= amount;
            console.log(`Successfully withdrew Rs.${amount}. New balance: Rs.${this.balance}`);
            return true;
        }
    }
}
