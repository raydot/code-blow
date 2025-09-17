/**
 * Week 4: Integration & Speed
 * Real-world scenarios, timed challenges, and comprehensive problems
 */

export const week4Problems = {
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
    example: "processArray([3, 1, 4, 1, 5, 9, 2, 6, 5]) → [1, 3, 5, 9]",
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

export const week4Metadata = {
  week: 4,
  title: "Integration & Speed",
  description: "Real-world scenarios, timed challenges, and comprehensive problems",
  totalDays: 9,
  focus: "Apply all learned concepts in timed, real-world scenarios"
};
