/**
 * TestRunner - Handles individual test case execution
 */

import { createExecutionContext, extractTargetFunction } from './CodeValidator.js'
import { processTestResult } from './ResultsProcessor.js'

/**
 * Executes a single test case
 * @param {string} code - User's code
 * @param {Object} testCase - Test case with input, expected, name, functionName
 * @returns {Object} - Test result
 */
export const executeTestCase = (code, testCase) => {
  try {
    // Create execution context
    const func = createExecutionContext(code, testCase)
    const userFunction = func()
    
    // Extract target function
    const targetFunction = extractTargetFunction(userFunction, testCase)
    
    // Execute with test inputs
    const actual = targetFunction(...testCase.input)
    
    return processTestResult(actual, testCase.expected, testCase.name)
  } catch (error) {
    return processTestResult(null, testCase.expected, testCase.name, error.message)
  }
}

/**
 * Executes multiple test cases sequentially
 * @param {string} code - User's code
 * @param {Array} testCases - Array of test cases
 * @returns {Array} - Array of test results
 */
export const executeTestCases = (code, testCases) => {
  const results = []
  
  for (const testCase of testCases) {
    try {
      const result = executeTestCase(code, testCase)
      results.push(result)
    } catch (error) {
      results.push(processTestResult(
        null, 
        testCase.expected, 
        testCase.name, 
        error.message
      ))
    }
  }
  
  return results
}

/**
 * Executes test cases with timeout protection
 * @param {string} code - User's code
 * @param {Array} testCases - Array of test cases
 * @param {number} timeout - Timeout in milliseconds (default: 5000)
 * @returns {Promise<Array>} - Promise resolving to test results
 */
export const executeTestCasesWithTimeout = async (code, testCases, timeout = 5000) => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve([processTestResult(
        null, 
        null, 
        'Timeout', 
        `Test execution timed out after ${timeout}ms`
      )])
    }, timeout)
    
    try {
      const results = executeTestCases(code, testCases)
      clearTimeout(timeoutId)
      resolve(results)
    } catch (error) {
      clearTimeout(timeoutId)
      resolve([processTestResult(null, null, 'Execution Error', error.message)])
    }
  })
}
