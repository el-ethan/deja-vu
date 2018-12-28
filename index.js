const {Incident} = require('./models.js');
const connection = require('./database.js').connect();
const inquirer = require('inquirer');

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
    console.log(foundIncidents);
}

async function promptToReportIncident() {
    const questions = [
        {
            type: 'input',
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
    const connection = connect();
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
    if (answers.modeChoice.pop() === 'search') {
        return promptToSearchIncidents();
    } else {
        return promptToReportIncident();
    }
}

promptForMode().then(() => connection.close());
