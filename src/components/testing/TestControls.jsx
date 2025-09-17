import React from 'react'

const TestControls = ({ 
  executeTests, 
  isRunningTests, 
  currentProblem, 
  showSolution, 
  setShowSolution 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={executeTests}
          disabled={isRunningTests || !currentProblem?.testCases}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isRunningTests ? 'Running Tests...' : 'Check Solution'}
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          {showSolution ? 'Hide' : 'Show'} Solution
        </button>
      </div>
    </div>
  )
}

export default TestControls
