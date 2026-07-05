import { sumArrayTask } from './functions-task.js';
import { sumArray } from './arrow-functions.js';
import { company } from './getter-setter.js';

console.log('--------functions tasks--------');
const stringArray = ['1', '2', '3', '4', '5'];
const numberArray = [1, 2, 3, 4, 5];
console.log('String array result:', sumArrayTask(stringArray));
console.log('Number array result:', sumArrayTask(numberArray));


console.log('--------arrow functions--------');
const stringArrayArrow = ['1', '2', '3', '4', '5'];
const numberArrayArrow = [1, 2, 3, 4, 5];

console.log('String array result:', sumArray(stringArrayArrow));
console.log('Number array result:', sumArray(numberArrayArrow));


console.log('--------getter and setter--------');
company.revenue = 120000;
company.finance.budget = 80000;
company.finance.expenses = 45000;

console.log('');

// --- Using getters ---
console.log('Current revenue (getter):',   company.revenue);
console.log('Current budget (getter):',    company.finance.budget);
console.log('Current expenses (getter):',  company.finance.expenses);
console.log('Remaining budget (getter):',  company.finance.remaining);
console.log('Company profit (getter):',    company.profit);

console.log('');

// --- Trigger validation ---
//company.finance.expenses = 999999;
//company.revenue = -500;
//company.finance.budget = -1000;
