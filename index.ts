#! /usr/bin/env node

import inquirer from "inquirer";

// Function to generate a random number between 1 and 10
function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// Function to play the game
async function playGame() {
    const generatedNo = generateRandomNumber();
    let attempts = 3;

    while (attempts > 0) {
        // Ask user to enter their guess
        let { userGuess }: { userGuess: number } = await inquirer.prompt({
            type: "number",
            name: "userGuess",
            message: `Guess the number (between 1 to 10). ${attempts} attempts left:`
        });

        // Validate user input
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            console.log("Please enter a number between 1 and 10.");
            continue;
        }

        // Check if the user's guess is correct
        if (userGuess === generatedNo) {
            console.log("Congratulations, you guessed it right!");
            exitConfirmation();
            return;
        } else {
            console.log(`Incorrect guess. ${attempts - 1} attempts left.`);
        }

        attempts--;
    }

    // If all attempts are exhausted
    console.log(`Oh no! The correct number was ${generatedNo}.`);
    exitConfirmation();
}

// Function to ask if the user wants to play again
function exitConfirmation() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'repeat',
            message: 'Want to play again?'
        }
    ]).then((answers) => {
        if (answers.repeat) {
            playGame();
        } else {
            console.log('Thanks for playing!');
            process.exit();
        }
    });
}

// Start the game
playGame();
