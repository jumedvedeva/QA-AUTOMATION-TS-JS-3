// ─────────────────────────────────────────────────────────────
//  Complex object — a small online bookstore
// ─────────────────────────────────────────────────────────────

const bookstore = {
    name: 'The Corner Shelf',
    founded: 2010,

    // ── Level 2 : address ────────────────────────────────────
    address: {
        street: '221B Baker Street',
        city: 'London',
        country: 'UK',

        // ── Level 3 : geo-coordinates ─────────────────────────
        coordinates: {
            lat: 51.5237,
            lng: -0.1585
        }
    },

    // ── Level 2 : owner ──────────────────────────────────────
    owner: {
        name: 'John Doe',
        age: 45,

        // ── Level 3 : contact details ─────────────────────────
        contact: {
            email: 'j.doe@testemail.com',
            phone: '+44 20 7946 0958'
        }
    },

    // ── Level 2 : array of books ─────────────────────────────
    catalog: [
        {
            id: 1,
            title: 'The Pragmatic Programmer',
            author: 'David Thomas & Andrew Hunt',
            genre: 'Technology',
            price: 35.99,
            inStock: true
        },
        {
            id: 2,
            title: '1984',
            author: 'George Orwell',
            genre: 'Fiction',
            price: 12.49,
            inStock: true
        },
        {
            id: 3,
            title: 'Sapiens',
            author: 'Yval Noah Harari',
            genre: 'Non-Fiction',
            price: 18.0,
            inStock: false
        },
        {
            id: 4,
            title: 'Clean Code',
            author: 'Robert C. Martin',
            genre: 'Technology',
            price: 29.99,
            inStock: true
        }
    ],

    // ── Level 2 : working hours ──────────────────────────────
    workingHours: {
        weekdays: '09:00 – 20:00',
        saturday: '10:00 – 18:00',
        sunday:   'Closed'
    },

    // ── Methods ───────────────────────────────────────────────

    // Print a full summary of the bookstore
    printInfo() {
        console.log('═'.repeat(50));
        console.log(`${this.name}  (est. ${this.founded})`);
        console.log('═'.repeat(50));
        console.log(`Owner: ${this.owner.name}, age ${this.owner.age}`);
        console.log(`Email: ${this.owner.contact.email}`);
        console.log(`Phone: ${this.owner.contact.phone}`);
        console.log(
            `  Address : ${this.address.street}, ${this.address.city}, ${this.address.country}`
        );
        console.log(
            `  Coords: ${this.address.coordinates.lat}° N, ${Math.abs(this.address.coordinates.lng)}° W`
        );
        console.log('\n  Working hours:');
        console.log(`Mon–Fri : ${this.workingHours.weekdays}`);
        console.log(`Saturday: ${this.workingHours.saturday}`);
        console.log(`Sunday: ${this.workingHours.sunday}`);
    },

    // List every book in the catalog
    printCatalog() {
        console.log('\n   Full catalog:');
        console.log('  ' + '─'.repeat(46));
        this.catalog.forEach((book) => {
            const stock = book.inStock ? 'in stock' : 'out of stock';
            console.log(` [${book.id}] "${book.title}" by ${book.author}`);
            console.log(` Genre: ${book.genre} | Price: $${book.price.toFixed(2)} | ${stock}`);
        });
    },

    // List only available books
    printAvailable() {
        const available = this.catalog.filter((book) => book.inStock);
        console.log(`\n  Books currently in stock (${available.length}):`);
        available.forEach((book) =>
            console.log(`"${book.title}" — $${book.price.toFixed(2)}`)
        );
    },

    // Calculate the total value of in-stock books
    printStockValue() {
        const total = this.catalog
            .filter((book) => book.inStock)
            .reduce((sum, book) => sum + book.price, 0);
        console.log(`\n  Total value of in-stock books: $${total.toFixed(2)}`);
    }
};

// ─────────────────────────────────────────────────────────────
//  Run all methods
// ─────────────────────────────────────────────────────────────
bookstore.printInfo();
bookstore.printCatalog();
bookstore.printAvailable();
bookstore.printStockValue();
