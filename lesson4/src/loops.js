const arr = [1, 3, 5, 6, 7, 8, 9, 10];

for (const value of arr) {
    console.log(`value: ${value} and index ${arr.indexOf(value)}`);
};

for (let i = 0; i < arr.length; i++) {
    console.log(`value: ${arr[i]} and index ${i}`);
}

const arr2 = [];

const reversedArr = arr.reverse();

for (const value of reversedArr) {
    console.log(`iteration: ${reversedArr.indexOf(value)}`);
    if (value  % 2 === 0 && arr2.length < 3) {
        arr2.push(value);
    } else if (arr2.length >= 3) {
        break;
    }
};
console.log(arr2);

const arr3 = [];
for (let i = 0; i < arr.length; i++) {
    console.log(`iteration: ${i}`);
    if (arr[i] % 2 === 0) {
        if (arr[i] > 6) {
            continue;
        }
        arr3.push(arr[i]);
    }
}
console.log(arr3);

//while loop

let i = 0;
while (i < arr.length) {
    console.log(`iteration: ${i} and value ${arr[i]}`);
    i++;
}

const newArray = [1, 2, 4, 6, 7, 8];
while (newArray.length > 0) {
    const value = newArray.pop();
    console.log(`value: ${value} and index length ${newArray.length}`);
}
console.log(newArray);

let j = 0;
do {
    console.log(`iteration: ${j} and value ${arr[j]}`);
    j++;
} while (j < arr.length);
