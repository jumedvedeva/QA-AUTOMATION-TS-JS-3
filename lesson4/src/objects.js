const obj1 = {
    name: 'Object 1',
    parameters: [
        { name: 'Parameter1', value: 10 },
        { name: 'Parameter2', value: 20 }
    ]
};

const obj2 = obj1;

console.log(obj1);
console.log(obj2);

console.log('----------------------------');

obj2.name = 'Object 2';
obj2.parameters[0].value = 100;

console.log(obj1);
console.log(obj2);

console.log('---------------Object.assign----------------');
const obj3 = Object.assign({}, obj1);
obj3.name = 'Object 3';
obj3.parameters[0].value = 1000;

console.log(obj1);
console.log(obj3);

console.log('---------------Spread operator----------------');
const obj4 = { ...obj1 };
obj4.name = 'Object 4';
obj4.parameters[0].value = 10000;

console.log(obj1);
console.log(obj4);

console.log('---------------structuredClone----------------');
const obj5 = structuredClone(obj1);
obj5.name = 'Object 5';
obj5.parameters[0].value = 1;

console.log(obj1);
console.log(obj5);


console.log('---------------JSON Parse/Stringify----------------');
console.log(`text representation of Object ${JSON.stringify(obj1, undefined, 4)}`);
const obj6 = JSON.parse(JSON.stringify(obj1));
obj6.name = 'Object 6';
obj6.parameters[0].value = 2;

console.log(obj1);
console.log(obj6);
