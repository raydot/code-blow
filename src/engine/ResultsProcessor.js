/**
 * ResultsProcessor - Handles test result analysis and comparison
 */

/**
 * Deep equality comparison for complex data structures
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} - Whether values are deeply equal
 */
export const deepEqual = (a, b) => {
  if (a === b) return true
  if (a == null || b == null) return false
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }
  
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false
    }
    return true
  }
  
  return false
}

/**
 * Processes individual test result
 * @param {*} actual - Actual result from function execution
 * @param {*} expected - Expected result from test case
 * @param {string} testName - Name of the test case
 * @param {string} error - Error message if execution failed
 * @returns {Object} - Processed test result
 */
export const processTestResult = (actual, expected, testName, error = null) => {
  const passed = error ? false : deepEqual(actual, expected)
  
  return {
    name: testName,
    passed,
    expected,
    actual,
    error
  }
}

/**
 * Aggregates multiple test results into summary
 * @param {Array} results - Array of individual test results
 * @returns {Object} - Aggregated test results
 */
export const aggregateResults = (results) => {
  const passedCount = results.filter(r => r.passed).length
  const totalCount = results.length
  
  return {
    results,
    passedCount,
    totalCount,
    allPassed: passedCount === totalCount
  }
}

/**
 * Formats error for display
 * @param {Error} error - Error object
 * @returns {string} - Formatted error message
 */
export const formatError = (error) => {
  if (typeof error === 'string') return error
  return error?.message || 'Unknown error occurred'
}
