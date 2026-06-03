export const company = {
    name: 'TechCorp',
    _revenue: 0,

    finance: {
        _budget: 50000,
        _expenses: 0,

        get budget() {
            return this._budget;
        },
        set budget(value) {
            if (value < 0) {
                console.log('❌ Budget cannot be negative!');
                return;
            }
            this._budget = value;
            console.log(`✅ Budget updated to $${this._budget}`);
        },

        get expenses() {
            return this._expenses;
        },
        set expenses(value) {
            if (value > this._budget) {
                console.log('❌ Expenses cannot exceed the budget!');
                return;
            }
            this._expenses = value;
            console.log(`✅ Expenses updated to $${this._expenses}`);
        },

        get remaining() {
            return this._budget - this._expenses;
        },

        summarize() {
            console.log('--- Finance Summary ---');
            console.log(`  Budget:    $${this._budget}`);
            console.log(`  Expenses:  $${this._expenses}`);
            console.log(`  Remaining: $${this.remaining}`);
            return this.remaining;
        }
    },

    get revenue() {
        return this._revenue;
    },
    set revenue(value) {
        if (value < 0) {
            console.log('❌ Revenue cannot be negative!');
            return;
        }
        this._revenue = value;
        console.log(`✅ Revenue updated to $${this._revenue}`);
    },

    get profit() {
        return this._revenue - this.finance._expenses;
    },

    summarize() {
        const remaining = this.finance.summarize();
        console.log('--- Company Summary ---');
        console.log(`  Company:   ${this.name}`);
        console.log(`  Revenue:   $${this._revenue}`);
        console.log(`  Expenses:  $${this.finance._expenses}`);
        console.log(`  Profit:    $${this.profit}`);
        console.log(`  Remaining: $${remaining}`);
    }
};

// --- Using setters ---
//company.revenue = 120000;
//company.finance.budget = 80000;
//company.finance.expenses = 45000;

//console.log('');

// --- Using getters ---
//console.log('Current revenue (getter):',   company.revenue);
//console.log('Current budget (getter):',    company.finance.budget);
//console.log('Current expenses (getter):',  company.finance.expenses);
//console.log('Remaining budget (getter):',  company.finance.remaining);
///console.log('Company profit (getter):',    company.profit);

//console.log('');

// --- Trigger validation ---
//company.finance.expenses = 999999;
//company.revenue = -500;
//company.finance.budget = -1000;
