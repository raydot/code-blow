/**
 * Week 3: Data Transformation
 * Advanced data manipulation and functional programming
 */

export const week3Problems = {
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
  }
};

export const week3Metadata = {
  week: 3,
  title: "Data Transformation",
  description: "Advanced data manipulation and functional programming",
  totalDays: 7,
  focus: "Master complex data transformations and functional programming patterns"
};
