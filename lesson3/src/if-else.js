const a = 0;
// eslint-disable-next-line no-unused-vars
const b = 1;
// eslint-disable-next-line no-unused-vars
const c = 'str';
const d = '1';
// eslint-disable-next-line no-unused-vars
const e = 'str';
const f = undefined;

if (typeof a === 'number') {
    console.log('a is a number');
}

if (isNaN(a / d)) {
    console.log('${a / d} is not a number');
} else {
    console.log('${a / d} is a number');
}

if (isNaN(a / d))
    console.log('${a / d} is not a number');
else
    console.log('${a / d} is a number');

if (f) {
    console.log('f is truthy');
} else if (f === null) {
    console.log('f is null');
} else {
    console.log('f is neither truthy nor null');
}

if (f || d > 0) {
    console.log('f is truthy or d is greater than 0');
} else if ((a > 0 && d < 0) || !f) {
    console.log('a is greater than 0 and d is less than 0 or f is falsy');
}

