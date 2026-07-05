import { addNumbersExpr } from './functional-expressions.js';
import { addNumbers } from './functions.js';
import { filterByStatus } from './jira-functions.js';
import { filterByStatusArrow, getSummariesOfTicketsByStatusesArrow, splitEvenAndOddNumbers, getAllTicketsSummaries } from './jira-arrow-function.js';
import { processTickets } from './callbacks.js';
import { ticket } from './getters-setters.js';


console.log('--------sum of numbers--------');
const resultNumbers = addNumbers(5, 5);
console.log('sum of numbers', resultNumbers);
const resultStringNumbers = addNumbers('5', '5');
console.log('sum of numbers in string', resultStringNumbers);
const resultMixedTypes = addNumbers('5', 5);
console.log('sum of number and string', resultMixedTypes);
const resultWords = addNumbers('five', 'five');
console.log('sum of words', resultWords);


console.log('--------jira tickets--------');
const jiraTickets = [
    { id: 'OPS-123', title: 'Fix login bug', status: 'Open', assignee: 'John Doe' },
    { id: 'OPS-456', title: 'Add new feature', status: 'In Progress', assignee: 'Jane Smith' },
    { id: 'OPS-789', title: 'Update documentation', status: 'Closed', assignee: 'Bob Johnson' }
];

console.log('All tickets:', jiraTickets);
console.log('Open tickets:', filterByStatus(jiraTickets, 'Open'));
console.log('In progress tickets:', filterByStatus(jiraTickets, 'In Progress'));
console.log('Closed tickets:', filterByStatus(jiraTickets, 'Closed'));


console.log('--------functional expressions--------');
console.log('sum of numbers (expression)', addNumbersExpr(5, 5));
console.log('sum of numbers in string (expression)', addNumbersExpr('5', '5'));
console.log('sum of number and string (expression)', addNumbersExpr('5', 5));
console.log('sum of words (expression)', addNumbersExpr('five', 'five'));

console.log('--------jira arrow functions--------');
console.log('Open tickets (arrow function):', filterByStatusArrow(jiraTickets, 'Open'));
console.log('In progress tickets (arrow function):', filterByStatusArrow(jiraTickets, 'In Progress'));
console.log('Closed tickets (arrow function):', filterByStatusArrow(jiraTickets, 'Closed'));
console.log('Summaries of open tickets (arrow function):', getSummariesOfTicketsByStatusesArrow(jiraTickets, 'Open'));
console.log('Summaries of in progress tickets (arrow function):', getSummariesOfTicketsByStatusesArrow(jiraTickets, 'In Progress'));
console.log('Summaries of closed tickets (arrow function):', getSummariesOfTicketsByStatusesArrow(jiraTickets, 'Closed'));
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('Split even and odd numbers (arrow function):', splitEvenAndOddNumbers(array));


console.log('--------callbacks--------');
processTickets(jiraTickets, getAllTicketsSummaries, () => console.log('No tickets to process'));
processTickets([], getAllTicketsSummaries, () => console.log('No tickets to process'));


console.log('--------getters and setters--------');
console.log('Initial ticket:', ticket);
console.log('Ticket summary:', ticket.summary);
ticket.summary = 'OPS-456: Add new feature (In Progress)';
console.log('Initial ticket after trying to change summary', ticket);
ticket.priority = 3;
console.log('Ticket priority after setting it to 3:', ticket.priority);
ticket.priority = 6;
console.log('Ticket priority after trying to set it to 6:', ticket.priority);


