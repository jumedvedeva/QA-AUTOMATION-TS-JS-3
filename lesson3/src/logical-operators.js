const a = 0;
const b = 1;
const c = 'str';
const d = '1';
const e = 'str';

console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);
console.log(a === b);
console.log(a !== b);

console.log(b === d);
console.log(b == d);

console.log(a !== d);
console.log(a != d);

console.log(c === d);
console.log(c === e);

// logical operators
const f = true;
const g = false;
console.log(f && g);
console.log(f || g);
console.log(!f);
console.log(!g);

const h = undefined;
const i = null;
const j = h ?? i ?? 'default value';
console.log(j);
