import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, Target, Code, BookOpen, Zap } from 'lucide-react';

const App = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState(new Set());
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const curriculum = {
    1: {
      week: 1,
      title: "Array Methods: forEach, map, filter",
      problem: "Write a function that takes an array of numbers and returns an array containing only the even numbers, doubled.",
      example: "processNumbers([1, 2, 3, 4, 5]) → [4, 8]",
      starter: "function processNumbers(numbers) {\n  // Your code here\n}",
      solution: "function processNumbers(numbers) {\n  return numbers\n    .filter(num => num % 2 === 0)\n    .map(num => num * 2);\n}",
      focus: "Master chaining array methods. Practice filter → map pattern."
    },
    2: {
      week: 1,
      title: "Array Methods: reduce",
      problem: "Write a function that takes an array of words and returns an object counting the frequency of each word.",
      example: "countWords(['cat', 'dog', 'cat', 'fish']) → {cat: 2, dog: 1, fish: 1}",
      starter: "function countWords(words) {\n  // Your code here\n}",
      solution: "function countWords(words) {\n  return words.reduce((count, word) => {\n    count[word] = (count[word] || 0) + 1;\n    return count;\n  }, {});\n}",
      focus: "Reduce is your friend for transforming arrays into objects."
    },
    3: {
      week: 1,
      title: "String Manipulation: split/join",
      problem: "Write a function that takes a sentence and returns it with each word reversed, but words in original order.",
      example: "reverseWords('hello world') → 'olleh dlrow'",
      starter: "function reverseWords(sentence) {\n  // Your code here\n}",
      solution: "function reverseWords(sentence) {\n  return sentence\n    .split(' ')\n    .map(word => word.split('').reverse().join(''))\n    .join(' ');\n}",
      focus: "Split → transform → join is a core pattern."
    },
    4: {
      week: 1,
      title: "String Character Counting",
      problem: "Write a function that finds the first non-repeating character in a string.",
      example: "firstUnique('abccba') → undefined, firstUnique('abccbad') → 'd'",
      starter: "function firstUnique(str) {\n  // Your code here\n}",
      solution: "function firstUnique(str) {\n  const charCount = {};\n  \n  // Count characters\n  for (const char of str) {\n    charCount[char] = (charCount[char] || 0) + 1;\n  }\n  \n  // Find first with count of 1\n  for (const char of str) {\n    if (charCount[char] === 1) {\n      return char;\n    }\n  }\n  \n  return undefined;\n}",
      focus: "Two-pass pattern: count first, then find."
    },
    5: {
      week: 1,
      title: "Basic Recursion",
      problem: "Write a recursive function to calculate factorial.",
      example: "factorial(5) → 120",
      starter: "function factorial(n) {\n  // Your code here\n}",
      solution: "function factorial(n) {\n  // Base case\n  if (n <= 1) return 1;\n  \n  // Recursive case\n  return n * factorial(n - 1);\n}",
      focus: "Every recursion needs a base case and recursive case."
    },
    6: {
      week: 1,
      title: "Closures & Functions",
      problem: "Write a function that returns a function that multiplies by a given number.",
      example: "const double = multiplier(2); double(5) → 10",
      starter: "function multiplier(factor) {\n  // Your code here\n}",
      solution: "function multiplier(factor) {\n  return function(num) {\n    return num * factor;\n  };\n}",
      focus: "Inner function remembers outer function's variables."
    },
    7: {
      week: 1,
      title: "Variable Arguments",
      problem: "Write a function that returns all arguments passed to it as an array, regardless of how many.",
      example: "collectArgs(1, 2, 'hello', true) → [1, 2, 'hello', true]",
      starter: "function collectArgs() {\n  // Your code here\n}",
      solution: "function collectArgs(...args) {\n  return args;\n}\n\n// Alternative approach:\nfunction collectArgsOld() {\n  return Array.from(arguments);\n}",
      focus: "Rest parameters (...args) vs arguments object."
    },
    8: {
      week: 2,
      title: "Prime Numbers: Basic Check",
      problem: "Write a function that checks if a number is prime.",
      example: "isPrime(17) → true, isPrime(15) → false",
      starter: "function isPrime(num) {\n  // Your code here\n}",
      solution: "function isPrime(num) {\n  if (num < 2) return false;\n  if (num === 2) return true;\n  if (num % 2 === 0) return false;\n  \n  for (let i = 3; i <= Math.sqrt(num); i += 2) {\n    if (num % i === 0) return false;\n  }\n  \n  return true;\n}",
      focus: "Optimize: check 2 separately, then only odd numbers up to √n."
    },
    9: {
      week: 2,
      title: "Prime Numbers: Generate Range",
      problem: "Write a function that returns all prime numbers between 1 and n.",
      example: "getPrimes(10) → [2, 3, 5, 7]",
      starter: "function getPrimes(n) {\n  // Your code here\n}",
      solution: "function getPrimes(n) {\n  const primes = [];\n  \n  for (let i = 2; i <= n; i++) {\n    if (isPrime(i)) {\n      primes.push(i);\n    }\n  }\n  \n  return primes;\n}\n\nfunction isPrime(num) {\n  if (num < 2) return false;\n  if (num === 2) return true;\n  if (num % 2 === 0) return false;\n  \n  for (let i = 3; i <= Math.sqrt(num); i += 2) {\n    if (num % i === 0) return false;\n  }\n  \n  return true;\n}",
      focus: "Reuse your isPrime helper. Build complex functions from simple ones."
    },
    10: {
      week: 2,
      title: "Prime Numbers: Sieve of Eratosthenes",
      problem: "Implement the Sieve of Eratosthenes to find primes up to n efficiently.",
      example: "sieveOfEratosthenes(10) → [2, 3, 5, 7]",
      starter: "function sieveOfEratosthenes(n) {\n  // Your code here\n}",
      solution: "function sieveOfEratosthenes(n) {\n  if (n < 2) return [];\n  \n  // Create boolean array, initially all true\n  const isPrime = new Array(n + 1).fill(true);\n  isPrime[0] = isPrime[1] = false;\n  \n  for (let i = 2; i * i <= n; i++) {\n    if (isPrime[i]) {\n      // Mark multiples of i as not prime\n      for (let j = i * i; j <= n; j += i) {\n        isPrime[j] = false;\n      }\n    }\n  }\n  \n  // Collect all prime numbers\n  const primes = [];\n  for (let i = 2; i <= n; i++) {\n    if (isPrime[i]) primes.push(i);\n  }\n  \n  return primes;\n}",
      focus: "More efficient for large ranges. Mark multiples, don't test divisibility."
    },
    11: {
      week: 2,
      title: "Binary Search Implementation",
      problem: "Write a function that performs binary search on a sorted array and returns the index of the target element, or -1 if not found.",
      example: "binarySearch([1, 3, 5, 7, 9], 5) → 2",
      starter: "function binarySearch(arr, target) {\n  // Your code here\n}",
      solution: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}",
      focus: "O(log n) search by repeatedly halving the search space."
    },
    12: {
      week: 2,
      title: "Find Duplicates in Array",
      problem: "Write a function that finds all duplicate elements in an array and returns them as a new array.",
      example: "findDuplicates([1, 2, 3, 2, 4, 3, 5]) → [2, 3]",
      starter: "function findDuplicates(arr) {\n  // Your code here\n}",
      solution: "function findDuplicates(arr) {\n  const seen = new Set();\n  const duplicates = new Set();\n  \n  for (const item of arr) {\n    if (seen.has(item)) {\n      duplicates.add(item);\n    } else {\n      seen.add(item);\n    }\n  }\n  \n  return Array.from(duplicates);\n}",
      focus: "Use Set for O(1) lookups. Track seen vs duplicates separately."
    },
    13: {
      week: 2,
      title: "Fibonacci Sequence Generation",
      problem: "Write a function that generates the first n numbers in the Fibonacci sequence.",
      example: "fibonacci(7) → [0, 1, 1, 2, 3, 5, 8]",
      starter: "function fibonacci(n) {\n  // Your code here\n}",
      solution: "function fibonacci(n) {\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  if (n === 2) return [0, 1];\n  \n  const result = [0, 1];\n  \n  for (let i = 2; i < n; i++) {\n    result[i] = result[i - 1] + result[i - 2];\n  }\n  \n  return result;\n}",
      focus: "Build iteratively. Each number is sum of previous two."
    },
    14: {
      week: 2,
      title: "Sum of Number Range",
      problem: "Write a function that calculates the sum of all integers between two given numbers (inclusive).",
      example: "sumRange(3, 7) → 25 (3+4+5+6+7)",
      starter: "function sumRange(start, end) {\n  // Your code here\n}",
      solution: "function sumRange(start, end) {\n  if (start > end) {\n    [start, end] = [end, start];\n  }\n  \n  let sum = 0;\n  for (let i = start; i <= end; i++) {\n    sum += i;\n  }\n  \n  return sum;\n  \n  // Alternative: Mathematical formula\n  // const n = end - start + 1;\n  // return n * (start + end) / 2;\n}",
      focus: "Handle edge cases. Consider mathematical shortcuts for efficiency."
    },
    15: {
      week: 3,
      title: "Group Objects by Property",
      problem: "Write a function that groups an array of objects by a specified property.",
      example: "groupBy([{name: 'Alice', age: 25}, {name: 'Bob', age: 25}], 'age') → {25: [{name: 'Alice', age: 25}, {name: 'Bob', age: 25}]}",
      starter: "function groupBy(array, property) {\n  // Your code here\n}",
      solution: "function groupBy(array, property) {\n  return array.reduce((groups, item) => {\n    const key = item[property];\n    if (!groups[key]) {\n      groups[key] = [];\n    }\n    groups[key].push(item);\n    return groups;\n  }, {});\n}",
      focus: "Reduce pattern for grouping. Initialize empty arrays for new keys."
    },
    16: {
      week: 3,
      title: "Deep Merge Objects",
      problem: "Write a function that deeply merges two objects, combining nested properties.",
      example: "deepMerge({a: {b: 1}}, {a: {c: 2}}) → {a: {b: 1, c: 2}}",
      starter: "function deepMerge(obj1, obj2) {\n  // Your code here\n}",
      solution: "function deepMerge(obj1, obj2) {\n  const result = { ...obj1 };\n  \n  for (const key in obj2) {\n    if (obj2[key] && typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {\n      if (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {\n        result[key] = deepMerge(result[key], obj2[key]);\n      } else {\n        result[key] = { ...obj2[key] };\n      }\n    } else {\n      result[key] = obj2[key];\n    }\n  }\n  \n  return result;\n}",
      focus: "Recursion for nested objects. Handle arrays and primitives separately."
    },
    17: {
      week: 3,
      title: "Flatten Nested Arrays",
      problem: "Write a function that flattens a nested array structure into a single-level array.",
      example: "flatten([1, [2, 3], [4, [5, 6]]]) → [1, 2, 3, 4, 5, 6]",
      starter: "function flatten(arr) {\n  // Your code here\n}",
      solution: "function flatten(arr) {\n  const result = [];\n  \n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...flatten(item));\n    } else {\n      result.push(item);\n    }\n  }\n  \n  return result;\n  \n  // Alternative: arr.flat(Infinity)\n}",
      focus: "Recursive approach with spread operator. Check Array.isArray()."
    },
    18: {
      week: 3,
      title: "Remove Duplicates (Preserving Order)",
      problem: "Write a function that removes duplicate elements from an array while preserving the original order.",
      example: "removeDuplicates([1, 2, 2, 3, 1, 4]) → [1, 2, 3, 4]",
      starter: "function removeDuplicates(arr) {\n  // Your code here\n}",
      solution: "function removeDuplicates(arr) {\n  const seen = new Set();\n  const result = [];\n  \n  for (const item of arr) {\n    if (!seen.has(item)) {\n      seen.add(item);\n      result.push(item);\n    }\n  }\n  \n  return result;\n  \n  // Alternative: [...new Set(arr)]\n}",
      focus: "Set for O(1) lookups. Maintain insertion order with separate array."
    },
    19: {
      week: 3,
      title: "Chunk Array into Smaller Arrays",
      problem: "Write a function that splits an array into chunks of a specified size.",
      example: "chunk([1, 2, 3, 4, 5, 6], 2) → [[1, 2], [3, 4], [5, 6]]",
      starter: "function chunk(arr, size) {\n  // Your code here\n}",
      solution: "function chunk(arr, size) {\n  if (size <= 0) return [];\n  \n  const result = [];\n  \n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  \n  return result;\n}",
      focus: "Use slice() to extract chunks. Increment by chunk size."
    },
    20: {
      week: 3,
      title: "Matrix Transpose",
      problem: "Write a function that transposes a 2D matrix (swaps rows and columns).",
      example: "transpose([[1, 2], [3, 4], [5, 6]]) → [[1, 3, 5], [2, 4, 6]]",
      starter: "function transpose(matrix) {\n  // Your code here\n}",
      solution: "function transpose(matrix) {\n  if (matrix.length === 0) return [];\n  \n  const rows = matrix.length;\n  const cols = matrix[0].length;\n  const result = [];\n  \n  for (let col = 0; col < cols; col++) {\n    const newRow = [];\n    for (let row = 0; row < rows; row++) {\n      newRow.push(matrix[row][col]);\n    }\n    result.push(newRow);\n  }\n  \n  return result;\n}",
      focus: "Swap row/column indices. Handle empty matrix edge case."
    },
    21: {
      week: 3,
      title: "Curry Function Implementation",
      problem: "Write a function that converts a regular function into a curried version that can be called with partial arguments.",
      example: "const add = curry((a, b, c) => a + b + c); add(1)(2)(3) → 6",
      starter: "function curry(fn) {\n  // Your code here\n}",
      solution: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, args.concat(nextArgs));\n      };\n    }\n  };\n}",
      focus: "Recursion with closures. Check argument count vs function arity."
    },
    22: {
      week: 4,
      title: "Timed Review: Array Methods",
      problem: "Combine filter, map, and reduce to process user data. Filter active users, extract their scores, and calculate the average.",
      example: "processUsers([{name: 'Alice', active: true, score: 85}, {name: 'Bob', active: false, score: 90}]) → 85",
      starter: "function processUsers(users) {\n  // Your code here\n}",
      solution: "function processUsers(users) {\n  const activeScores = users\n    .filter(user => user.active)\n    .map(user => user.score);\n  \n  if (activeScores.length === 0) return 0;\n  \n  const sum = activeScores.reduce((total, score) => total + score, 0);\n  return sum / activeScores.length;\n}",
      focus: "Chain array methods efficiently. Handle empty array edge case."
    },
    23: {
      week: 4,
      title: "Timed Review: String & Object Manipulation",
      problem: "Parse a CSV-like string into an array of objects with proper data types.",
      example: "parseCSV('name,age,active\\nAlice,25,true\\nBob,30,false') → [{name: 'Alice', age: 25, active: true}, {name: 'Bob', age: 30, active: false}]",
      starter: "function parseCSV(csvString) {\n  // Your code here\n}",
      solution: "function parseCSV(csvString) {\n  const lines = csvString.split('\\n');\n  const headers = lines[0].split(',');\n  \n  return lines.slice(1).map(line => {\n    const values = line.split(',');\n    const obj = {};\n    \n    headers.forEach((header, index) => {\n      let value = values[index];\n      \n      // Convert data types\n      if (value === 'true') value = true;\n      else if (value === 'false') value = false;\n      else if (!isNaN(value) && !isNaN(parseFloat(value))) value = parseFloat(value);\n      \n      obj[header] = value;\n    });\n    \n    return obj;\n  });\n}",
      focus: "Split, map, and type conversion. Handle different data types."
    },
    24: {
      week: 4,
      title: "Timed Review: Algorithm Combination",
      problem: "Find the most frequent prime number in an array. Combine prime checking with frequency counting.",
      example: "mostFrequentPrime([2, 3, 4, 2, 5, 2, 7]) → 2",
      starter: "function mostFrequentPrime(numbers) {\n  // Your code here\n}",
      solution: "function mostFrequentPrime(numbers) {\n  // Helper function to check if number is prime\n  function isPrime(num) {\n    if (num < 2) return false;\n    if (num === 2) return true;\n    if (num % 2 === 0) return false;\n    \n    for (let i = 3; i <= Math.sqrt(num); i += 2) {\n      if (num % i === 0) return false;\n    }\n    return true;\n  }\n  \n  // Count frequency of prime numbers\n  const primeFreq = {};\n  \n  for (const num of numbers) {\n    if (isPrime(num)) {\n      primeFreq[num] = (primeFreq[num] || 0) + 1;\n    }\n  }\n  \n  // Find most frequent\n  let maxCount = 0;\n  let mostFrequent = null;\n  \n  for (const [prime, count] of Object.entries(primeFreq)) {\n    if (count > maxCount) {\n      maxCount = count;\n      mostFrequent = parseInt(prime);\n    }\n  }\n  \n  return mostFrequent;\n}",
      focus: "Combine multiple algorithms. Reuse helper functions from previous days."
    },
    25: {
      week: 4,
      title: "Currency Converter: Basic",
      problem: "Create a currency converter function that converts amounts between currencies using exchange rates.",
      example: "convert(100, 'USD', 'EUR', {USD: 1, EUR: 0.85}) → 85",
      starter: "function convert(amount, fromCurrency, toCurrency, rates) {\n  // Your code here\n}",
      solution: "function convert(amount, fromCurrency, toCurrency, rates) {\n  if (!rates[fromCurrency] || !rates[toCurrency]) {\n    throw new Error('Currency not supported');\n  }\n  \n  if (fromCurrency === toCurrency) {\n    return amount;\n  }\n  \n  // Convert to base currency (USD), then to target\n  const baseAmount = amount / rates[fromCurrency];\n  return baseAmount * rates[toCurrency];\n}",
      focus: "Handle edge cases and validation. Convert through base currency."
    },
    26: {
      week: 4,
      title: "Currency Converter: With History",
      problem: "Extend the currency converter to track conversion history and calculate total fees.",
      example: "converter.convert(100, 'USD', 'EUR'); converter.getHistory() → [{amount: 100, from: 'USD', to: 'EUR', result: 85, fee: 1}]",
      starter: "function createConverter(rates, feePercent = 1) {\n  // Your code here\n}",
      solution: "function createConverter(rates, feePercent = 1) {\n  const history = [];\n  \n  return {\n    convert(amount, fromCurrency, toCurrency) {\n      if (!rates[fromCurrency] || !rates[toCurrency]) {\n        throw new Error('Currency not supported');\n      }\n      \n      if (fromCurrency === toCurrency) {\n        return amount;\n      }\n      \n      const baseAmount = amount / rates[fromCurrency];\n      const convertedAmount = baseAmount * rates[toCurrency];\n      const fee = convertedAmount * (feePercent / 100);\n      const result = convertedAmount - fee;\n      \n      history.push({\n        amount,\n        from: fromCurrency,\n        to: toCurrency,\n        result,\n        fee\n      });\n      \n      return result;\n    },\n    \n    getHistory() {\n      return [...history];\n    },\n    \n    getTotalFees() {\n      return history.reduce((total, transaction) => total + transaction.fee, 0);\n    }\n  };\n}",
      focus: "Object with methods. Closure to maintain private state."
    },
    27: {
      week: 4,
      title: "Currency Converter: Batch Processing",
      problem: "Process multiple currency conversions in batch and return summary statistics.",
      example: "batchConvert([{amount: 100, from: 'USD', to: 'EUR'}, {amount: 50, from: 'EUR', to: 'GBP'}], rates) → {conversions: [...], totalOriginal: 150, totalConverted: 128.5}",
      starter: "function batchConvert(transactions, rates) {\n  // Your code here\n}",
      solution: "function batchConvert(transactions, rates) {\n  const conversions = [];\n  let totalOriginal = 0;\n  let totalConverted = 0;\n  \n  for (const transaction of transactions) {\n    const { amount, from, to } = transaction;\n    \n    if (!rates[from] || !rates[to]) {\n      conversions.push({ ...transaction, error: 'Currency not supported' });\n      continue;\n    }\n    \n    let result;\n    if (from === to) {\n      result = amount;\n    } else {\n      const baseAmount = amount / rates[from];\n      result = baseAmount * rates[to];\n    }\n    \n    conversions.push({ ...transaction, result });\n    totalOriginal += amount;\n    totalConverted += result;\n  }\n  \n  return {\n    conversions,\n    totalOriginal,\n    totalConverted,\n    averageRate: totalOriginal > 0 ? totalConverted / totalOriginal : 0\n  };\n}",
      focus: "Batch processing with error handling. Accumulate statistics."
    },
    28: {
      week: 4,
      title: "Variable Arguments: Advanced",
      problem: "Create a function that accepts any number of arguments and can perform different operations based on argument types.",
      example: "flexiCalc('sum', 1, 2, 3) → 6; flexiCalc('concat', 'a', 'b', 'c') → 'abc'",
      starter: "function flexiCalc(operation, ...args) {\n  // Your code here\n}",
      solution: "function flexiCalc(operation, ...args) {\n  switch (operation) {\n    case 'sum':\n      return args.reduce((sum, num) => {\n        if (typeof num !== 'number') throw new Error('Sum requires numbers');\n        return sum + num;\n      }, 0);\n      \n    case 'product':\n      return args.reduce((product, num) => {\n        if (typeof num !== 'number') throw new Error('Product requires numbers');\n        return product * num;\n      }, 1);\n      \n    case 'concat':\n      return args.reduce((result, str) => {\n        return result + String(str);\n      }, '');\n      \n    case 'max':\n      if (args.length === 0) return undefined;\n      return Math.max(...args.filter(arg => typeof arg === 'number'));\n      \n    case 'min':\n      if (args.length === 0) return undefined;\n      return Math.min(...args.filter(arg => typeof arg === 'number'));\n      \n    default:\n      throw new Error(`Unknown operation: ${operation}`);\n  }\n}",
      focus: "Switch statement with rest parameters. Type checking and validation."
    },
    29: {
      week: 4,
      title: "Edge Case Handling: Data Validation",
      problem: "Create a robust function that validates and processes user input data with comprehensive error handling.",
      example: "validateUser({name: 'Alice', email: 'alice@test.com', age: 25}) → {valid: true, user: {...}, errors: []}",
      starter: "function validateUser(userData) {\n  // Your code here\n}",
      solution: "function validateUser(userData) {\n  const errors = [];\n  const user = {};\n  \n  // Validate name\n  if (!userData || typeof userData !== 'object') {\n    return { valid: false, user: null, errors: ['Input must be an object'] };\n  }\n  \n  if (!userData.name || typeof userData.name !== 'string') {\n    errors.push('Name is required and must be a string');\n  } else if (userData.name.trim().length < 2) {\n    errors.push('Name must be at least 2 characters');\n  } else {\n    user.name = userData.name.trim();\n  }\n  \n  // Validate email\n  if (!userData.email || typeof userData.email !== 'string') {\n    errors.push('Email is required and must be a string');\n  } else {\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!emailRegex.test(userData.email)) {\n      errors.push('Email must be valid format');\n    } else {\n      user.email = userData.email.toLowerCase();\n    }\n  }\n  \n  // Validate age\n  if (userData.age !== undefined) {\n    if (typeof userData.age !== 'number' || userData.age < 0 || userData.age > 150) {\n      errors.push('Age must be a number between 0 and 150');\n    } else {\n      user.age = userData.age;\n    }\n  }\n  \n  return {\n    valid: errors.length === 0,\n    user: errors.length === 0 ? user : null,\n    errors\n  };\n}",
      focus: "Comprehensive validation. Handle null/undefined, type checking, format validation."
    },
    30: {
      week: 4,
      title: "Final Challenge: Data Pipeline",
      problem: "Build a complete data processing pipeline that fetches, validates, transforms, and aggregates user data.",
      example: "pipeline.process(rawData) → {processed: [...], summary: {total: 10, valid: 8, errors: 2}}",
      starter: "function createDataPipeline() {\n  // Your code here\n}",
      solution: "function createDataPipeline() {\n  const processors = [];\n  \n  return {\n    addProcessor(processorFn) {\n      processors.push(processorFn);\n      return this; // Enable chaining\n    },\n    \n    process(data) {\n      if (!Array.isArray(data)) {\n        throw new Error('Data must be an array');\n      }\n      \n      let processed = [...data];\n      const errors = [];\n      \n      // Apply each processor in sequence\n      for (const processor of processors) {\n        try {\n          processed = processor(processed);\n        } catch (error) {\n          errors.push(error.message);\n        }\n      }\n      \n      // Generate summary\n      const summary = {\n        total: data.length,\n        processed: processed.length,\n        errors: errors.length,\n        errorMessages: errors\n      };\n      \n      return { processed, summary };\n    },\n    \n    // Built-in processors\n    validate(validatorFn) {\n      return this.addProcessor(items => items.filter(validatorFn));\n    },\n    \n    transform(transformFn) {\n      return this.addProcessor(items => items.map(transformFn));\n    },\n    \n    aggregate(aggregatorFn) {\n      return this.addProcessor(items => [aggregatorFn(items)]);\n    }\n  };\n}",
      focus: "Method chaining, pipeline pattern, error handling, flexible architecture."
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setTimer(0);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const markComplete = () => {
    setCompletedDays(prev => new Set([...prev, currentDay]));
    setShowSolution(false);
    setUserCode('');
    stopTimer();
    if (currentDay < 30) {
      setCurrentDay(currentDay + 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentProblem = curriculum[currentDay] || {
    week: 1,
    title: "Problem Not Found",
    problem: "This problem is not yet implemented.",
    example: "",
    starter: "// Coming soon...",
    solution: "// Coming soon...",
    focus: "Stay tuned!"
  };

  const weekColors = {
    1: 'bg-blue-50 border-blue-200',
    2: 'bg-green-50 border-green-200', 
    3: 'bg-purple-50 border-purple-200',
    4: 'bg-orange-50 border-orange-200'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">30 Days of Coding Practice</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Goal: Advent of Code Ready!</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress: {completedDays.size}/30 days</span>
            <span>{Math.round((completedDays.size / 30) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedDays.size / 30) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(week => (
            <div key={week} className={`p-3 rounded-lg border-2 ${weekColors[week]}`}>
              <h3 className="font-semibold text-sm mb-1">
                Week {week}
              </h3>
              <p className="text-xs text-gray-600">
                {week === 1 && "Core JS Syntax"}
                {week === 2 && "Essential Algorithms"}
                {week === 3 && "Data Transformation"}
                {week === 4 && "Integration & Speed"}
              </p>
              <div className="text-xs mt-1">
                {Array.from({length: 7}, (_, i) => {
                  const dayNum = (week - 1) * 7 + i + 1;
                  if (dayNum > 30) return null;
                  return (
                    <span 
                      key={dayNum}
                      className={`inline-block w-6 h-6 rounded text-center leading-6 mr-1 cursor-pointer
                        ${completedDays.has(dayNum) ? 'bg-green-500 text-white' : 
                          dayNum === currentDay ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setCurrentDay(dayNum)}
                    >
                      {dayNum}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Problem */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Day {currentDay}: {currentProblem.title}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${currentProblem.week === 1 ? 'bg-blue-100 text-blue-800' :
                  currentProblem.week === 2 ? 'bg-green-100 text-green-800' :
                  currentProblem.week === 3 ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'}`}>
                Week {currentProblem.week}
              </span>
              {completedDays.has(currentDay) && (
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-lg font-mono">{formatTime(timer)}</span>
            </div>
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Play className="w-4 h-4" />
                Start
              </button>
            ) : (
              <button
                onClick={stopTimer}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Focus Point */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex items-start gap-2">
            <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">Focus Point</h3>
              <p className="text-blue-700 text-sm">{currentProblem.focus}</p>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Problem
          </h3>
          <p className="text-gray-700 mb-3">{currentProblem.problem}</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="font-medium text-gray-600">Example: </span>
            <code className="text-sm font-mono text-gray-800">{currentProblem.example}</code>
          </div>
        </div>

        {/* Code Editor */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Your Solution
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setUserCode(currentProblem.starter)}
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-300 hover:bg-blue-50"
              >
                Reset to Starter
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
            </div>
          </div>
          
          <textarea
            value={userCode || currentProblem.starter}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write your solution here..."
          />
        </div>

        {/* Solution */}
        {showSolution && (
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Solution</h3>
            <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap overflow-x-auto">
              {currentProblem.solution}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
              disabled={currentDay === 1}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
              disabled={currentDay === 30}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          
          <div className="flex gap-3">
            {!completedDays.has(currentDay) && (
              <button
                onClick={markComplete}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Mark Complete
              </button>
            )}
            {completedDays.has(currentDay) && (
              <button
                onClick={() => {
                  const newCompleted = new Set(completedDays);
                  newCompleted.delete(currentDay);
                  setCompletedDays(newCompleted);
                }}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Mark Incomplete
              </button>
            )}
          </div>
        </div>

        {/* Completion Message */}
        {completedDays.size === 30 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">🎉 Congratulations!</h3>
            <p className="text-green-700">
              You've completed all 30 days! You're ready to tackle Advent of Code and those foundational problems. 
              Your JavaScript fundamentals are solid, and you've built the muscle memory for common patterns.
            </p>
            <p className="text-green-700 mt-2 text-sm">
              Pro tip: Keep this app handy for quick refreshers, and remember - you've got the skills, trust your instincts!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-600 text-sm">
        <p>Built for frontend developers who want to nail coding interviews without the leetcode grind.</p>
        <p className="mt-1">30 minutes a day × 30 days = Interview confidence</p>
      </div>
    </div>
  );
};

export default App;