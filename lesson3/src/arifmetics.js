/**Сформувати файл arifmetics.js, у якому додати щонайменше по 2 змінні різних типів та
 * виконати арифметичні операції над змінними як однакових типів, так і різних.
 * Результат операцій повинен виводитися до консолі.*/

const a = 10;
const b = 5;
const c = '20';
const d = 'Hello';

console.log(a + b); // 15
console.log(a - b); // 5
console.log(a * b); // 50
console.log(a / b); // 2

console.log(c - a); // 10
console.log(c * a); // 200
console.log(c / a); // 2

console.log(d + c); // "Hello20"
console.log(d * a); // NaN
