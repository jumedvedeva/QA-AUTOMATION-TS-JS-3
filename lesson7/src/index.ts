import { doNothing, getCurrentEnumAsString, sum, createNewDog, selectNumbers, selectNumbersForMixedArray, createNewDogWithOptionalParameters, listObjectKeysWithObjectParameter, listObjectKeysWithUnknownParameter, listObjectKeysWithRecordParameter } from './functions.js';
import { List } from './new-types.js';

const arrNumbers: number[] = [1, 2, 3, 4, 5];
const arrStrings: string[] = ['a', 'b', 'c', 'd', 'e'];
console.log(arrNumbers);
console.log(arrStrings);

const sumResult = sum(5, 10);
console.log(sumResult);

doNothing();

const value1 = getCurrentEnumAsString(List.one);
console.log(value1);

const value2 = getCurrentEnumAsString(List.two);
console.log(value2);

const value3 = getCurrentEnumAsString(List.three);
console.log(value3);

const value4 = getCurrentEnumAsString(List.four);
console.log(value4);

const value5 = getCurrentEnumAsString(List.five);
console.log(value5);

const patron = createNewDog('Buddy', 3, 25, 10);
console.log(patron);

const filteredArray = selectNumbers([1, 2, 3, 4]);
console.log(filteredArray);

const filteredArrayWithStringInput = selectNumbers(['1', '2', '3', '4']);
console.log(filteredArrayWithStringInput);

const mixedArray = [1, '2', 3, '4', 5];
const filteredMixedArray = selectNumbersForMixedArray(mixedArray);
console.log(filteredMixedArray);

const arr: (number | string)[] = [1, 2, 3, 4];
arr.push('5');
// arr.push({}) - will generate an error because of the type definition of the array

console.log(createNewDogWithOptionalParameters ('Buddy', 3, 20));

console.log(listObjectKeysWithUnknownParameter({name: 'John', age: 30}));
console.log(listObjectKeysWithUnknownParameter(1));

console.log(listObjectKeysWithObjectParameter(patron));

console.log(listObjectKeysWithRecordParameter({name: 'Alice', age: 25, city: 'New York', [Symbol('id')]: 123}));
