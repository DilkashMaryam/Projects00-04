import { User } from './User';
import readline from 'readline';

// Randomly generate users with ID, PIN, and balance
export function generateUsers(count: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
        const userId = Math.floor(1000 + Math.random() * 9000).toString();  // Random 4-digit ID
        const pin = Math.floor(1000 + Math.random() * 9000).toString();  // Random 4-digit PIN
        const balance = Math.floor(Math.random() * 100000);  // Random balance between 0-100000
        users.push(new User(userId, pin, balance));
    }
    return users;
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function prompt(question: string): Promise<string> {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => rl.question(question, (answer: string) => {
        rl.close();
        resolve(answer);
    }));
}
