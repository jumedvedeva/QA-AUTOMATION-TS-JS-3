/**робити файл logical.js, у якому створити щонайменше по 1 змінній різних типів та
 * виконати вивчені логічні операції над змінними (операції порівняння і логічні оператори).
 *Результат операцій повинен виводитися до консолі.*/

const x = 10;
const y = 5;
const z = '10';
const isTrue = true;

console.log(x > y); // true
console.log(x < y); // false
console.log(x === z); // false
console.log(x == z); // true
console.log(isTrue && (x > y)); // true
console.log(isTrue || (x < y)); // true
console.log(!isTrue); // false
console.log((x > y) && (x === z)); // false
console.log((x > y) || (x === z)); // true
console.log((x > y) && (x == z)); // true
console.log((x > y) || (x == z)); // true
