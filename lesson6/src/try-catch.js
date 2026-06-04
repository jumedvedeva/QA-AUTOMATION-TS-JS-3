export class OnlySelectError extends Error {
    constructor() {
        super('Only SELECT queries are allowed');
        this.name = 'OnlySelectError';
    }
}

export function queryDb(query) {
    if (!query.toLowerCase().includes('select')) {
        throw new OnlySelectError();
    }

    return {status: 'success', data: [{field1: 3, field2: 'value'}]};
}

export function doAnotherDbQuery(query) {
    console.log('Executing alternative query:', query);
    return {status: 'success', data: [{field1: 5, field2: 'another value from alternative query'}]};
}
