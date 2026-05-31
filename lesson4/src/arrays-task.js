// ─────────────────────────────────────────────────────────────
//  1. ARRAYS — one per basic type
// ─────────────────────────────────────────────────────────────

const strings  = ['banana', 'apple', 'cherry', 'date', 'apple', 'elderberry'];
const numbers  = [42, 7, 19, 3, 56, 7, 23, 3, 88, 15];
const booleans = [true, false, true, true, false, false, true];
const mixed    = [1, 'hello', true, null, 42, 'world', false, 3.14]; // any[]

// ─────────────────────────────────────────────────────────────
//  Helper — section header
// ─────────────────────────────────────────────────────────────
const section = (title) => console.log(`\n${'─'.repeat(50)}\n  ${title}\n${'─'.repeat(50)}`);


// ══════════════════════════════════════════════════════════════
//  forEach()  — iterate without returning a new array
// ══════════════════════════════════════════════════════════════
section('forEach()');

console.log('strings →');
strings.forEach((val, idx) => console.log(`  [${idx}] ${val}`));

console.log('numbers →');
numbers.forEach((val, idx) => console.log(`  [${idx}] ${val}`));

console.log('booleans →');
booleans.forEach((val, idx) => console.log(`  [${idx}] ${val}`));

console.log('mixed →');
mixed.forEach((val, idx) => console.log(`  [${idx}] ${val} (${typeof val})`));


// ══════════════════════════════════════════════════════════════
//  map()  — transform every element, return new array
// ══════════════════════════════════════════════════════════════
section('map()');

const upperStrings  = strings.map((s) => s.toUpperCase());
console.log('strings  → toUpperCase()      :', upperStrings);

const doubledNum   = numbers.map((n) => n * 2);
console.log('numbers  → n * 2              :', doubledNum);

const invertedBools = booleans.map((b) => !b);
console.log('booleans → !b                 :', invertedBools);

const mixedTypes    = mixed.map((v) => `${v}::${typeof v}`);
console.log('mixed    → value::type        :', mixedTypes);


// ══════════════════════════════════════════════════════════════
//  filter()  — keep elements that match a predicate
// ══════════════════════════════════════════════════════════════
section('filter()');

const longStrings  = strings.filter((s) => s.length > 5);
console.log('strings  → length > 5         :', longStrings);

const bigNumbers   = numbers.filter((n) => n > 20);
console.log('numbers  → n > 20             :', bigNumbers);

const trueOnly     = booleans.filter(Boolean);
console.log('booleans → only true          :', trueOnly);

const numbersOnly  = mixed.filter((v) => typeof v === 'number');
console.log('mixed    → only numbers       :', numbersOnly);


// ══════════════════════════════════════════════════════════════
//  find()  — first element that matches, or undefined
// ══════════════════════════════════════════════════════════════
section('find()');

const firstLong   = strings.find((s) => s.length > 5);
console.log('strings  → first length > 5   :', firstLong);

const firstBig    = numbers.find((n) => n > 50);
console.log('numbers  → first n > 50       :', firstBig);

const firstFalse  = booleans.find((b) => b === false);
console.log('booleans → first false        :', firstFalse);

const firstString = mixed.find((v) => typeof v === 'string');
console.log('mixed    → first string value :', firstString);


// ══════════════════════════════════════════════════════════════
//  indexOf()  — index of first exact match, or -1
// ══════════════════════════════════════════════════════════════
section('indexOf()');

console.log('strings  → indexOf("apple")   :', strings.indexOf('apple'));
console.log('numbers  → indexOf(7)         :', numbers.indexOf(7));
console.log('booleans → indexOf(false)     :', booleans.indexOf(false));
console.log('mixed    → indexOf("world")   :', mixed.indexOf('world'));


// ══════════════════════════════════════════════════════════════
//  sort()  — sorts in-place (copy first to avoid mutation)
// ══════════════════════════════════════════════════════════════
section('sort()');

const sortedStrings  = [...strings].sort();                       // lexicographic
console.log('strings  → alphabetical       :', sortedStrings);

const sortedAsc      = [...numbers].sort((a, b) => a - b);        // ascending
console.log('numbers  → ascending          :', sortedAsc);

const sortedDesc     = [...numbers].sort((a, b) => b - a);        // descending
console.log('numbers  → descending         :', sortedDesc);

const sortedBooleans = [...booleans].sort((a, b) => a - b);       // false first
console.log('booleans → false first        :', sortedBooleans);

const sortedMixed    = [...mixed]
    .filter((v) => v !== null)
    .sort((a, b) => String(a).localeCompare(String(b)));            // as strings
console.log('mixed    → stringified sort   :', sortedMixed);


// ══════════════════════════════════════════════════════════════
//  reduce()  — fold array into a single value
// ══════════════════════════════════════════════════════════════
section('reduce()');

const joined     = strings.reduce((acc, s) => `${acc}, ${s}`);
console.log('strings  → join with \', \'     :', joined);

const sum        = numbers.reduce((acc, n) => acc + n, 0);
console.log('numbers  → sum                :', sum);

const product    = numbers.reduce((acc, n) => acc * n, 1);
console.log('numbers  → product            :', product);

const trueCount  = booleans.reduce((acc, b) => acc + (b ? 1 : 0), 0);
console.log('booleans → count of true      :', trueCount);

const mixedSum   = mixed.reduce((acc, v) => (typeof v === 'number' ? acc + v : acc), 0);
console.log('mixed    → sum of numbers     :', mixedSum);


// ══════════════════════════════════════════════════════════════
//  concat()  — merge arrays without mutating originals
// ══════════════════════════════════════════════════════════════
section('concat()');

const moreStrings  = ['fig', 'grape'];
const allStrings   = strings.concat(moreStrings);
console.log('strings  + [\'fig\',\'grape\']    :', allStrings);

const moreNumbers  = [100, 200];
const allNumbers   = numbers.concat(moreNumbers);
console.log('numbers  + [100,200]          :', allNumbers);

const moreBooleans = [false, true];
const allBooleans  = booleans.concat(moreBooleans);
console.log('booleans + [false,true]       :', allBooleans);

const everything   = strings.concat(numbers, booleans, mixed);
console.log('all 4 arrays merged (length)  :', everything.length, 'items');


// ══════════════════════════════════════════════════════════════
//  groupBy()  — Object.groupBy (ES2024) with manual fallback
// ══════════════════════════════════════════════════════════════
section('groupBy()');

// Polyfill for environments that don't yet support Object.groupBy
const groupBy = (arr, keyFn) =>
    arr.reduce((acc, item) => {
        const key = keyFn(item);
        (acc[key] ??= []).push(item);
        return acc;
    }, {});

// strings — group by first letter
const byLetter = groupBy(strings, (s) => s[0].toUpperCase());
console.log('strings  → by first letter    :', byLetter);

// numbers — group by even / odd
const byParity = groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));
console.log('numbers  → even / odd         :', byParity);

// booleans — group by value
const byValue  = groupBy(booleans, (b) => String(b));
console.log('booleans → true / false       :', byValue);

// mixed — group by typeof
const byType   = groupBy(mixed, (v) => (v === null ? 'null' : typeof v));
console.log('mixed    → by typeof          :', byType);
