// ─────────────────────────────────────────
//  Loop 0 → 9
// ─────────────────────────────────────────

// 1. for
console.log('for | 0 to 9:');
for (let i = 0; i <= 9; i++) {
    console.log(i);
}

// 2. while
console.log('while | 0 to 9:');
let i = 0;
while (i <= 9) {
    console.log(i);
    i++;
}

// 3. do...while
console.log('do...while | 0 to 9:');
let j = 0;
do {
    console.log(j);
    j++;
} while (j <= 9);

// ─────────────────────────────────────────
//  Loop 100 → 0 (step –10)
// ─────────────────────────────────────────

// 1. for
console.log('for | 100 to 0 (step -10):');
for (let k = 100; k >= 0; k -= 10) {
    console.log(k);
}

// 2. while
console.log('while | 100 to 0 (step -10):');
let m = 100;
while (m >= 0) {
    console.log(m);
    m -= 10;
}

// 3. do...while
console.log('do...while | 100 to 0 (step -10):');
let n = 100;
do {
    console.log(n);
    n -= 10;
} while (n >= 0);
