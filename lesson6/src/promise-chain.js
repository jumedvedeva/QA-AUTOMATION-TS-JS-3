//const todos = fetch('https://jsonplaceholder.typicode.com/todos')
fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
        console.log(response);
        console.log(response.status);
        if (response.status >= 300) {
            throw new Error('Request failed with status:' + response.status);
        }
        return response.json();
    })
    .then(todos => {
        console.log(todos);
        processTodos(todos);
        //return todos;
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
    });
//console.log('todos variable:', todos);

function processTodos(todos) {
    const filteredTodos = todos.filter(todo => todo.id <= 5);
    console.log('Processing todos:', filteredTodos);
}
