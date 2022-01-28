#!usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { rainbow } from "chalk-animation";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.pulse("EPIC MARVEL FANBOI QUIZ\n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `🤬🤬🤬 Game over, Fuck you loser ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n TRUE FANBOI 3000`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Spider man's alter ego was?\n",
    choices: ["Peter Parker", "Harry Osborn", "Ned", "Ben Parker"],
  });

  return handleAnswer(answers.question_1 === "Peter Parker");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Who played the Amazing Spider Man?\n",
    choices: [
      "Miles Morales",
      "Andrew Garfleild",
      "Tom Holland",
      "Toby Maguire",
    ],
  });
  return handleAnswer(answers.question_2 === "Andrew Garfleild");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `Scarlett Witch's brother?\n`,
    choices: ["Dr.Strange", "Vision", "Black Panther", "Quick Silver"],
  });

  return handleAnswer(answers.question_3 === "Quick Silver");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Wakanda has plentyful of _______\n",
    choices: [
      "Vibranium",
      "Admantium",
      "Silver",
      "Platinum", // Correct
    ],
  });
  return handleAnswer(answers.question_4 === "Vibranium");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "With which metal volverine covered its skeleton?\n",
    choices: ["Vibranium", "Admantium", "Silver", "Platinum"],
  });

  return handleAnswer(answers.question_5 === "Admantium");
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
