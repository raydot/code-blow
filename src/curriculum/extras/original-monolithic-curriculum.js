/**
 * Curriculum - Main curriculum export
 * Now uses modular curriculum loader for better maintainability
 */

// Import the new modular curriculum system
export { curriculum, curriculumLoader } from './curriculum/CurriculumLoader.js'

// Legacy curriculum object (kept for reference, but now loads from modules)
// This massive object has been replaced by the modular system above
const legacyCurriculum = {
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
        expected: {
          emails: [],
          adults: []
        }
      },
      {
        name: "All users under 25",
        input: [
          [
            { name: 'Young1', email: 'young1@test.com', age: 20 },
            { name: 'Young2', email: 'young2@test.com', age: 24 }
          ]
        ],
        expected: {
          emails: ['young1@test.com', 'young2@test.com'],
          adults: []
        }
      }
    ],
    focus: "Master the three most important array methods for data transformation and iteration."
  },
  2: {
    week: 1,
    title: "Array Methods: reduce, find, some/every",
    problem: "Use reduce to calculate total price, find to locate a specific product, and some/every to check product availability and price conditions.",
    example: `const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true }
];

// Expected: totalPrice = 1099, laptop = { name: 'Laptop', price: 999, inStock: true }
// hasOutOfStock = true, allAffordable = false (assuming budget of 100)`,
    starter: `function analyzeProducts(products, budget = 100) {
  // Use reduce to calculate total price
  
  // Use find to locate the laptop
  
  // Use some to check if any product is out of stock
  
  // Use every to check if all products are under budget
  
  return { totalPrice, laptop, hasOutOfStock, allAffordable };
}`,
    solution: `function analyzeProducts(products, budget = 100) {
  // Use reduce to calculate total price
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  
  // Use find to locate the laptop
  const laptop = products.find(product => product.name === 'Laptop');
  
  // Use some to check if any product is out of stock
  const hasOutOfStock = products.some(product => !product.inStock);
  
  // Use every to check if all products are under budget
  const allAffordable = products.every(product => product.price <= budget);
  
  return { totalPrice, laptop, hasOutOfStock, allAffordable };
}`,
    testCases: [
      {
        name: "Basic product analysis",
        input: [
          [
            { name: 'Laptop', price: 999, inStock: true },
            { name: 'Mouse', price: 25, inStock: false },
            { name: 'Keyboard', price: 75, inStock: true }
          ],
          100
        ],
        expected: {
          totalPrice: 1099,
          laptop: { name: 'Laptop', price: 999, inStock: true },
          hasOutOfStock: true,
          allAffordable: false
        }
      },
      {
        name: "All products affordable",
        input: [
          [
            { name: 'Mouse', price: 25, inStock: true },
            { name: 'Keyboard', price: 75, inStock: true }
          ],
          100
        ],
        expected: {
          totalPrice: 100,
          laptop: undefined,
          hasOutOfStock: false,
          allAffordable: true
        }
      },
      {
        name: "Empty products array",
        input: [[], 50],
        expected: {
          totalPrice: 0,
          laptop: undefined,
          hasOutOfStock: false,
          allAffordable: true
        }
      }
    ],
    focus: "Learn reduce for aggregation, find for searching, and some/every for boolean checks."
  },
  3: {
    week: 1,
    title: "String Manipulation: split, join, slice",
    problem: "Create functions to format names, extract initials, and manipulate text using string methods.",
    example: `const fullName = "john doe smith";
// Expected: "John Doe Smith", "JDS", "john...smith"`,
    starter: `function formatName(name) {
  // Convert to title case
  
}

function getInitials(name) {
  // Extract first letter of each word
  
}

function truncateMiddle(text, maxLength = 10) {
  // If text is longer than maxLength, show start...end
  
}`,
    solution: `function formatName(name) {
  return name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getInitials(name) {
  return name.split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}

function truncateMiddle(text, maxLength = 10) {
  if (text.length <= maxLength) return text;
  const start = text.slice(0, 3);
  const end = text.slice(-3);
  return start + '...' + end;
}`,
    testCases: [
      {
        name: "Format name test",
        functionName: "formatName",
        input: ["john doe smith"],
        expected: "John Doe Smith"
      },
      {
        name: "Get initials test",
        functionName: "getInitials", 
        input: ["john doe smith"],
        expected: "JDS"
      },
      {
        name: "Truncate middle - long text",
        functionName: "truncateMiddle",
        input: ["verylongfilename.txt", 10],
        expected: "ver...txt"
      },
      {
        name: "Truncate middle - short text",
        functionName: "truncateMiddle", 
        input: ["short.txt", 15],
        expected: "short.txt"
      }
    ],
    focus: "Master string splitting, joining, and slicing for text processing."
  },
  4: {
    week: 1,
    title: "String Methods: replace, match, includes",
    problem: "Build a simple text processor that can clean text, validate formats, and extract information.",
    example: `const messyText = "Hello  World! This is   a test.";
const email = "user@example.com";
const phone = "123-456-7890";`,
    starter: `function cleanText(text) {
  // Remove extra spaces and normalize
  
}

function validateEmail(email) {
  // Check if email contains @ and .
  
}

function extractNumbers(text) {
  // Extract all numbers from text
  
}

function maskPhone(phone) {
  // Convert 123-456-7890 to XXX-XXX-7890
  
}`,
    solution: `function cleanText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function validateEmail(email) {
  return email.includes('@') && email.includes('.') && 
         email.indexOf('@') < email.lastIndexOf('.');
}

function extractNumbers(text) {
  const matches = text.match(/\d+/g);
  return matches ? matches.map(Number) : [];
}

function maskPhone(phone) {
  return phone.replace(/\d(?=\d{4})/g, 'X');
}`,
    testCases: [
      {
        name: "Clean messy text",
        functionName: "cleanText",
        input: ["Hello  World! This is   a test."],
        expected: "Hello World! This is a test."
      },
      {
        name: "Validate correct email",
        functionName: "validateEmail",
        input: ["user@example.com"],
        expected: true
      },
      {
        name: "Validate incorrect email",
        functionName: "validateEmail",
        input: ["invalid.email"],
        expected: false
      },
      {
        name: "Extract numbers from text",
        functionName: "extractNumbers",
        input: ["I have 5 apples and 10 oranges"],
        expected: [5, 10]
      },
      {
        name: "Extract numbers - no numbers",
        functionName: "extractNumbers",
        input: ["No numbers here"],
        expected: []
      },
      {
        name: "Mask phone number",
        functionName: "maskPhone",
        input: ["123-456-7890"],
        expected: "XXX-XXX-7890"
      }
    ],
    focus: "Learn pattern matching, text replacement, and validation techniques."
  },
  5: {
    week: 1,
    title: "Object Manipulation: keys, values, entries",
    problem: "Work with object properties to transform, filter, and analyze data structures.",
    example: `const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
  isActive: true,
  lastLogin: '2023-12-01'
};`,
    starter: `function analyzeObject(obj) {
  // Get all property names
  
  // Get all values
  
  // Get key-value pairs
  
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
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, transformer(value)])
  );
}`,
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
      },
      {
        name: "Transform object values",
        functionName: "transformObject",
        input: [{ a: 1, b: 2, c: 3 }, (x) => x * 2],
        expected: { a: 2, b: 4, c: 6 }
      },
      {
        name: "Transform strings to uppercase",
        functionName: "transformObject",
        input: [{ name: 'alice', city: 'boston' }, (x) => typeof x === 'string' ? x.toUpperCase() : x],
        expected: { name: 'ALICE', city: 'BOSTON' }
      }
    ],
    focus: "Master object introspection and transformation patterns."
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
  // Merge objects, address city should override person city
  
}

function updatePerson(person, updates) {
  // Return new object with updates applied
  
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
      },
      {
        name: "Merge person and address",
        functionName: "mergePersonAddress",
        input: [
          { name: 'John', age: 30, city: 'NYC' },
          { street: '123 Main St', city: 'Boston', zip: '02101' }
        ],
        expected: { 
          name: 'John', 
          age: 30, 
          city: 'Boston', 
          street: '123 Main St', 
          zip: '02101' 
        }
      },
      {
        name: "Update person",
        functionName: "updatePerson",
        input: [
          { name: 'John', age: 30, city: 'NYC' },
          { age: 31, email: 'john@example.com' }
        ],
        expected: { 
          name: 'John', 
          age: 31, 
          city: 'NYC', 
          email: 'john@example.com' 
        }
      }
    ],
    focus: "Learn destructuring assignment and spread operator for clean object manipulation."
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
  // Swap first two elements, keep rest unchanged
  
}

function sum(...numbers) {
  // Sum all arguments using rest parameters
  
}

