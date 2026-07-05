export const ticket = {
    id: 'OPS-123',
    title: 'Fix login bug',
    status: 'Open',
    assignee: 'John Doe',
    _priority: 5,
    get summary() {
        return `${this.id}: ${this.title} (${this.status})`;
    },
    set summary(newSummary) {
        const match = newSummary.match(/^(.+?):\s(.+?)\s\((.+?)\)$/);
        if (match) {
            this.id = match[1];
            this.title = match[2];
            this.status = match[3];
        }
    },

    get fullInfo() {
        return `Ticket ID: ${this.id}\nTitle: ${this.title}\nStatus: ${this.status}\nAssignee: ${this.assignee}`;
    },
    get priority() {
        return this._priority;
    },
    set priority(newPriority) {
        if (typeof newPriority === 'number' && newPriority >= 1 && newPriority <= 5) {
            this._priority = newPriority;
        } else {
            console.log('Invalid priority value. It should be a number between 1 and 5');
        }
    }
};
