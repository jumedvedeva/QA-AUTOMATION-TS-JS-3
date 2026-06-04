async function getTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    console.log(response);
    console.log(response.status);
    if (response.status >= 300) {
        throw new Error('Request failed with status:' + response.status);
    }
    const responseJson = await response.json();
    return responseJson;
}

//const todos = await getTodos();
//console.log('todos variable:', todos);

try {
    const todos = await getTodos();
    console.log('todos variable:', todos);
} catch (error) {
    console.error('Error fetching todos:', error);
}

const promises = [];
for (let i = 1; i < 10; i++) {
    promises.push(getTodos());
}

const results = await Promise.all(promises);
console.log('results', results.length);
