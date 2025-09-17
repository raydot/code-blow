import React from 'react'
import CodeEditor from './problem/CodeEditor.jsx'
import TestControls from './testing/TestControls.jsx'
import TestResults from './testing/TestResults.jsx'
import SolutionDisplay from './problem/SolutionDisplay.jsx'

const CodePanel = ({ 
  userCode, 
  setUserCode, 
  isRunning, 
  startTimer, 
  stopTimer, 
  resetTimer,
  executeTests,
  isRunningTests,
  currentProblem,
  showSolution,
  setShowSolution,
  testResults
}) => {
  return (
    <div className="space-y-4">
      <CodeEditor 
        userCode={userCode}
        setUserCode={setUserCode}
        isRunning={isRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
      
      <TestControls 
        executeTests={executeTests}
        isRunningTests={isRunningTests}
        currentProblem={currentProblem}
        showSolution={showSolution}
        setShowSolution={setShowSolution}
      />

      <TestResults testResults={testResults} />

      <SolutionDisplay 
        showSolution={showSolution}
        currentProblem={currentProblem}
      />
    </div>
  )
}

export default CodePanel