function createPoint(x, y, ...extras) {
  // Create point object with optional extra properties
  
}`,
    solution: `function getFirstAndRest(arr) {
  const [first, ...rest] = arr;
  return { first, rest };
}

function swapFirstTwo(arr) {
  const [first, second, ...rest] = arr;
  return [second, first, ...rest];
}

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

function createPoint(x, y, ...extras) {
  return { x, y, extras };
}`,
    testCases: [
      {
        name: "Get first and rest",
        functionName: "getFirstAndRest",
        input: [[1, 2, 3, 4, 5]],
        expected: { first: 1, rest: [2, 3, 4, 5] }
      },
      {
        name: "Swap first two elements",
        functionName: "swapFirstTwo",
        input: [[1, 2, 3, 4, 5]],
        expected: [2, 1, 3, 4, 5]
      },
      {
        name: "Sum multiple numbers",
        functionName: "sum",
        input: [1, 2, 3, 4, 5],
        expected: 15
      },
      {
        name: "Sum no numbers",
        functionName: "sum",
        input: [],
        expected: 0
      },
      {
        name: "Create point with extras",
        functionName: "createPoint",
        input: [10, 20, "red", "large"],
        expected: { x: 10, y: 20, extras: ["red", "large"] }
      },
      {
        name: "Create point without extras",
        functionName: "createPoint",
        input: [5, 15],
        expected: { x: 5, y: 15, extras: [] }
      }
    ],
    focus: "Master destructuring and rest parameters for flexible data handling."
  },
  8: {
    week: 2,
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
    focus: "Learn arrow function syntax and understand lexical scoping."
  },
  9: {
    week: 2,
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
  // Return function that validates input against rules
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
    focus: "Master closures for data privacy and function composition patterns."
  },
  10: {
    week: 2,
    title: "Async Basics: Promises & setTimeout",
    problem: "Work with asynchronous operations using Promises and understand the event loop.",
    example: `// Simulate API calls with delays
