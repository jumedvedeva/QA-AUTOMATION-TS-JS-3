import { sumArrayTask } from './functions-task.js';
import { sumArray } from './arrow-functions.js';

const numbers: number[] = [1, 2, 3, 4, 5];

console.log('=== Testing sumArrayTask (regular function) ===');
const result1: number = sumArrayTask(numbers);
console.log(`sumArrayTask([${numbers}]) =`, result1);

console.log('\n=== Testing sumArray (arrow function) ===');
const result2: number = sumArray(numbers);
console.log(`sumArray([${numbers}]) =`, result2);
