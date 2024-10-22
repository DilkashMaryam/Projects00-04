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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const conversionRates = {
    USD: { EUR: 0.85, GBP: 0.75, INR: 74.50, PKR: 280.00 },
    EUR: { USD: 1.18, GBP: 0.88, INR: 87.60, PKR: 330.00 },
    GBP: { USD: 1.33, EUR: 1.14, INR: 99.20, PKR: 380.00 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.010, PKR: 3.50 },
    PKR: { USD: 0.0036, EUR: 0.0030, GBP: 0.0026, INR: 0.29 },
};
const availableCurrencies = ["USD", "EUR", "GBP", "INR", "PKR"];
function convertCurrency(amount, fromCurrency, toCurrency) {
    var _a;
    if (fromCurrency === toCurrency) {
        return amount;
    }
    const conversionRate = (_a = conversionRates[fromCurrency]) === null || _a === void 0 ? void 0 : _a[toCurrency];
    if (!conversionRate) {
        throw new Error("Invalid currency conversion");
    }
    return amount * conversionRate;
}
function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const answers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the amount you want to convert:',
                    validate: (input) => {
                        const value = parseFloat(input);
                        return isNaN(value) || value <= 0 ? 'Please enter a valid positive number' : true;
                    },
                },
                {
                    type: 'list',
                    name: 'fromCurrency',
                    message: 'Select the currency you are converting from:',
                    choices: availableCurrencies,
                },
                {
                    type: 'list',
                    name: 'toCurrency',
                    message: 'Select the currency you are converting to:',
                    choices: availableCurrencies,
                },
            ]);
            const amount = parseFloat(answers.amount);
            const fromCurrency = answers.fromCurrency;
            const toCurrency = answers.toCurrency;
            try {
                const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
                console.log(`\n${amount} ${fromCurrency} is approximately equal to ${convertedAmount.toFixed(2)} ${toCurrency}\n`);
            }
            catch (error) {
            }
            const { repeat } = yield inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'repeat',
                    message: 'Would you like to convert another currency?',
                },
            ]);
            if (repeat) {
                yield promptUser();
            }
            else {
                console.log("Thank you for using the currency converter!");
                process.exit();
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
promptUser();
