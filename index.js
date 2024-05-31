#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
// Classes Player & Opponent
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
async function main() {
    // Player Name & Opponent Select
    let player = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Please Enter Your Name:"
    });
    let opponent = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select Opponent",
        choices: ["Skeleton", "Assassin", "Zombie"]
    });
    // Gather Data
    let p1 = new Player(player.name);
    let o1 = new Opponent(opponent.select);
    do {
        let ask = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "Select your action",
            choices: ["Attack", "Drink Potion", "Run For Your Life.."]
        });
        if (ask.action === "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`));
                console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
                if (p1.fuel <= 0) {
                    console.log(chalk.red.bold.italic("You Lose, Better Luck Next Time"));
                    process.exit();
                }
            }
            else {
                o1.fuelDecrease();
                console.log(chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`));
                console.log(chalk.bold.red(`${o1.name} fuel is ${o1.fuel}`));
                if (o1.fuel <= 0) {
                    console.log(chalk.green.bold.italic("You Win!"));
                    process.exit();
                }
            }
        }
        else if (ask.action === "Drink Potion") {
            p1.fuelIncrease();
            console.log(chalk.bold.italic.green(`You Drink Health Potion. Your fuel is ${p1.fuel}`));
        }
        else if (ask.action === "Run For Your Life..") {
            console.log(chalk.red.bold.italic("You Lose, Better Luck Next Time"));
            process.exit();
        }
    } while (true);
}
main();
