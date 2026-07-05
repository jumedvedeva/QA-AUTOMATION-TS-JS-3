/* eslint-disable indent */

// Example object with multiple nested levels
const nestedObject = {
    id: 1,
    name: 'root',
    meta: {
        created: '2026-05-22',
        tags: ['example', 'nested', 'test'],
        owner: {
            id: 42,
            name: 'ownerName',
            contact: {
                email: 'owner@example.com',
                phones: [
                    { type: 'work', number: '+123456789' },
                    { type: 'mobile', number: '+987654321' }
                ]
            }
        }
    },
    settings: {
        theme: 'dark',
        layout: {
            header: { visible: true, height: 60 },
            sidebar: { visible: false, width: 250 }
        }
    },
    items: [
        { id: 'a', value: 10 },
        { id: 'b', value: 20, details: { nested: true, note: 'second' } }
    ],
    optionalParameter:{
        param: 'value'
    },

    summary() {
        return `Object ${this.name} with id ${this.id} has ${this.items.length} items and was created on ${this.meta.created}`;
    },

    keyCount () {
       return Object.keys(this).length;
    },

    multiply(a) {
        console.log(this.id * a);
    }
};

console.log(nestedObject);
console.log(nestedObject.summary());
console.log(`Key count: ${nestedObject.keyCount()}`);
nestedObject.multiply(5);

console.log(nestedObject.meta.owner.contact.phones[0].number);
console.log(nestedObject.optionalParameter.param);


export default nestedObject;
