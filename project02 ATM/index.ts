import {User} from './User';
import {generateUsers, prompt, sleep} from './utils';

async function atmMenu(user: User){
    let exit = false;
    while (!exit){
        console.log(`
            ATM Menu:
            1.Check Balance
            2.Deposite Money
            3.Widrawl Cash
            4.Exit
            `);
            const option = await prompt("Choose an option(1-4): ");
            switch(option) {
                case '1':
                    console.log(`Your balance is Rs.${user.checkBalance()}`);
                    break;
                case '2':
                    const depositeAmount = parseInt(await prompt("Enter amount to deposite: "));
                    if (!isNaN(depositeAmount) && depositeAmount > 0){
                        user.deposit(depositeAmount);
                    } else {
                        console.log("Invalid deposite amount.");
                    }
                    break;
                case '3':
                    const withdrawAmount = parseInt(await prompt("Enter amount to withdraw: "));
                    if(!isNaN(withdrawAmount) && withdrawAmount > 0){
                        user.withdraw(withdrawAmount);
                    } else {
                        console.log("Invalid withdrawal amount")
                    }
                    break;
                case '4':
                    exit = true;
                    console.log("Thankyou for using our ATM, Goodbye!");
                    break;
                default:
                    console.log("Invalid option. Please choose between 1-4.");
            }
            await sleep (1000);
    }
}
async function main(){
    const users = generateUsers(5);  // Generate 5 random users
    console.log("Welcome to the ATM!");

    let loggedIn = false;
    let currentUser: User | null = null;

    while (!loggedIn) {
        const userId = await prompt("Enter User ID: ");
        const pin = await prompt("Enter PIN: ");

        const user = users.find(u => u.userId === userId && u.pin === pin);
        if (user) {
            console.log("Login successful!");
            currentUser = user;
            loggedIn = true;
        } else{
            console.log("Invalid User ID or PIN. Please try again.");
        }
}
if (currentUser) {
    await atmMenu(currentUser);
}
}

main();