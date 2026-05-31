/**Підготувати файл decision-tree.js, у якому написати розгалужену конструкцію if та if-else if-else
 * з використанням операцій порівняння і логічних операторів.*/

const age = 25;

if (age < 18) {
    console.log('You are a minor.');
} else if (age >= 18 && age < 65) {
    console.log('You are an adult.');
}
else {
    console.log('You are a senior.');
}

const score = 85;
if (score >= 90) {
    console.log('Excellent');
} else if (score >= 80) {
    console.log('Good');
} else if (score >= 70) {
    console.log('Average');
} else if (score >= 60) {
    console.log('Pass');
} else {
    console.log('Fail');
}

const isRaining = true;
const hasUmbrella = false;
if (isRaining && !hasUmbrella) {
    console.log('You will get wet.');
} else if (isRaining && hasUmbrella) {
    console.log('You will stay dry.');
} else {
    console.log('The weather is clear.');
}
