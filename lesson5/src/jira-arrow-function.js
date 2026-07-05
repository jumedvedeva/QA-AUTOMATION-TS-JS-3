export const filterByStatusArrow = (tickets, status) => tickets.filter(ticket => ticket.status === status);

export const getSummariesOfTicketsByStatusesArrow = (tickets, status) => filterByStatusArrow(tickets, status).map(ticket => ticket.title);

export const splitEvenAndOddNumbers = (exampleArray) => {
    const result = exampleArray.reduce((accumulator, currentValue) => {
        if (currentValue % 2 === 0) {
            accumulator.even.push(currentValue);
        } else {
            accumulator.odd.push(currentValue);
        }
        return accumulator;
    }, { even: [], odd: [] });
    return result;
};

export const getAllTicketsSummaries = (tickets) => console.log(tickets.map(ticket => ticket.title));
