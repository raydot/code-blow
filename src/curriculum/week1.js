/**
 * Week 1: Fundamentals
 * JavaScript basics, array methods, and core concepts
 */

export const week1Problems = {
  1: {
    week: 1,
    title: "Array Methods: forEach, map, filter",
    problem: "Create a function that processes an array of user objects. Use forEach to log each user's name, map to create an array of email addresses, and filter to find users over 25.",
    example: `const users = [
  { name: 'Alice', email: 'alice@example.com', age: 28 },
  { name: 'Bob', email: 'bob@example.com', age: 22 },
  { name: 'Charlie', email: 'charlie@example.com', age: 30 }
];

// Expected outputs:
// Console: "Alice", "Bob", "Charlie"
// emails: ['alice@example.com', 'bob@example.com', 'charlie@example.com']
// adults: [{ name: 'Alice', email: 'alice@example.com', age: 28 }, { name: 'Charlie', email: 'charlie@example.com', age: 30 }]`,
    starter: `function processUsers(users) {
  // Use forEach to log each user's name
  
  // Use map to create array of emails
  
  // Use filter to find users over 25
  
  return { emails, adults };
}`,
    solution: `function processUsers(users) {
  // Use forEach to log each user's name
  users.forEach(user => console.log(user.name));
  
  // Use map to create array of emails
  const emails = users.map(user => user.email);
  
  // Use filter to find users over 25
  const adults = users.filter(user => user.age > 25);
  
  return { emails, adults };
}`,
    testCases: [
      {
        name: "Basic user processing",
        input: [
          [
            { name: 'Alice', email: 'alice@example.com', age: 28 },
            { name: 'Bob', email: 'bob@example.com', age: 22 },
            { name: 'Charlie', email: 'charlie@example.com', age: 30 }
          ]
        ],
        expected: {
          emails: ['alice@example.com', 'bob@example.com', 'charlie@example.com'],
          adults: [
            { name: 'Alice', email: 'alice@example.com', age: 28 },
            { name: 'Charlie', email: 'charlie@example.com', age: 30 }
          ]
        }
      },
      {
        name: "Empty array",
        input: [[]],
        expected: { emails: [], adults: [] }
      },
      {
        name: "All young users",
        input: [
          [
            { name: 'Alice', email: 'alice@example.com', age: 20 },
            { name: 'Bob', email: 'bob@example.com', age: 22 }
          ]
        ],
        expected: {
          emails: ['alice@example.com', 'bob@example.com'],
          adults: []
        }
      }
    ],
    focus: "Master the three most important array methods for data processing."
  },

  2: {
    week: 1,
    title: "Array Methods: reduce, find, some, every",
    problem: "Use advanced array methods to analyze product data. Calculate total price with reduce, find a laptop, check if any product is out of stock with some, and verify all products are under budget with every.",
    example: `const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true }
];

// Expected: { totalPrice: 1099, laptop: {...}, hasOutOfStock: true, allAffordable: false }`,
    starter: `function analyzeProducts(products, budget = 100) {
  // Use reduce to calculate total price
  
  // Use find to get the laptop
  
  // Use some to check if any product is out of stock
  
  // Use every to check if all products are under budget
  
  return { totalPrice, laptop, hasOutOfStock, allAffordable };
}`,
    solution: `function analyzeProducts(products, budget = 100) {
  // Use reduce to calculate total price
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  
  // Use find to get the laptop
  const laptop = products.find(product => product.name.toLowerCase().includes('laptop'));
  
  // Use some to check if any product is out of stock
  const hasOutOfStock = products.some(product => !product.inStock);
  
  // Use every to check if all products are under budget
  const allAffordable = products.every(product => product.price <= budget);
  
  return { totalPrice, laptop, hasOutOfStock, allAffordable };
}`,
    testCases: [
      {
        name: "Mixed products with default budget",
        input: [
          [
            { name: 'Laptop', price: 999, inStock: true },
            { name: 'Mouse', price: 25, inStock: false },
            { name: 'Keyboard', price: 75, inStock: true }
          ]
        ],
        expected: {
          totalPrice: 1099,
          laptop: { name: 'Laptop', price: 999, inStock: true },
          hasOutOfStock: true,
          allAffordable: false
        }
      },
      {
        name: "All affordable products",
        input: [
          [
            { name: 'Mouse', price: 25, inStock: true },
            { name: 'Keyboard', price: 75, inStock: true }
          ],
          150
        ],
        expected: {
          totalPrice: 100,
          laptop: undefined,
          hasOutOfStock: false,
          allAffordable: true
        }
      }
    ],
    focus: "Learn reduce for aggregation and boolean array methods for validation."
  },

  3: {
    week: 1,
    title: "String Manipulation: split, join, slice",
    problem: "Create functions to format names, extract initials, and manipulate text using string methods.",
    example: `const fullName = "john doe smith";
// Expected: "John Doe Smith", "JDS", "john...smith"`,
    starter: `function formatName(fullName) {
  // Convert to proper case
}

function getInitials(fullName) {
  // Extract first letter of each name
}

function truncateText(text, maxLength) {
  // Truncate with ellipsis if too long
}`,
    solution: `function formatName(fullName) {
  return fullName.split(' ')
    .map(name => name.charAt(0).toUpperCase() + name.slice(1))
    .join(' ');
}

function getInitials(fullName) {
  return fullName.split(' ')
    .map(name => name.charAt(0).toUpperCase())
    .join('');
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}`,
    focus: "Master string splitting, joining, and slicing for text processing.",
    testCases: [
      {
        name: "Format full name",
        functionName: "formatName",
        input: ["john doe smith"],
        expected: "John Doe Smith"
      },
      {
        name: "Get initials",
        functionName: "getInitials", 
        input: ["john doe smith"],
        expected: "JDS"
      },
      {
        name: "Truncate long text",
        functionName: "truncateText",
        input: ["This is a very long text", 10],
        expected: "This is..."
      }
    ]
  },

  4: {
    week: 1,
    title: "String Methods: replace, match, includes",
    problem: "Build a simple text processor that can clean text, validate formats, and extract information.",
    example: `const messyText = "Hello  World! This is   a test.";
const email = "user@example.com";`,
    starter: `function cleanText(text) {
  // Remove extra spaces and clean up
}

function validateEmail(email) {
  // Check if email format is valid
}

function extractNumbers(text) {
  // Extract all numbers from text
}`,
    solution: `function cleanText(text) {
  return text.replace(/\\s+/g, ' ').trim();
}

function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

function extractNumbers(text) {
  const matches = text.match(/\\d+/g);
  return matches ? matches.map(Number) : [];
}`,
    focus: "Learn pattern matching, text replacement, and validation techniques.",
    testCases: [
      {
        name: "Clean messy text",
        functionName: "cleanText",
        input: ["Hello  World! This is   a test."],
        expected: "Hello World! This is a test."
      },
      {
        name: "Validate email",
        functionName: "validateEmail",
        input: ["user@example.com"],
        expected: true
      },
      {
        name: "Extract numbers",
        functionName: "extractNumbers",
        input: ["I have 5 cats and 3 dogs"],
        expected: [5, 3]
      }
    ]
  },

  5: {
    week: 1,
    title: "Object Manipulation: keys, values, entries",
    problem: "Work with object properties to transform, filter, and analyze data structures.",
    example: `const user = {
  name: 'Alice',
  email: 'alice@example.com',
  isActive: true,
  lastLogin: '2023-12-01'
};`,
    starter: `function analyzeObject(obj) {
  // Get all property names
  
  // Get all values
  
  // Get all entries (key-value pairs)
  
  // Count properties
  
  // Find string properties only
  
  return { keys, values, entries, count, stringProps };
}

function transformObject(obj, transformer) {
  // Apply transformer function to all values
}`,
    solution: `function analyzeObject(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const entries = Object.entries(obj);
  const count = keys.length;
  const stringProps = entries
    .filter(([key, value]) => typeof value === 'string')
    .map(([key]) => key);
  
  return { keys, values, entries, count, stringProps };
}

function transformObject(obj, transformer) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = transformer(value);
  }
  return result;
}`,
    focus: "Master object introspection and transformation patterns.",
    testCases: [
      {
        name: "Analyze user object",
        functionName: "analyzeObject",
        input: [{ name: 'Alice', age: 30, email: 'alice@example.com', isActive: true }],
        expected: {
          keys: ['name', 'age', 'email', 'isActive'],
          values: ['Alice', 30, 'alice@example.com', true],
          entries: [['name', 'Alice'], ['age', 30], ['email', 'alice@example.com'], ['isActive', true]],
          count: 4,
          stringProps: ['name', 'email']
        }
      }
    ]
  },

  6: {
    week: 1,
    title: "Object Destructuring & Spread",
    problem: "Use modern JavaScript syntax to extract, combine, and manipulate object properties.",
    example: `const person = { name: 'John', age: 30, city: 'NYC', country: 'USA' };
const address = { street: '123 Main St', city: 'Boston', zip: '02101' };`,
    starter: `function extractPersonInfo(person) {
  // Destructure name and age, rest as otherInfo
  
  return { name, age, otherInfo };
}

function mergePersonAddress(person, address) {
  // Merge person and address, address takes precedence
  
  return merged;
}

function updatePerson(person, updates) {
  // Update person with new data
  
  return updated;
}`,
    solution: `function extractPersonInfo(person) {
  const { name, age, ...otherInfo } = person;
  return { name, age, otherInfo };
}

function mergePersonAddress(person, address) {
  return { ...person, ...address };
}

function updatePerson(person, updates) {
  return { ...person, ...updates };
}`,
    focus: "Learn destructuring assignment and spread operator for clean object manipulation.",
    testCases: [
      {
        name: "Extract person info",
        functionName: "extractPersonInfo",
        input: [{ name: 'John', age: 30, city: 'NYC', country: 'USA' }],
        expected: { 
          name: 'John', 
          age: 30, 
          otherInfo: { city: 'NYC', country: 'USA' } 
        }
      }
    ]
  },

  7: {
    week: 1,
    title: "Array Destructuring & Rest Parameters",
    problem: "Master array destructuring and rest parameters for flexible function arguments.",
    example: `const numbers = [1, 2, 3, 4, 5];
const coordinates = [10, 20];`,
    starter: `function getFirstAndRest(arr) {
  // Destructure first element and rest of array
  
  return { first, rest };
}

function swapFirstTwo(arr) {
  // Swap first two elements using destructuring
  
  return swapped;
}

function createPoint(x, y, ...extras) {
  // Create point object with coordinates and extra properties
  
  return point;
}`,
    solution: `function getFirstAndRest(arr) {
  const [first, ...rest] = arr;
  return { first, rest };
}

function swapFirstTwo(arr) {
  const [first, second, ...rest] = arr;
  return [second, first, ...rest];
}

function createPoint(x, y, ...extras) {
  return { x, y, extras };
}`,
    focus: "Master destructuring and rest parameters for flexible data handling.",
    testCases: [
      {
        name: "Get first and rest",
        functionName: "getFirstAndRest",
        input: [[1, 2, 3, 4, 5]],
        expected: { first: 1, rest: [2, 3, 4, 5] }
      }
    ]
  },

  8: {
    week: 1,
    title: "Functions: Arrow Functions & Scope",
    problem: "Practice different function syntaxes and understand scope behavior in various contexts.",
    example: `// Different ways to define functions
const regular = function(x) { return x * 2; };
const arrow = x => x * 2;
const multiLine = (a, b) => {
  const sum = a + b;
  return sum * 2;
};`,
    starter: `// Convert to arrow functions and fix scope issues
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}`,
    solution: `const createMultiplier = (factor) => (number) => number * factor;

const createCounter = () => {
  let count = 0;
  return () => ++count;
};`,
    focus: "Learn arrow function syntax and understand lexical scoping.",
    testCases: [
      {
        name: "Test multiplier",
        functionName: "createMultiplier",
        input: [3],
        expected: "function"
      }
    ]
  },

  9: {
    week: 1,
    title: "Closures & Higher-Order Functions",
    problem: "Create functions that return other functions and maintain private state using closures.",
    example: `const bankAccount = createAccount(100);
bankAccount.deposit(50); // 150
bankAccount.withdraw(30); // 120
bankAccount.getBalance(); // 120`,
    starter: `function createAccount(initialBalance) {
  // Create private balance variable
  // Return object with deposit, withdraw, getBalance methods
}

function createValidator(rules) {
  // Return function that validates input against all rules
}

function pipe(...functions) {
  // Return function that applies all functions in sequence
}`,
    solution: `function createAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: (amount) => balance += amount,
    withdraw: (amount) => balance -= amount,
    getBalance: () => balance
  };
}

function createValidator(rules) {
  return (input) => {
    return rules.every(rule => rule(input));
  };
}

function pipe(...functions) {
  return (input) => {
    return functions.reduce((acc, fn) => fn(acc), input);
  };
}`,
    focus: "Master closures for data privacy and function composition patterns.",
    testCases: [
      {
        name: "Test bank account",
        functionName: "createAccount",
        input: [100],
        expected: "object"
      }
    ]
  },

  10: {
    week: 1,
    title: "Async Basics: Promises & setTimeout",
    problem: "Work with asynchronous operations using Promises and understand the event loop.",
    example: `// Simulate API calls with delays
fetchUser(1).then(user => console.log(user));
fetchUserPosts(1).then(posts => console.log(posts));`,
    starter: `function delay(ms) {
  // Return a Promise that resolves after ms milliseconds
}

function fetchUser(id) {
  // Simulate API call with delay
  // Return Promise that resolves with user object
}

function fetchUserPosts(userId) {
  // Simulate fetching user posts
  // Return Promise that resolves with posts array
}`,
    solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return delay(1000).then(() => ({
    id,
    name: \`User \${id}\`,
    email: \`user\${id}@example.com\`
  }));
}

function fetchUserPosts(userId) {
  return delay(800).then(() => [
    { id: 1, title: 'Post 1', userId },
    { id: 2, title: 'Post 2', userId }
  ]);
}`,
    focus: "Learn Promise creation and understand asynchronous execution.",
    testCases: [
      {
        name: "Test delay function",
        functionName: "delay",
        input: [100],
        expected: "Promise"
      }
    ]
  }
};

export const week1Metadata = {
  week: 1,
  title: "Fundamentals",
  description: "JavaScript basics, array methods, and core concepts",
  totalDays: 10,
  focus: "Master essential JavaScript array methods and functional programming concepts"
};
