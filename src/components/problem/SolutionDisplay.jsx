import React from 'react'

const SolutionDisplay = ({ showSolution, currentProblem }) => {
  if (!showSolution) return null

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-2">Solution:</h4>
      <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
        <code>{currentProblem.solution}</code>
      </pre>
    </div>
  )
}

export default SolutionDisplay
