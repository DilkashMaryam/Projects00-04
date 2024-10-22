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
let tasks = [];
let taskIdCounter = 1;
function addTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the task title:',
            },
        ]);
        const newTask = {
            id: taskIdCounter++,
            title: answer.title,
            completed: false,
        };
        tasks.push(newTask);
        console.log(`Task "${newTask.title}" added!`);
    });
}
function listTasks() {
    if (tasks.length === 0) {
        console.log('No tasks available.');
        return;
    }
    tasks.forEach((task) => {
        const status = task.completed ? '[x]' : '[ ]';
        console.log(`${task.id}. ${status} ${task.title}`);
    });
}
function completeTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskChoices = tasks.map(task => ({
            name: task.title,
            value: task.id,
        }));
        const answer = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'taskId',
                message: 'Select a task to mark as complete:',
                choices: taskChoices,
            },
        ]);
        const task = tasks.find(t => t.id === answer.taskId);
        if (task) {
            task.completed = true;
            console.log(`Task "${task.title}" marked as completed!`);
        }
    });
}
function deleteTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskChoices = tasks.map(task => ({
            name: task.title,
            value: task.id,
        }));
        const answer = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'taskId',
                message: 'Select a task to delete:',
                choices: taskChoices,
            },
        ]);
        tasks = tasks.filter(task => task.id !== answer.taskId);
        console.log('Task deleted successfully.');
    });
}
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Add a task', 'List tasks', 'Complete a task', 'Delete a task', 'Exit'],
            },
        ]);
        switch (answer.action) {
            case 'Add a task':
                yield addTask();
                break;
            case 'List tasks':
                listTasks();
                break;
            case 'Complete a task':
                yield completeTask();
                break;
            case 'Delete a task':
                yield deleteTask();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
        yield mainMenu();
    });
}
mainMenu();
