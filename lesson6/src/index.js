import { queryDb, doAnotherDbQuery, OnlySelectError } from './try-catch.js';

console.log('------------try-catch------------');
const result = queryDb('SELECT * FROM table');
console.log(result);

const query = 'DELETE FROM table';
let result2;
try {
    result2 = queryDb(query);
} catch (error) {
    //if (error.message === 'Only SELECT queries are allowed')
    //   result2 = doAnotherDbQuery(query);
    //}
    if (error instanceof OnlySelectError) {
        result2 = doAnotherDbQuery(query);
    } else {
        throw error;
    }
}

console.log(result2);