fetchUser(1).then(user => console.log(user));
// Should log user after 1 second`,
    starter: `function delay(ms) {
  // Return promise that resolves after ms milliseconds
}

function fetchUser(id) {
  // Simulate API call with 1 second delay
  // Return promise that resolves with user object
}

function fetchMultipleUsers(ids) {
  // Fetch multiple users concurrently
  // Return promise that resolves when all are done
}`,
    solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: \`User \${id}\`, email: \`user\${id}@example.com\` });
    }, 1000);
  });
}

function fetchMultipleUsers(ids) {
  return Promise.all(ids.map(id => fetchUser(id)));
}`,
    focus: "Learn Promise creation and understand asynchronous execution."
  },
  11: {
    week: 2,
    title: "Async/Await & Error Handling",
    problem: "Convert Promise chains to async/await and implement proper error handling.",
    example: `// Convert this Promise chain to async/await
fetchUser(1)
  .then(user => fetchUserPosts(user.id))
  .then(posts => posts.filter(post => post.published))
  .catch(error => console.error(error));`,
    starter: `// Convert to async/await
async function getUserPosts(userId) {
  // Fetch user, then their posts, then filter published ones
  // Handle errors appropriately
}

async function processMultipleUsers(userIds) {
  // Process users concurrently but handle individual failures
}`,
    solution: `async function getUserPosts(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(user.id);
    return posts.filter(post => post.published);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
}

async function processMultipleUsers(userIds) {
  const results = await Promise.allSettled(
    userIds.map(async (id) => {
      try {
        return await getUserPosts(id);
      } catch (error) {
        return { error: error.message, userId: id };
      }
    })
  );
  
  return results.map(result => 
    result.status === 'fulfilled' ? result.value : result.reason
  );
}`,
    focus: "Master async/await syntax and error handling patterns."
  },
  12: {
    week: 2,
    title: "Array Advanced: flat, flatMap, sort",
    problem: "Work with nested arrays and complex sorting requirements.",
    example: `const nested = [[1, 2], [3, [4, 5]], [6]];
const users = [
  { name: 'Alice', age: 30, scores: [85, 92, 78] },
  { name: 'Bob', age: 25, scores: [90, 88, 95] }
];`,
    starter: `function flattenArray(arr) {
  // Flatten nested array completely
}

function getTopScores(users, count = 5) {
  // Get top N scores across all users
}

function sortUsersByBestScore(users) {
  // Sort users by their highest score
}`,
    solution: `function flattenArray(arr) {
  return arr.flat(Infinity);
}

function getTopScores(users, count = 5) {
  return users
    .flatMap(user => user.scores)
    .sort((a, b) => b - a)
    .slice(0, count);
}

function sortUsersByBestScore(users) {
  return users
    .map(user => ({
      ...user,
      bestScore: Math.max(...user.scores)
    }))
    .sort((a, b) => b.bestScore - a.bestScore);
}`,
    focus: "Learn advanced array methods for complex data transformations."
  },
  13: {
    week: 2,
    title: "Set and Map Data Structures",
    problem: "Use Set and Map for unique collections and key-value relationships.",
    example: `const tags = ['react', 'javascript', 'react', 'node', 'javascript'];
const userRoles = new Map([
  ['alice', 'admin'],
  ['bob', 'user'],
  ['charlie', 'moderator']
]);`,
    starter: `function getUniqueTags(tags) {
  // Return array of unique tags
}

function groupUsersByRole(users) {
  // Return Map where key is role, value is array of users
}

function findCommonTags(tagArrays) {
  // Find tags that appear in all arrays
}`,
    solution: `function getUniqueTags(tags) {
  return [...new Set(tags)];
}

function groupUsersByRole(users) {
  return users.reduce((groups, user) => {
    const role = user.role;
    if (!groups.has(role)) {
      groups.set(role, []);
    }
    groups.get(role).push(user);
    return groups;
  }, new Map());
}

function findCommonTags(tagArrays) {
  if (tagArrays.length === 0) return [];
  
  const firstSet = new Set(tagArrays[0]);
  return [...firstSet].filter(tag =>
    tagArrays.every(tags => tags.includes(tag))
  );
}`,
    focus: "Master Set and Map for efficient data operations."
  },
  14: {
    week: 2,
    title: "Regular Expressions Basics",
    problem: "Use regex patterns for text validation and extraction.",
    example: `const email = 'user@example.com';
const phone = '(555) 123-4567';
const text = 'Visit https://example.com or http://test.org';`,
    starter: `function validateEmail(email) {
  // Use regex to validate email format
}

function extractPhoneNumbers(text) {
  // Extract all phone numbers from text
}

function extractUrls(text) {
  // Extract all URLs from text
}

function formatCamelCase(text) {
  // Convert "hello world" to "helloWorld"
}`,
    solution: `function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function extractPhoneNumbers(text) {
  const phoneRegex = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  return text.match(phoneRegex) || [];
}

function extractUrls(text) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  return text.match(urlRegex) || [];
}

function formatCamelCase(text) {
  return text.replace(/\s+(.)/g, (match, letter) => letter.toUpperCase());
}`,
    focus: "Learn regex patterns for common text processing tasks."
  },
  15: {
    week: 3,
    title: "Recursion: Basic Patterns",
    problem: "Implement recursive solutions for mathematical and array problems.",
    example: `factorial(5) // 120
fibonacci(7) // 13
countDown(3) // logs: 3, 2, 1, "Done!"`,
    starter: `function factorial(n) {
  // Calculate n! recursively
}

function fibonacci(n) {
  // Calculate nth Fibonacci number
}

function countDown(n) {
  // Count down from n to 1, then log "Done!"
}

function arraySum(arr) {
  // Sum array elements recursively
}`,
    solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function countDown(n) {
  if (n <= 0) {
    console.log("Done!");
    return;
  }
  console.log(n);
  countDown(n - 1);
}

function arraySum(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + arraySum(arr.slice(1));
}`,
    focus: "Understand base cases and recursive calls for mathematical problems."
  },
  16: {
    week: 3,
    title: "Recursion: Tree Traversal",
    problem: "Navigate nested object structures using recursive approaches.",
    example: `const fileSystem = {
  name: 'root',
  type: 'folder',
  children: [
    { name: 'file1.txt', type: 'file', size: 100 },
    {
      name: 'subfolder',
      type: 'folder',
      children: [
        { name: 'file2.txt', type: 'file', size: 200 }
      ]
    }
  ]
};`,
    starter: `function findAllFiles(node) {
  // Return array of all file names in the tree
}

function calculateTotalSize(node) {
  // Calculate total size of all files
}

function findFile(node, fileName) {
  // Find and return file object by name
}`,
    solution: `function findAllFiles(node) {
  if (node.type === 'file') {
    return [node.name];
  }
  
  if (node.type === 'folder' && node.children) {
    return node.children.flatMap(child => findAllFiles(child));
  }
  
  return [];
}

function calculateTotalSize(node) {
  if (node.type === 'file') {
    return node.size || 0;
  }
  
  if (node.type === 'folder' && node.children) {
    return node.children.reduce((total, child) => 
      total + calculateTotalSize(child), 0);
  }
  
  return 0;
}

function findFile(node, fileName) {
  if (node.type === 'file' && node.name === fileName) {
    return node;
  }
  
  if (node.type === 'folder' && node.children) {
    for (const child of node.children) {
      const found = findFile(child, fileName);
      if (found) return found;
    }
  }
  
  return null;
}`,
    focus: "Learn tree traversal patterns and recursive data structure navigation."
  },
  17: {
    week: 3,
    title: "Algorithm: Binary Search",
    problem: "Implement binary search for sorted arrays and understand O(log n) complexity.",
    example: `const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
binarySearch(sortedArray, 7) // returns index 3
binarySearch(sortedArray, 6) // returns -1`,
    starter: `function binarySearch(arr, target) {
  // Implement iterative binary search
}

function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // Implement recursive binary search
}

function findInsertPosition(arr, target) {
  // Find position where target should be inserted
}`,
    solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

function findInsertPosition(arr, target) {
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}`,
    focus: "Master binary search algorithm and understand logarithmic time complexity."
  },
  18: {
    week: 3,
    title: "Algorithm: Two Pointers",
    problem: "Use two-pointer technique for array problems and string manipulation.",
    example: `const nums = [1, 2, 3, 4, 5, 6];
// Find pair that sums to target
// Reverse array in place
// Check if string is palindrome`,
    starter: `function twoSum(sortedArray, target) {
  // Find two numbers that sum to target
  // Return their indices or [-1, -1] if not found
}

function reverseArray(arr) {
  // Reverse array in place using two pointers
}

function isPalindrome(str) {
  // Check if string is palindrome using two pointers
}

function removeDuplicates(sortedArray) {
  // Remove duplicates in place, return new length
}`,
    solution: `function twoSum(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  
  while (left < right) {
    const sum = sortedArray[left] + sortedArray[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return [-1, -1];
}

function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  
  return arr;
}

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

function removeDuplicates(sortedArray) {
  if (sortedArray.length === 0) return 0;
  
  let writeIndex = 1;
  
  for (let readIndex = 1; readIndex < sortedArray.length; readIndex++) {
    if (sortedArray[readIndex] !== sortedArray[readIndex - 1]) {
      sortedArray[writeIndex] = sortedArray[readIndex];
      writeIndex++;
    }
  }
  
  return writeIndex;
}`,
    focus: "Learn two-pointer technique for efficient array and string operations."
  },
  19: {
    week: 3,
    title: "Algorithm: Sliding Window",
    problem: "Use sliding window technique for subarray and substring problems.",
    example: `const nums = [1, 4, 2, 1, 5, 3];
maxSumSubarray(nums, 3) // 8 (subarray [2,1,5])
const str = "abcabcbb";
longestUniqueSubstring(str) // 3 ("abc")`,
    starter: `function maxSumSubarray(arr, k) {
  // Find maximum sum of subarray of length k
}

function longestUniqueSubstring(str) {
  // Find length of longest substring without repeating characters
}

function minWindowSubstring(str, pattern) {
  // Find minimum window substring containing all pattern characters
}`,
    solution: `function maxSumSubarray(arr, k) {
  if (arr.length < k) return null;
  
  // Calculate sum of first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  let maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

function longestUniqueSubstring(str) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < str.length; right++) {
    while (seen.has(str[right])) {
      seen.delete(str[left]);
      left++;
    }
    
    seen.add(str[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

function minWindowSubstring(str, pattern) {
  const patternCount = {};
  for (const char of pattern) {
    patternCount[char] = (patternCount[char] || 0) + 1;
  }
  
  let left = 0;
  let minLength = Infinity;
  let minStart = 0;
  let matched = 0;
  
  for (let right = 0; right < str.length; right++) {
    const rightChar = str[right];
    
    if (rightChar in patternCount) {
      patternCount[rightChar]--;
      if (patternCount[rightChar] === 0) {
        matched++;
      }
    }
    
    while (matched === Object.keys(patternCount).length) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minStart = left;
      }
      
      const leftChar = str[left];
      if (leftChar in patternCount) {
        if (patternCount[leftChar] === 0) {
          matched--;
        }
        patternCount[leftChar]++;
      }
      left++;
    }
  }
  
  return minLength === Infinity ? "" : str.substr(minStart, minLength);
}`,
    focus: "Master sliding window technique for substring and subarray problems."
  },
  20: {
    week: 3,
    title: "Data Transformation: Grouping",
    problem: "Group and aggregate data using various criteria and methods.",
    example: `const sales = [
  { product: 'laptop', category: 'electronics', amount: 1000, date: '2023-01-15' },
  { product: 'mouse', category: 'electronics', amount: 25, date: '2023-01-16' },
  { product: 'desk', category: 'furniture', amount: 300, date: '2023-01-15' }
];`,
    starter: `function groupByCategory(items) {
  // Group items by category
}

function groupByDate(items) {
  // Group items by date
}

function calculateCategoryTotals(items) {
  // Calculate total amount per category
}

function getTopSellingProducts(items, n = 3) {
  // Get top N products by total sales
}`,
    solution: `function groupByCategory(items) {
  return items.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});
}

function groupByDate(items) {
  return items.reduce((groups, item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
}

function calculateCategoryTotals(items) {
  return items.reduce((totals, item) => {
    const category = item.category;
    totals[category] = (totals[category] || 0) + item.amount;
    return totals;
  }, {});
}

function getTopSellingProducts(items, n = 3) {
  const productTotals = items.reduce((totals, item) => {
    const product = item.product;
    totals[product] = (totals[product] || 0) + item.amount;
    return totals;
  }, {});
  
  return Object.entries(productTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, n)
    .map(([product, total]) => ({ product, total }));
}`,
    focus: "Learn data grouping and aggregation patterns for business logic."
  },
  21: {
    week: 3,
    title: "Data Transformation: Pivoting",
    problem: "Transform data between different structures and create pivot tables.",
    example: `const timeSeriesData = [
  { date: '2023-01', metric: 'sales', value: 1000 },
  { date: '2023-01', metric: 'users', value: 50 },
  { date: '2023-02', metric: 'sales', value: 1200 },
  { date: '2023-02', metric: 'users', value: 60 }
];`,
    starter: `function pivotByDate(data) {
  // Transform to: { '2023-01': { sales: 1000, users: 50 }, ... }
}

function pivotByMetric(data) {
  // Transform to: { sales: { '2023-01': 1000, '2023-02': 1200 }, ... }
}

function createSummaryTable(data) {
  // Create summary with totals and averages
}`,
    solution: `function pivotByDate(data) {
  return data.reduce((pivot, row) => {
    const { date, metric, value } = row;
    
    if (!pivot[date]) {
      pivot[date] = {};
    }
    
    pivot[date][metric] = value;
    return pivot;
  }, {});
}

function pivotByMetric(data) {
  return data.reduce((pivot, row) => {
    const { date, metric, value } = row;
    
    if (!pivot[metric]) {
      pivot[metric] = {};
    }
    
    pivot[metric][date] = value;
    return pivot;
  }, {});
}

function createSummaryTable(data) {
  const metrics = [...new Set(data.map(row => row.metric))];
  const dates = [...new Set(data.map(row => row.date))];
  
  const summary = {
    metrics: {},
    dates: {},
    overall: { total: 0, count: 0 }
  };
  
  // Calculate metric summaries
  metrics.forEach(metric => {
    const metricData = data.filter(row => row.metric === metric);
    const values = metricData.map(row => row.value);
    
    summary.metrics[metric] = {
      total: values.reduce((sum, val) => sum + val, 0),
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
      count: values.length
    };
  });
  
  // Calculate date summaries
  dates.forEach(date => {
    const dateData = data.filter(row => row.date === date);
    const values = dateData.map(row => row.value);
    
    summary.dates[date] = {
      total: values.reduce((sum, val) => sum + val, 0),
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
      count: values.length
    };
  });
  
  // Overall summary
  const allValues = data.map(row => row.value);
  summary.overall = {
    total: allValues.reduce((sum, val) => sum + val, 0),
    average: allValues.reduce((sum, val) => sum + val, 0) / allValues.length,
    count: allValues.length
  };
  
  return summary;
}`,
    focus: "Master data pivoting and summary table creation for analytics."
  },
  22: {
    week: 4,
    title: "Integration: API + Data Processing",
    problem: "Combine async operations with data transformation to build a complete feature.",
    example: `// Fetch user data, process it, and create summary
const userIds = [1, 2, 3];
// Expected: processed user data with analytics`,
    starter: `async function fetchAndProcessUsers(userIds) {
  // Fetch all users concurrently
  // Transform data and calculate metrics
  // Handle errors gracefully
}

function createUserAnalytics(users) {
  // Create comprehensive user analytics
}`,
    solution: `async function fetchAndProcessUsers(userIds) {
  try {
    const users = await Promise.all(
      userIds.map(async (id) => {
        const response = await fetch(\`/api/users/\${id}\`);
        return response.json();
      })
    );
    
    return createUserAnalytics(users);
  } catch (error) {
    console.error('Error processing users:', error);
    return { error: 'Failed to process users', users: [] };
  }
}

function createUserAnalytics(users) {
  const totalUsers = users.length;
  const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers;
  const departmentCounts = users.reduce((counts, user) => {
    counts[user.department] = (counts[user.department] || 0) + 1;
    return counts;
  }, {});
  
  return {
    totalUsers,
    averageAge: Math.round(averageAge * 100) / 100,
    departmentCounts,
    users: users.map(user => ({
      ...user,
      isActive: user.lastLogin > Date.now() - 30 * 24 * 60 * 60 * 1000
    }))
  };
}`,
    focus: "Integrate multiple concepts: async operations, data processing, and error handling."
  },
  23: {
    week: 4,
    title: "Integration: Form Validation + State Management",
    problem: "Build a complete form system with validation, state management, and user feedback.",
    example: `const formData = { email: 'user@example.com', password: '123', confirmPassword: '456' };
// Expected: validation results and clean state management`,
    starter: `class FormValidator {
  constructor(rules) {
    // Initialize with validation rules
  }
  
  validate(data) {
    // Validate all fields and return results
  }
  
  getErrors() {
    // Return current validation errors
  }
}

function createFormManager(initialData, validationRules) {
  // Create form state manager with validation
}`,
    solution: `class FormValidator {
  constructor(rules) {
    this.rules = rules;
    this.errors = {};
  }
  
  validate(data) {
    this.errors = {};
    
    Object.keys(this.rules).forEach(field => {
      const value = data[field];
      const fieldRules = this.rules[field];
      
      fieldRules.forEach(rule => {
        if (!rule.test(value)) {
          if (!this.errors[field]) this.errors[field] = [];
          this.errors[field].push(rule.message);
        }
      });
    });
    
    return Object.keys(this.errors).length === 0;
  }
  
  getErrors() {
    return this.errors;
  }
}

function createFormManager(initialData, validationRules) {
  const validator = new FormValidator(validationRules);
  let formData = { ...initialData };
  let isValid = false;
  
  return {
    getData: () => ({ ...formData }),
    updateField: (field, value) => {
      formData[field] = value;
      isValid = validator.validate(formData);
    },
    validate: () => {
      isValid = validator.validate(formData);
      return isValid;
    },
    getErrors: () => validator.getErrors(),
    isValid: () => isValid,
    reset: () => {
      formData = { ...initialData };
      isValid = false;
    }
  };
}`,
    focus: "Combine object-oriented design, state management, and validation patterns."
  },
  24: {
    week: 4,
    title: "Integration: Search + Filter + Sort",
    problem: "Build a complete data table with search, filtering, and sorting capabilities.",
    example: `const products = [
  { name: 'Laptop', category: 'electronics', price: 999, rating: 4.5 },
  { name: 'Chair', category: 'furniture', price: 150, rating: 4.2 }
];`,
    starter: `class DataTable {
  constructor(data) {
    // Initialize with data
  }
  
  search(query) {
    // Search across all fields
  }
  
  filter(criteria) {
    // Apply multiple filter criteria
  }
  
  sort(field, direction) {
    // Sort by field in given direction
  }
  
  getResults() {
    // Return processed results
  }
}`,
    solution: `class DataTable {
  constructor(data) {
    this.originalData = [...data];
    this.filteredData = [...data];
    this.searchQuery = '';
    this.filters = {};
    this.sortField = null;
    this.sortDirection = 'asc';
  }
  
  search(query) {
    this.searchQuery = query.toLowerCase();
    this._applyAllFilters();
    return this;
  }
  
  filter(criteria) {
    this.filters = { ...this.filters, ...criteria };
    this._applyAllFilters();
    return this;
  }
  
  sort(field, direction = 'asc') {
    this.sortField = field;
    this.sortDirection = direction;
    this._applySorting();
    return this;
  }
  
  _applyAllFilters() {
    let data = [...this.originalData];
    
    // Apply search
    if (this.searchQuery) {
      data = data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(this.searchQuery)
        )
      );
    }
    
    // Apply filters
    Object.entries(this.filters).forEach(([field, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        data = data.filter(item => {
          if (typeof value === 'object' && value.min !== undefined) {
            return item[field] >= value.min && item[field] <= value.max;
          }
          return item[field] === value;
        });
      }
    });
    
    this.filteredData = data;
    this._applySorting();
  }
  
  _applySorting() {
    if (this.sortField) {
      this.filteredData.sort((a, b) => {
        const aVal = a[this.sortField];
        const bVal = b[this.sortField];
        
        if (typeof aVal === 'string') {
          return this.sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }
  }
  
  getResults() {
    return {
      data: [...this.filteredData],
      total: this.filteredData.length,
      originalTotal: this.originalData.length
    };
  }
  
  reset() {
    this.filteredData = [...this.originalData];
    this.searchQuery = '';
    this.filters = {};
    this.sortField = null;
    this.sortDirection = 'asc';
    return this;
  }
}`,
    focus: "Build a complete data manipulation system with method chaining."
  },
  25: {
    week: 4,
    title: "Integration: Event System + Observer Pattern",
    problem: "Build an event-driven system with observers and custom events.",
    example: `const eventBus = new EventBus();
eventBus.on('user-login', (user) => console.log('User logged in:', user.name));
eventBus.emit('user-login', { name: 'Alice' });`,
    starter: `class EventBus {
  constructor() {
    // Initialize event storage
  }
  
  on(event, callback) {
    // Subscribe to event
  }
  
  off(event, callback) {
    // Unsubscribe from event
  }
  
  emit(event, data) {
    // Emit event to all subscribers
  }
}`,
    solution: `class EventBus {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  off(event, callback) {
    if (!this.events[event]) return;
    
    this.events[event] = this.events[event].filter(cb => cb !== callback);
    
    if (this.events[event].length === 0) {
      delete this.events[event];
    }
  }
  
  emit(event, data) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(\`Error in event handler for \${event}:\`, error);
      }
    });
  }
  
  once(event, callback) {
    const onceWrapper = (data) => {
      callback(data);
      this.off(event, onceWrapper);
    };
    
    this.on(event, onceWrapper);
  }
}`,
    focus: "Implement event-driven architecture with proper error handling."
  },
  26: {
    week: 4,
    title: "Integration: Cache + Performance Optimization",
    problem: "Build a caching system with TTL, LRU eviction, and performance monitoring.",
    example: `const cache = new Cache({ maxSize: 100, ttl: 5000 });
cache.set('user:1', userData);
const user = cache.get('user:1'); // Returns cached data`,
    starter: `class Cache {
  constructor(options = {}) {
    // Initialize cache with options
  }
  
  get(key) {
    // Get value from cache
  }
  
  set(key, value, ttl) {
    // Set value in cache with optional TTL
  }
  
  delete(key) {
    // Remove key from cache
  }
  
  clear() {
    // Clear all cache entries
  }
  
  getStats() {
    // Return cache statistics
  }
}`,
    solution: `class Cache {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 100;
    this.defaultTTL = options.ttl || 0;
    this.cache = new Map();
    this.accessOrder = new Map();
    this.stats = { hits: 0, misses: 0, sets: 0, deletes: 0 };
  }
  
  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return undefined;
    }
    
    // Check TTL
    if (entry.expires && Date.now() > entry.expires) {
      this.cache.delete(key);
      this.accessOrder.delete(key);
      this.stats.misses++;
      return undefined;
    }
    
    // Update access order for LRU
    this.accessOrder.delete(key);
    this.accessOrder.set(key, Date.now());
    
    this.stats.hits++;
    return entry.value;
  }
  
  set(key, value, ttl = this.defaultTTL) {
    // Remove oldest entry if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.accessOrder.keys().next().value;
      this.delete(oldestKey);
    }
    
    const expires = ttl > 0 ? Date.now() + ttl : null;
    
    this.cache.set(key, { value, expires });
    this.accessOrder.set(key, Date.now());
    this.stats.sets++;
  }
  
  delete(key) {
    const deleted = this.cache.delete(key);
    this.accessOrder.delete(key);
    
    if (deleted) {
      this.stats.deletes++;
    }
    
    return deleted;
  }
  
  clear() {
    this.cache.clear();
    this.accessOrder.clear();
  }
  
  getStats() {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      hitRate: total > 0 ? (this.stats.hits / total * 100).toFixed(2) + '%' : '0%',
      size: this.cache.size,
      maxSize: this.maxSize
    };
  }
}`,
    focus: "Implement advanced caching with LRU eviction and performance metrics."
  },
  27: {
    week: 4,
    title: "Integration: State Machine + Workflow",
    problem: "Build a finite state machine for managing complex workflows.",
    example: `const orderMachine = new StateMachine('pending', transitions);
orderMachine.transition('confirm'); // pending -> confirmed
orderMachine.getState(); // 'confirmed'`,
    starter: `class StateMachine {
  constructor(initialState, transitions) {
    // Initialize state machine
  }
  
  transition(action) {
    // Attempt state transition
  }
  
  getState() {
    // Get current state
  }
  
  canTransition(action) {
    // Check if transition is valid
  }
  
  getAvailableActions() {
    // Get all valid actions from current state
  }
}`,
    solution: `class StateMachine {
  constructor(initialState, transitions) {
    this.currentState = initialState;
    this.transitions = transitions;
    this.history = [initialState];
    this.listeners = {};
  }
  
  transition(action) {
    const currentTransitions = this.transitions[this.currentState];
    
    if (!currentTransitions || !currentTransitions[action]) {
      throw new Error(\`Invalid transition: \${action} from \${this.currentState}\`);
    }
    
    const nextState = currentTransitions[action];
    const previousState = this.currentState;
    
    this.currentState = nextState;
    this.history.push(nextState);
    
    // Emit transition event
    this._emit('transition', {
      from: previousState,
      to: nextState,
      action
    });
    
    // Emit state-specific events
    this._emit(\`enter:\${nextState}\`, { from: previousState, action });
    this._emit(\`exit:\${previousState}\`, { to: nextState, action });
    
    return nextState;
  }
  
  getState() {
    return this.currentState;
  }
  
  canTransition(action) {
    const currentTransitions = this.transitions[this.currentState];
    return currentTransitions && currentTransitions[action] !== undefined;
  }
  
  getAvailableActions() {
    const currentTransitions = this.transitions[this.currentState];
    return currentTransitions ? Object.keys(currentTransitions) : [];
  }
  
  getHistory() {
    return [...this.history];
  }
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  
  _emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}`,
    focus: "Master state management patterns for complex application workflows."
  },
  28: {
    week: 4,
    title: "Integration: Real-time Data + WebSocket Simulation",
    problem: "Build a real-time data system with connection management and data streaming.",
    example: `const dataStream = new DataStream();
dataStream.connect();
dataStream.subscribe('stock-prices', (data) => updateUI(data));`,
    starter: `class DataStream {
  constructor(options = {}) {
    // Initialize connection manager
  }
  
  connect() {
    // Establish connection
  }
  
  disconnect() {
    // Close connection
  }
  
  subscribe(channel, callback) {
    // Subscribe to data channel
  }
  
  unsubscribe(channel, callback) {
    // Unsubscribe from channel
  }
  
  send(channel, data) {
    // Send data to channel
  }
}`,
    solution: `class DataStream {
  constructor(options = {}) {
    this.url = options.url || 'ws://localhost:8080';
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.subscriptions = new Map();
    this.messageQueue = [];
  }
  
  connect() {
    return new Promise((resolve, reject) => {
      // Simulate WebSocket connection
      setTimeout(() => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Process queued messages
        this.messageQueue.forEach(msg => this._processMessage(msg));
        this.messageQueue = [];
        
        // Start heartbeat
        this._startHeartbeat();
        
        resolve();
      }, 100);
    });
  }
  
  disconnect() {
    this.isConnected = false;
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }
  
  subscribe(channel, callback) {
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, new Set());
    }
    
    this.subscriptions.get(channel).add(callback);
    
    // Send subscription message if connected
    if (this.isConnected) {
      this._sendMessage({ type: 'subscribe', channel });
    }
    
    return () => this.unsubscribe(channel, callback);
  }
  
  unsubscribe(channel, callback) {
    if (this.subscriptions.has(channel)) {
      this.subscriptions.get(channel).delete(callback);
      
      if (this.subscriptions.get(channel).size === 0) {
        this.subscriptions.delete(channel);
        
        if (this.isConnected) {
          this._sendMessage({ type: 'unsubscribe', channel });
        }
      }
    }
  }
  
  send(channel, data) {
    const message = { type: 'message', channel, data };
    
    if (this.isConnected) {
      this._sendMessage(message);
    } else {
      this.messageQueue.push(message);
    }
  }
  
  _sendMessage(message) {
    // Simulate sending message
    console.log('Sending:', message);
  }
  
  _processMessage(message) {
    if (message.type === 'data' && this.subscriptions.has(message.channel)) {
      const callbacks = this.subscriptions.get(message.channel);
      callbacks.forEach(callback => {
        try {
          callback(message.data);
        } catch (error) {
          console.error('Error in subscription callback:', error);
        }
      });
    }
  }
  
  _startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this._sendMessage({ type: 'ping' });
      }
    }, 30000);
  }
  
  // Simulate receiving data
  simulateData(channel, data) {
    this._processMessage({ type: 'data', channel, data });
  }
}`,
    focus: "Build real-time communication systems with proper connection management."
  },
  29: {
    week: 4,
    title: "Integration: Testing + Mocking Framework",
    problem: "Build a simple testing framework with mocking capabilities for your previous solutions.",
    example: `const test = new TestRunner();
test.describe('Calculator', () => {
  test.it('should add numbers', () => {
    test.expect(add(2, 3)).toBe(5);
  });
});`,
    starter: `class TestRunner {
  constructor() {
    // Initialize test runner
  }
  
  describe(name, callback) {
    // Group tests
  }
  
  it(name, callback) {
    // Define individual test
  }
  
  expect(actual) {
    // Create expectation object
  }
  
  run() {
    // Execute all tests
  }
}`,
    solution: `class TestRunner {
  constructor() {
    this.tests = [];
    this.currentSuite = null;
    this.results = { passed: 0, failed: 0, total: 0 };
  }
  
  describe(name, callback) {
    const previousSuite = this.currentSuite;
    this.currentSuite = { name, tests: [] };
    
    callback();
    
    this.tests.push(this.currentSuite);
    this.currentSuite = previousSuite;
  }
  
  it(name, callback) {
    const test = { name, callback, suite: this.currentSuite?.name };
    
    if (this.currentSuite) {
      this.currentSuite.tests.push(test);
    } else {
      this.tests.push(test);
    }
  }
  
  expect(actual) {
    return {
      toBe: (expected) => {
        if (actual !== expected) {
          throw new Error(\`Expected \${expected}, but got \${actual}\`);
        }
      },
      toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(\`Expected \${JSON.stringify(expected)}, but got \${JSON.stringify(actual)}\`);
        }
      },
      toBeTruthy: () => {
        if (!actual) {
          throw new Error(\`Expected truthy value, but got \${actual}\`);
        }
      },
      toBeFalsy: () => {
        if (actual) {
          throw new Error(\`Expected falsy value, but got \${actual}\`);
        }
      },
      toThrow: () => {
        let threw = false;
        try {
          if (typeof actual === 'function') {
            actual();
          }
        } catch (error) {
          threw = true;
        }
        
        if (!threw) {
          throw new Error('Expected function to throw an error');
        }
      }
    };
  }
  
  mock(obj, method) {
    const original = obj[method];
    const calls = [];
    
    obj[method] = (...args) => {
      calls.push(args);
      return obj[method].mockReturnValue;
    };
    
    obj[method].mockReturnValue = undefined;
    obj[method].mockImplementation = (fn) => {
      obj[method] = (...args) => {
        calls.push(args);
        return fn(...args);
      };
    };
    obj[method].getCalls = () => calls;
    obj[method].restore = () => {
      obj[method] = original;
    };
    
    return obj[method];
  }
  
  run() {
    this.results = { passed: 0, failed: 0, total: 0 };
    
    console.log('Running tests...\n');
    
    this.tests.forEach(item => {
      if (item.tests) {
        // Test suite
        console.log(\`\${item.name}:\`);
        item.tests.forEach(test => this._runTest(test, '  '));
      } else {
        // Individual test
        this._runTest(item);
      }
    });
    
    console.log(\`\nResults: \${this.results.passed} passed, \${this.results.failed} failed, \${this.results.total} total\`);
    
    return this.results;
  }
  
  _runTest(test, indent = '') {
    this.results.total++;
    
    try {
      test.callback();
      console.log(\`\${indent}✓ \${test.name}\`);
      this.results.passed++;
    } catch (error) {
      console.log(\`\${indent}✗ \${test.name}\`);
      console.log(\`\${indent}  Error: \${error.message}\`);
      this.results.failed++;
    }
  }
}`,
    focus: "Build testing infrastructure to validate your code solutions."
  },
  30: {
    week: 4,
    title: "Integration: Final Challenge - Mini Framework",
    problem: "Combine all concepts to build a mini application framework with components, state, events, and routing.",
    example: `const app = new MiniFramework();
app.component('TodoList', TodoListComponent);
app.route('/todos', 'TodoList');
app.mount('#app');`,
    starter: `class MiniFramework {
  constructor() {
    // Initialize framework
  }
  
  component(name, definition) {
    // Register component
  }
  
  route(path, component) {
    // Register route
  }
  
  mount(selector) {
    // Mount application
  }
  
  setState(newState) {
    // Update global state
  }
  
  getState() {
    // Get current state
  }
}`,
    solution: `class MiniFramework {
  constructor() {
    this.components = new Map();
    this.routes = new Map();
    this.state = {};
    this.listeners = [];
    this.currentRoute = null;
    this.mountPoint = null;
  }
  
  component(name, definition) {
    this.components.set(name, definition);
  }
  
  route(path, component) {
    this.routes.set(path, component);
  }
  
  mount(selector) {
    this.mountPoint = document.querySelector(selector);
    
    // Set up routing
    window.addEventListener('hashchange', () => this._handleRoute());
    window.addEventListener('load', () => this._handleRoute());
    
    this._handleRoute();
  }
  
  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    
    // Notify listeners
    this.listeners.forEach(listener => {
      listener(this.state, prevState);
    });
    
    this._render();
  }
  
  getState() {
    return { ...this.state };
  }
  
  subscribe(callback) {
    this.listeners.push(callback);
    
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  
  emit(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    document.dispatchEvent(customEvent);
  }
  
  on(event, callback) {
    document.addEventListener(event, callback);
  }
  
  _handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const componentName = this.routes.get(hash);
    
    if (componentName && this.components.has(componentName)) {
      this.currentRoute = { path: hash, component: componentName };
      this._render();
    }
  }
  
  _render() {
    if (!this.mountPoint || !this.currentRoute) return;
    
    const componentDefinition = this.components.get(this.currentRoute.component);
    
    if (typeof componentDefinition === 'function') {
      const html = componentDefinition(this.state, {
        setState: (newState) => this.setState(newState),
        emit: (event, data) => this.emit(event, data)
      });
      
      this.mountPoint.innerHTML = html;
      
      // Re-attach event listeners
      this._attachEventListeners();
    }
  }
  
  _attachEventListeners() {
    // Simple event delegation
    this.mountPoint.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (action) {
        this.emit('action', { type: action, target: e.target, event: e });
      }
    });
  }
}

// Example component
const TodoListComponent = (state, { setState, emit }) => {
  const todos = state.todos || [];
  
  return \`
    <div>
      <h2>Todo List</h2>
      <input type="text" id="newTodo" placeholder="Add new todo">
      <button data-action="addTodo">Add</button>
      <ul>
        \${todos.map((todo, index) => \`
          <li>
            \${todo.text}
            <button data-action="removeTodo" data-index="\${index}">Remove</button>
          </li>
        \`).join('')}
      </ul>
    </div>
  \`;
};`,
    focus: "Integrate all learned concepts into a cohesive application framework."
  },

  11: {
    week: 2,
    title: "Binary Search",
    problem: "Write a function that performs binary search on a sorted array.",
    example: "binarySearch([1, 3, 5, 7, 9], 5) → 2",
    starter: "function binarySearch(arr, target) {\n  // Your code here\n}",
    solution: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1; // Not found\n}",
    focus: "Left ≤ right, update left/right by mid ± 1.",
    testCases: [
      {
        name: "Find element in middle",
        input: [[1, 3, 5, 7, 9], 5],
        expected: 2
      },
      {
        name: "Find first element",
        input: [[1, 3, 5, 7, 9], 1],
        expected: 0
      },
      {
        name: "Find last element",
        input: [[1, 3, 5, 7, 9], 9],
        expected: 4
      },
      {
        name: "Element not found",
        input: [[1, 3, 5, 7, 9], 4],
        expected: -1
      },
      {
        name: "Empty array",
        input: [[], 5],
        expected: -1
      }
    ]
  },

  12: {
    week: 2,
    title: "Find Duplicates",
    problem: "Write a function that finds all duplicate elements in an array.",
    example: "findDuplicates([1, 2, 2, 3, 3, 3]) → [2, 3]",
    starter: "function findDuplicates(arr) {\n  // Your code here\n}",
    solution: "function findDuplicates(arr) {\n  const seen = new Set();\n  const duplicates = new Set();\n  \n  for (const item of arr) {\n    if (seen.has(item)) {\n      duplicates.add(item);\n    } else {\n      seen.add(item);\n    }\n  }\n  \n  return Array.from(duplicates);\n}",
    focus: "Use Set for O(1) lookups. Two sets: seen vs duplicates.",
    testCases: [
      {
        name: "Multiple duplicates",
        input: [[1, 2, 2, 3, 3, 3]],
        expected: [2, 3]
      },
      {
        name: "No duplicates",
        input: [[1, 2, 3, 4, 5]],
        expected: []
      },
      {
        name: "All duplicates",
        input: [[1, 1, 1, 1]],
        expected: [1]
      },
      {
        name: "Mixed types",
        input: [[1, '1', 2, '2', 1, 2]],
        expected: [1, 2]
      },
      {
        name: "Empty array",
        input: [[]],
        expected: []
      }
    ]
  },

  13: {
    week: 2,
    title: "Fibonacci Sequence",
    problem: "Write a function to generate the first n Fibonacci numbers.",
    example: "fibonacci(6) → [0, 1, 1, 2, 3, 5]",
    starter: "function fibonacci(n) {\n  // Your code here\n}",
    solution: "function fibonacci(n) {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  \n  const result = [0, 1];\n  \n  for (let i = 2; i < n; i++) {\n    result[i] = result[i - 1] + result[i - 2];\n  }\n  \n  return result;\n}",
    focus: "Iterative approach avoids recursion overhead.",
    testCases: [
      {
        name: "First 6 numbers",
        input: [6],
        expected: [0, 1, 1, 2, 3, 5]
      },
      {
        name: "First number only",
        input: [1],
        expected: [0]
      },
      {
        name: "First two numbers",
        input: [2],
        expected: [0, 1]
      },
      {
        name: "Zero numbers",
        input: [0],
        expected: []
      },
      {
        name: "First 10 numbers",
        input: [10],
        expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
      }
    ]
  },

  14: {
    week: 2,
    title: "Sum of Range",
    problem: "Write a function that returns the sum of numbers in a given range.",
    example: "sumRange(3, 7) → 25 (3+4+5+6+7)",
    starter: "function sumRange(start, end) {\n  // Your code here\n}",
    solution: "function sumRange(start, end) {\n  let sum = 0;\n  for (let i = start; i <= end; i++) {\n    sum += i;\n  }\n  return sum;\n}",
    focus: "Simple loop vs mathematical formula. Know both approaches.",
    testCases: [
      {
        name: "Range 3 to 7",
        input: [3, 7],
        expected: 25
      },
      {
        name: "Single number",
        input: [5, 5],
        expected: 5
      },
      {
        name: "Range 1 to 10",
        input: [1, 10],
        expected: 55
      },
      {
        name: "Negative range",
        input: [-3, 3],
        expected: 0
      },
      {
        name: "Zero range",
        input: [0, 0],
        expected: 0
      }
    ]
  },

  15: {
    week: 3,
    title: "Group Objects by Property",
    problem: "Write a function that groups an array of objects by a specified property.",
    example: "groupBy([{name: 'Alice', age: 25}, {name: 'Bob', age: 25}], 'age') → {25: [{...}, {...}]}",
    starter: "function groupBy(arr, key) {\n  // Your code here\n}",
    solution: "function groupBy(arr, key) {\n  return arr.reduce((groups, obj) => {\n    const value = obj[key];\n    if (!groups[value]) {\n      groups[value] = [];\n    }\n    groups[value].push(obj);\n    return groups;\n  }, {});\n}",
    focus: "Reduce pattern for building grouped objects.",
    testCases: [
      {
        name: "Group by age",
        input: [[{name: 'Alice', age: 25}, {name: 'Bob', age: 25}, {name: 'Charlie', age: 30}], 'age'],
        expected: {25: [{name: 'Alice', age: 25}, {name: 'Bob', age: 25}], 30: [{name: 'Charlie', age: 30}]}
      },
      {
        name: "Group by department",
        input: [[{name: 'Alice', dept: 'IT'}, {name: 'Bob', dept: 'HR'}, {name: 'Charlie', dept: 'IT'}], 'dept'],
        expected: {IT: [{name: 'Alice', dept: 'IT'}, {name: 'Charlie', dept: 'IT'}], HR: [{name: 'Bob', dept: 'HR'}]}
      },
      {
        name: "Empty array",
        input: [[], 'key'],
        expected: {}
      }
    ]
  },

  16: {
    week: 3,
    title: "Merge Objects",
    problem: "Write a function that deep merges two objects.",
    example: "merge({a: 1, b: {c: 2}}, {b: {d: 3}}) → {a: 1, b: {c: 2, d: 3}}",
    starter: "function merge(obj1, obj2) {\n  // Your code here\n}",
    solution: "function merge(obj1, obj2) {\n  const result = { ...obj1 };\n  \n  for (const key in obj2) {\n    if (obj2[key] && typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {\n      result[key] = merge(result[key] || {}, obj2[key]);\n    } else {\n      result[key] = obj2[key];\n    }\n  }\n  \n  return result;\n}",
    focus: "Recursive merging for nested objects. Handle arrays separately.",
    testCases: [
      {
        name: "Deep merge nested objects",
        input: [{a: 1, b: {c: 2}}, {b: {d: 3}}],
        expected: {a: 1, b: {c: 2, d: 3}}
      },
      {
        name: "Override primitive values",
        input: [{a: 1, b: 2}, {b: 3, c: 4}],
        expected: {a: 1, b: 3, c: 4}
      },
      {
        name: "Handle arrays",
        input: [{a: [1, 2]}, {a: [3, 4]}],
        expected: {a: [3, 4]}
      }
    ]
  },

  17: {
    week: 3,
    title: "Flatten Nested Arrays",
    problem: "Write a function that flattens a nested array to any depth.",
    example: "flatten([1, [2, [3, 4]], 5]) → [1, 2, 3, 4, 5]",
    starter: "function flatten(arr) {\n  // Your code here\n}",
    solution: "function flatten(arr) {\n  const result = [];\n  \n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...flatten(item));\n    } else {\n      result.push(item);\n    }\n  }\n  \n  return result;\n}",
    focus: "Recursion + spread operator. Know the built-in alternative.",
    testCases: [
      {
        name: "Nested arrays",
        input: [[1, [2, [3, 4]], 5]],
        expected: [1, 2, 3, 4, 5]
      },
      {
        name: "Already flat",
        input: [[1, 2, 3, 4, 5]],
        expected: [1, 2, 3, 4, 5]
      },
      {
        name: "Deep nesting",
        input: [[1, [2, [3, [4, [5]]]]]],
        expected: [1, 2, 3, 4, 5]
      },
      {
        name: "Empty arrays",
        input: [[1, [], [2, []], 3]],
        expected: [1, 2, 3]
      }
    ]
  },

  18: {
    week: 3,
    title: "Remove Duplicates",
    problem: "Write a function that removes duplicate elements from an array, preserving order.",
    example: "removeDuplicates([1, 2, 2, 3, 1]) → [1, 2, 3]",
    starter: "function removeDuplicates(arr) {\n  // Your code here\n}",
    solution: "function removeDuplicates(arr) {\n  const seen = new Set();\n  return arr.filter(item => {\n    if (seen.has(item)) {\n      return false;\n    }\n    seen.add(item);\n    return true;\n  });\n}",
    focus: "Set + filter pattern vs Set constructor shortcut.",
    testCases: [
      {
        name: "Remove duplicates preserving order",
        input: [[1, 2, 2, 3, 1]],
        expected: [1, 2, 3]
      },
      {
        name: "No duplicates",
        input: [[1, 2, 3, 4]],
        expected: [1, 2, 3, 4]
      },
      {
        name: "All duplicates",
        input: [[1, 1, 1, 1]],
        expected: [1]
      },
      {
        name: "Mixed types",
        input: [[1, '1', 2, '2', 1, '1']],
        expected: [1, '1', 2, '2']
      }
    ]
  },

  19: {
    week: 3,
    title: "Chunk Array",
    problem: "Write a function that splits an array into chunks of specified size.",
    example: "chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]",
    starter: "function chunk(arr, size) {\n  // Your code here\n}",
    solution: "function chunk(arr, size) {\n  const result = [];\n  \n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  \n  return result;\n}",
    focus: "Step by size, use slice for each chunk.",
    testCases: [
      {
        name: "Chunk by 2",
        input: [[1, 2, 3, 4, 5], 2],
        expected: [[1, 2], [3, 4], [5]]
      },
      {
        name: "Chunk by 3",
        input: [[1, 2, 3, 4, 5, 6], 3],
        expected: [[1, 2, 3], [4, 5, 6]]
      },
      {
        name: "Chunk larger than array",
        input: [[1, 2], 5],
        expected: [[1, 2]]
      },
      {
        name: "Empty array",
        input: [[], 2],
        expected: []
      }
    ]
  },

  20: {
    week: 3,
    title: "Matrix Operations",
    problem: "Write a function that transposes a 2D matrix (rows become columns).",
    example: "transpose([[1, 2, 3], [4, 5, 6]]) → [[1, 4], [2, 5], [3, 6]]",
    starter: "function transpose(matrix) {\n  // Your code here\n}",
    solution: "function transpose(matrix) {\n  if (matrix.length === 0) return [];\n  \n  const rows = matrix.length;\n  const cols = matrix[0].length;\n  const result = [];\n  \n  for (let col = 0; col < cols; col++) {\n    result[col] = [];\n    for (let row = 0; row < rows; row++) {\n      result[col][row] = matrix[row][col];\n    }\n  }\n  \n  return result;\n}",
    focus: "Swap indices: matrix[row][col] becomes result[col][row].",
    testCases: [
      {
        name: "2x3 matrix",
        input: [[[1, 2, 3], [4, 5, 6]]],
        expected: [[1, 4], [2, 5], [3, 6]]
      },
      {
        name: "3x2 matrix",
        input: [[[1, 2], [3, 4], [5, 6]]],
        expected: [[1, 3, 5], [2, 4, 6]]
      },
      {
        name: "Square matrix",
        input: [[[1, 2], [3, 4]]],
        expected: [[1, 3], [2, 4]]
      },
      {
        name: "Empty matrix",
        input: [[]],
        expected: []
      }
    ]
  },

  21: {
    week: 3,
    title: "Curry Function",
    problem: "Write a curry function that transforms f(a, b, c) into f(a)(b)(c).",
    example: "const add3 = curry((a, b, c) => a + b + c); add3(1)(2)(3) → 6",
    starter: "function curry(fn) {\n  // Your code here\n}",
    solution: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    \n    return function(...nextArgs) {\n      return curried.apply(this, args.concat(nextArgs));\n    };\n  };\n}",
    focus: "Collect arguments until you have enough, then call original function.",
    testCases: [
      {
        name: "Curry addition function",
        functionName: "testCurry",
        input: [],
        expected: 6
      }
    ]
  },

  22: {
    week: 4,
    title: "Review: Timed Prime Numbers",
    problem: "Generate all prime numbers from 1 to 1000. Aim for under 2 minutes.",
    example: "Should return array of 168 prime numbers",
    starter: "function getPrimesTo1000() {\n  // Choose your approach: basic, sieve, or optimized\n}",
    solution: "function getPrimesTo1000() {\n  return sieveOfEratosthenes(1000);\n}\n\nfunction sieveOfEratosthenes(n) {\n  if (n < 2) return [];\n  const isPrime = new Array(n + 1).fill(true);\n  isPrime[0] = isPrime[1] = false;\n  \n  for (let i = 2; i * i <= n; i++) {\n    if (isPrime[i]) {\n      for (let j = i * i; j <= n; j += i) {\n        isPrime[j] = false;\n      }\n    }\n  }\n  \n  const primes = [];\n  for (let i = 2; i <= n; i++) {\n    if (isPrime[i]) primes.push(i);\n  }\n  return primes;\n}",
    focus: "Speed drill. Use your most confident approach first.",
    testCases: [
      {
        name: "Generate primes to 1000",
        input: [],
        expected: 168 // Length of result array
      }
    ]
  },

  23: {
    week: 4,
    title: "Review: Timed Array Processing",
    problem: "Process array: remove duplicates, sort, return every other element. Under 3 minutes.",
    example: "processArray([3, 1, 4, 1, 5, 9, 2, 6, 5]) → [2, 4, 6]",
    starter: "function processArray(arr) {\n  // Your code here\n}",
    solution: "function processArray(arr) {\n  return [...new Set(arr)]\n    .sort((a, b) => a - b)\n    .filter((_, index) => index % 2 === 0);\n}",
    focus: "Chain operations smoothly. Practice the syntax until automatic.",
    testCases: [
      {
        name: "Process mixed array",
        input: [[3, 1, 4, 1, 5, 9, 2, 6, 5]],
        expected: [1, 3, 5, 9]
      },
      {
        name: "Already sorted unique",
        input: [[1, 2, 3, 4, 5]],
        expected: [1, 3, 5]
      }
    ]
  },

  24: {
    week: 4,
    title: "Review: Timed String Manipulation",
    problem: "Find the longest word in a sentence. Under 2 minutes.",
    example: "longestWord('The quick brown fox') → 'quick'",
    starter: "function longestWord(sentence) {\n  // Your code here\n}",
    solution: "function longestWord(sentence) {\n  return sentence\n    .split(' ')\n    .reduce((longest, current) => \n      current.length > longest.length ? current : longest\n    );\n}",
    focus: "Split and reduce pattern. Handle edge cases quickly.",
    testCases: [
      {
        name: "Find longest word",
        input: ['The quick brown fox'],
        expected: 'quick'
      },
      {
        name: "Single word",
        input: ['hello'],
        expected: 'hello'
      },
      {
        name: "Multiple longest",
        input: ['cat dog bird'],
        expected: 'bird'
      }
    ]
  },

  25: {
    week: 4,
    title: "Currency Converter: Basic",
    problem: "Write a function that converts between currencies using given exchange rates.",
    example: "convert(100, 'USD', 'EUR', {USD: 1, EUR: 0.85}) → 85",
    starter: "function convert(amount, fromCurrency, toCurrency, rates) {\n  // Your code here\n}",
    solution: "function convert(amount, fromCurrency, toCurrency, rates) {\n  if (!rates[fromCurrency] || !rates[toCurrency]) {\n    throw new Error('Currency not found');\n  }\n  \n  // Convert to base currency (rates[currency] is rate FROM base)\n  const baseAmount = amount / rates[fromCurrency];\n  \n  // Convert from base to target currency\n  return baseAmount * rates[toCurrency];\n}",
    focus: "Handle missing currencies. Use base currency as intermediate.",
    testCases: [
      {
        name: "USD to EUR",
        input: [100, 'USD', 'EUR', {USD: 1, EUR: 0.85}],
        expected: 85
      },
      {
        name: "EUR to USD",
        input: [85, 'EUR', 'USD', {USD: 1, EUR: 0.85}],
        expected: 100
      }
    ]
  },

  26: {
    week: 4,
    title: "Currency Converter: Formatting",
    problem: "Extend currency converter to format output with proper currency symbols.",
    example: "formatCurrency(85.50, 'EUR') → '€85.50'",
    starter: "function formatCurrency(amount, currency) {\n  // Your code here\n}",
    solution: "function formatCurrency(amount, currency) {\n  const symbols = {\n    USD: '$',\n    EUR: '€',\n    GBP: '£',\n    JPY: '¥'\n  };\n  \n  const symbol = symbols[currency] || currency;\n  return `${symbol}${amount.toFixed(2)}`;\n}",
    focus: "Combine functions. Build complex behavior from simple pieces.",
    testCases: [
      {
        name: "Format EUR",
        input: [85.50, 'EUR'],
        expected: '€85.50'
      },
      {
        name: "Format USD",
        input: [100, 'USD'],
        expected: '$100.00'
      },
      {
        name: "Unknown currency",
        input: [50, 'XYZ'],
        expected: 'XYZ50.00'
      }
    ]
  },

  27: {
    week: 4,
    title: "Currency Converter: Validation",
    problem: "Add input validation to currency converter (positive amounts, valid currencies).",
    example: "Should handle invalid inputs gracefully",
    starter: "function safeConvert(amount, fromCurrency, toCurrency, rates) {\n  // Your code here\n}",
    solution: "function safeConvert(amount, fromCurrency, toCurrency, rates) {\n  // Validate inputs\n  if (typeof amount !== 'number' || amount < 0) {\n    throw new Error('Amount must be a positive number');\n  }\n  \n  if (!fromCurrency || !toCurrency) {\n    throw new Error('Currency codes are required');\n  }\n  \n  if (!rates || typeof rates !== 'object') {\n    throw new Error('Exchange rates must be provided');\n  }\n  \n  if (!rates[fromCurrency]) {\n    throw new Error(`Exchange rate for ${fromCurrency} not found`);\n  }\n  \n  if (!rates[toCurrency]) {\n    throw new Error(`Exchange rate for ${toCurrency} not found`);\n  }\n  \n  // Convert to base currency\n  const baseAmount = amount / rates[fromCurrency];\n  return baseAmount * rates[toCurrency];\n}",
    focus: "Validate early and clearly. Good error messages help debugging.",
    testCases: [
      {
        name: "Valid conversion",
        input: [100, 'USD', 'EUR', {USD: 1, EUR: 0.85}],
        expected: 85
      }
    ]
  },

  28: {
    week: 4,
    title: "Variable Arguments: Sum Function",
    problem: "Write a function that sums any number of arguments, handling nested arrays.",
    example: "flexSum(1, 2, [3, 4], 5, [6, [7, 8]]) → 36",
    starter: "function flexSum(...args) {\n  // Your code here\n}",
    solution: "function flexSum(...args) {\n  let sum = 0;\n  \n  for (const arg of args) {\n    if (Array.isArray(arg)) {\n      sum += flexSum(...arg); // Recursive call for arrays\n    } else if (typeof arg === 'number') {\n      sum += arg;\n    }\n    // Ignore non-numeric values\n  }\n  \n  return sum;\n}",
    focus: "Rest parameters + recursion. Handle mixed types gracefully.",
    testCases: [
      {
        name: "Mixed arguments",
        input: [1, 2, [3, 4], 5, [6, [7, 8]]],
        expected: 36
      },
      {
        name: "Only numbers",
        input: [1, 2, 3, 4, 5],
        expected: 15
      },
      {
        name: "With non-numbers",
        input: [1, 'hello', 2, null, 3],
        expected: 6
      }
    ]
  },

  29: {
    week: 4,
    title: "Edge Cases: Null/Undefined Handling",
    problem: "Write a safe array processor that handles null, undefined, and mixed data types.",
    example: "safeProcess([1, null, 'hello', undefined, 2]) → [1, 2] (numbers only)",
    starter: "function safeProcess(data) {\n  // Your code here\n}",
    solution: "function safeProcess(data) {\n  // Handle null/undefined input\n  if (!data || !Array.isArray(data)) {\n    return [];\n  }\n  \n  return data.filter(item => {\n    return item !== null && \n           item !== undefined && \n           typeof item === 'number' && \n           !isNaN(item);\n  });\n}",
    focus: "Guard against bad inputs. Filter out problematic values early.",
    testCases: [
      {
        name: "Mixed data types",
        input: [[1, null, 'hello', undefined, 2]],
        expected: [1, 2]
      },
      {
        name: "Null input",
        input: [null],
        expected: []
      },
      {
        name: "All valid numbers",
        input: [[1, 2, 3, 4, 5]],
        expected: [1, 2, 3, 4, 5]
      }
    ]
  },

  30: {
    week: 4,
    title: "Final Challenge: Data Pipeline",
    problem: "Build a data processing pipeline: clean → transform → group → summarize.",
    example: "Process user data to get average age by department",
    starter: "function processUserData(users) {\n  // Pipeline: validate → clean → group by dept → calculate averages\n}",
    solution: "function processUserData(users) {\n  if (!Array.isArray(users)) return {};\n  \n  // Clean and validate data\n  const cleanUsers = users.filter(user => \n    user && \n    typeof user.age === 'number' && \n    user.age > 0 && \n    typeof user.department === 'string' &&\n    user.department.trim()\n  );\n  \n  // Group by department\n  const grouped = cleanUsers.reduce((groups, user) => {\n    const dept = user.department.trim();\n    if (!groups[dept]) {\n      groups[dept] = [];\n    }\n    groups[dept].push(user);\n    return groups;\n  }, {});\n  \n  // Calculate averages\n  const averages = {};\n  for (const dept in grouped) {\n    const ages = grouped[dept].map(user => user.age);\n    averages[dept] = ages.reduce((sum, age) => sum + age, 0) / ages.length;\n  }\n  \n  return averages;\n}",
    focus: "Chain operations: filter → reduce → transform. Handle real-world messy data.",
    testCases: [
      {
        name: "Process user data",
        input: [[
          {name: 'Alice', age: 30, department: 'IT'},
          {name: 'Bob', age: 25, department: 'IT'},
          {name: 'Charlie', age: 35, department: 'HR'},
          {name: 'David', age: null, department: 'IT'}
        ]],
        expected: {IT: 27.5, HR: 35}
      },
      {
        name: "Empty array",
        input: [[]],
        expected: {}
      }
    ]
  }
};
