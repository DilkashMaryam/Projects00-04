import inquirer from 'inquirer';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}
let tasks: Task[] = [];
let taskIdCounter = 1;

async function addTask(): Promise<void> {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the task title:',
    },
  ]);

  const newTask: Task = {
    id: taskIdCounter++,
    title: answer.title,
    completed: false,
  };

  tasks.push(newTask);
  console.log(`Task "${newTask.title}" added!`);
}

function listTasks(): void {
  if (tasks.length === 0) {
    console.log('No tasks available.');
    return;
  }

  tasks.forEach((task) => {
    const status = task.completed ? '[x]' : '[ ]';
    console.log(`${task.id}. ${status} ${task.title}`);
  });
}

async function completeTask(): Promise<void> {
  const taskChoices = tasks.map(task => ({
    name: task.title,
    value: task.id,
  }));

  const answer = await inquirer.prompt([
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
}

async function deleteTask(): Promise<void> {
  const taskChoices = tasks.map(task => ({
    name: task.title,
    value: task.id,
  }));

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'taskId',
      message: 'Select a task to delete:',
      choices: taskChoices,
    },
  ]);

  tasks = tasks.filter(task => task.id !== answer.taskId);
  console.log('Task deleted successfully.');
}

async function mainMenu(): Promise<void> {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add a task', 'List tasks', 'Complete a task', 'Delete a task', 'Exit'],
    },
  ]);

  switch (answer.action) {
    case 'Add a task':
      await addTask();
      break;
    case 'List tasks':
      listTasks();
      break;
    case 'Complete a task':
      await completeTask();
      break;
    case 'Delete a task':
      await deleteTask();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  await mainMenu(); 
}

mainMenu();
