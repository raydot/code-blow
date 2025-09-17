/**
 * CodeValidator - Handles code parsing and validation
 */

/**
 * Creates an isolated execution context for user code
 * @param {string} code - User's code to execute
 * @param {Object} testCase - Test case with function name and inputs
 * @returns {Function} - Compiled function ready for execution
 */
export const createExecutionContext = (code, testCase) => {
  // Create isolated execution context
  const func = new Function(`
    ${code}
    
    // Return the function or functions for testing
    if (typeof ${testCase.functionName || 'processUsers'} !== 'undefined') {
      return ${testCase.functionName || 'processUsers'};
    }
    
    // For problems with multiple functions, return an object
    const functions = {};
    if (typeof formatName !== 'undefined') functions.formatName = formatName;
    if (typeof getInitials !== 'undefined') functions.getInitials = getInitials;
    if (typeof truncateMiddle !== 'undefined') functions.truncateMiddle = truncateMiddle;
    if (typeof analyzeProducts !== 'undefined') functions.analyzeProducts = analyzeProducts;
    if (typeof processUsers !== 'undefined') functions.processUsers = processUsers;
    
    return functions;
  `)

  return func
}

/**
 * Validates that user code contains required functions
 * @param {string} code - User's code
 * @param {string} functionName - Expected function name
 * @returns {Object} - Validation result
 */
export const validateCode = (code, functionName) => {
  try {
    // Basic syntax validation
    new Function(code)
    
    // Check if function is defined
    if (functionName && !code.includes(functionName)) {
      return {
        isValid: false,
        error: `Function ${functionName} not found in code`
      }
    }

    return { isValid: true }
  } catch (error) {
    return {
      isValid: false,
      error: `Syntax error: ${error.message}`
    }
  }
}

/**
 * Extracts function from execution result
 * @param {*} userFunction - Result from code execution
 * @param {Object} testCase - Test case with function name
 * @returns {Function} - Target function to test
 */
export const extractTargetFunction = (userFunction, testCase) => {
  if (testCase.functionName && typeof userFunction === 'object') {
    // Multiple functions case
    const targetFunction = userFunction[testCase.functionName]
    if (!targetFunction) {
      throw new Error(`Function ${testCase.functionName} not found`)
    }
    return targetFunction
  } else {
    // Single function case
    if (typeof userFunction !== 'function') {
      throw new Error('No valid function found in user code')
    }
    return userFunction
  }
}
