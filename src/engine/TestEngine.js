/**
 * TestEngine - Core test execution orchestrator
 */

import { validateCode } from './CodeValidator.js'
import { executeTestCasesWithTimeout } from './TestRunner.js'
import { aggregateResults, formatError } from './ResultsProcessor.js'

/**
 * Main test engine class that orchestrates test execution
 */
export class TestEngine {
  constructor(options = {}) {
    this.timeout = options.timeout || 5000
    this.validateSyntax = options.validateSyntax !== false
  }

  /**
   * Executes all tests for given code and test cases
   * @param {string} code - User's code to test
   * @param {Array} testCases - Array of test cases
   * @returns {Promise<Object>} - Test execution results
   */
  async executeTests(code, testCases) {
    try {
      // Validate inputs
      if (!code || typeof code !== 'string') {
        return { error: 'No code provided' }
      }

      if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
        return { error: 'No test cases available for this problem' }
      }

      // Optional syntax validation
      if (this.validateSyntax) {
        const validation = validateCode(code, testCases[0]?.functionName)
        if (!validation.isValid) {
          return { error: validation.error }
        }
      }

      // Execute test cases
      const results = await executeTestCasesWithTimeout(code, testCases, this.timeout)
      
      // Aggregate and return results
      return aggregateResults(results)
    } catch (error) {
      return { error: formatError(error) }
    }
  }

  /**
   * Sets timeout for test execution
   * @param {number} timeout - Timeout in milliseconds
   */
  setTimeout(timeout) {
    this.timeout = timeout
  }

  /**
   * Enables or disables syntax validation
   * @param {boolean} enabled - Whether to validate syntax
   */
  setSyntaxValidation(enabled) {
    this.validateSyntax = enabled
  }
}

/**
 * Creates a new test engine instance
 * @param {Object} options - Configuration options
 * @returns {TestEngine} - New test engine instance
 */
export const createTestEngine = (options = {}) => {
  return new TestEngine(options)
}

/**
 * Convenience function for quick test execution
 * @param {string} code - User's code
 * @param {Array} testCases - Test cases
 * @param {Object} options - Engine options
 * @returns {Promise<Object>} - Test results
 */
export const runTests = async (code, testCases, options = {}) => {
  const engine = createTestEngine(options)
  return await engine.executeTests(code, testCases)
}
