import inquirer from 'inquirer';

const conversionRates: { [key: string]: { [key: string]: number } } = {
  USD: { EUR: 0.85, GBP: 0.75, INR: 74.50, PKR: 280.00 },
  EUR: { USD: 1.18, GBP: 0.88, INR: 87.60, PKR: 330.00 },
  GBP: { USD: 1.33, EUR: 1.14, INR: 99.20, PKR: 380.00 },
  INR: { USD: 0.013, EUR: 0.011, GBP: 0.010, PKR: 3.50 },
  PKR: { USD: 0.0036, EUR: 0.0030, GBP: 0.0026, INR: 0.29 },
};

const availableCurrencies = ["USD", "EUR", "GBP", "INR", "PKR"];

function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) {
    return amount; 
  }

  const conversionRate = conversionRates[fromCurrency]?.[toCurrency];

  if (!conversionRate) {
    throw new Error("Invalid currency conversion");
  }

  return amount * conversionRate;
}

async function promptUser() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Enter the amount you want to convert:',
        validate: (input: string) => {
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
    } catch (error) {
      
    }

    const { repeat } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'repeat',
        message: 'Would you like to convert another currency?',
      },
    ]);

    if (repeat) {
      await promptUser();
    } else {
      console.log("Thank you for using the currency converter!");
      process.exit();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
promptUser();
