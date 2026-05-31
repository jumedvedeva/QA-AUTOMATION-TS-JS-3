const car = 'BMW';

switch (car) {
    case 'BMW':
        console.log('This is BMW');
        break;
    case 'Audi':
        console.log('This is Audi');
        break;
    case 'Mercedes':
        console.log('This is Mercedes');
        break;
    default:
        console.log('Unknown car');
}


const number = 1;
switch (number) {
    case '1':
        console.log('The number is 1');
        break;
    case 2:
        console.log('The number is 2');
        break;
    default:
        console.log('Unknown number');
}

//Task: Створити файл switch.js, в якому застосувати конструкцію switch .. case для виконання певної логіки
//Наприклад, можна створити змінну dayOfWeek і в залежності від її значення виводити назву дня тижня.

const dayOfWeek = 3;
switch (dayOfWeek) {
    case 1:
        console.log('Monday');
        break;
    case 2:
        console.log('Tuesday');
        break;
    case 3:
        console.log('Wednesday');
        break;
    case 4:
        console.log('Thursday');
        break;
    case 5:
        console.log('Friday');
        break;
    case 6:
        console.log('Saturday');
        break;
    case 7:
        console.log('Sunday');
        break;
    default:
        console.log('Invalid day of the week');
}

