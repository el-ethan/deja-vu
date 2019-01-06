#!/usr/bin/env node

const {Incident} = require('./models.js');
const colors = require('colors');
const connect = require('./database.js');
const inquirer = require('inquirer');

const connection = connect();

main().then(() => connection.close());

async function main() {
    const mode = await promptForMode();
    if (mode === "search") {
        return promptToSearchIncidents();
    } else {
        return promptToReportIncident();
    }
}

async function promptToSearchIncidents() {
    const searchQuery = {
        type: 'input',
        name: 'searchQuery',
        message: 'What is the issue you are seeing?'
    };

    const answers = await inquirer.prompt([searchQuery]);

    const caseInsensitiveFlag = 'i';
    const problemRegex = new RegExp(`.*${answers.searchQuery}.*`, caseInsensitiveFlag);
    const found = Incident.find({problem: problemRegex});
    const foundIncidents = await found.exec();
    console.log(`${foundIncidents.length} incident(s) found:\n`);
    foundIncidents.forEach((incident) => {
        console.log(`Issue: ${incident.problem.yellow}\n`);
        console.log(`Solution: ${incident.solution.green}\n`);
    });
}

async function promptToReportIncident() {
    const questions = [
        {
            type: 'editor',
            name: 'problem',
            message: 'What is the issue you are seeing?'
        },
        {
            type: 'input',
            name: 'solution',
            message: 'Do you have a solution?'
        }
    ];
    const answers = await inquirer.prompt(questions);
    const incident = new Incident({problem: answers.problem, solution: answers.solution});
    await incident.save();
}

async function promptForMode() {
    const questions = [
        {
            type: 'checkbox',
            name: 'modeChoice',
            choices: ['search', 'add'],
            default: ['search']
        }
    ];
    const answers = await inquirer.prompt(questions);
    return answers.modeChoice.pop();
}
