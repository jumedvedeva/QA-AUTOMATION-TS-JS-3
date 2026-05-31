const arr = ['1', 2, true, null, undefined, { name: 'Object' }, [1, 2, 3], new Date('2024-01-01')];

console.log(arr);

for (const value of arr) {
    console.log(`value: ${value} and index ${arr.indexOf(value)}`);
}

const arr2 = arr;
arr2[0] = 'changed value';

console.log(arr);
console.log(arr2);

const filteredArr = arr.filter(value => value != null && typeof value !== 'object');
console.log(filteredArr);

const findArr = arr.find(value => value != null && typeof value !== 'object');
console.log(findArr);

arr.push(...[1, 2, 3, 4, 5]);
console.log(arr);

const sortedArray = arr.filter(value => typeof value === 'number').sort((a, b) => a - b).reverse();
console.log(sortedArray);

const multipliedArray = sortedArray.map(value => value * 2);
console.log(sortedArray);
console.log(multipliedArray);

multipliedArray.forEach(value => {
    if (value > 5) {
        console.log(`Value ${value} is greater than 5`);
    }
});
