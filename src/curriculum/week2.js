/**
 * Week 2: Data Structures
 * Algorithms, search, and data manipulation
 */

export const week2Problems = {
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
  }
};

export const week2Metadata = {
  week: 2,
  title: "Data Structures",
  description: "Algorithms, search, and data manipulation",
  totalDays: 4,
  focus: "Learn fundamental algorithms and data structure operations"
};
