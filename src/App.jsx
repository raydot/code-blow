import React, { useState, useEffect } from 'react'
import {
  Play,
  CheckCircle,
  Clock,
  Target,
  Code,
  BookOpen,
  Zap
} from 'lucide-react'
import { curriculum } from './curriculum.js'

const App = () => {
  const [currentDay, setCurrentDay] = useState(1)
  const [completedDays, setCompletedDays] = useState(new Set())
  const [showSolution, setShowSolution] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState(null)
  const [isRunningTests, setIsRunningTests] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('coding-practice-progress')
    if (savedProgress) {
      try {
        const { completedDays: saved, currentDay: savedDay } =
          JSON.parse(savedProgress)
        setCompletedDays(new Set(saved))
        setCurrentDay(savedDay || 1)
      } catch (error) {
        console.error('Error loading progress:', error)
      }
    }
  }, [])

  // Save progress to localStorage whenever completedDays or currentDay changes
  useEffect(() => {
    const progress = {
      completedDays: Array.from(completedDays),
      currentDay
    }
    localStorage.setItem('coding-practice-progress', JSON.stringify(progress))
  }, [completedDays, currentDay])

  // Timer effect
  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Initialize user code when day changes
  useEffect(() => {
    const problem = curriculum[currentDay]
    if (problem) {
      setUserCode(problem.starter)
      setShowSolution(false)
    }
  }, [currentDay])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setTimer(0)
    setIsRunning(false)
  }

  const markComplete = () => {
    const newCompleted = new Set(completedDays)
    newCompleted.add(currentDay)
    setCompletedDays(newCompleted)
  }

  // Test execution functions
  const runTests = async () => {
    if (!currentProblem?.testCases) {
      setTestResults({ error: 'No test cases available for this problem' })
      return
    }

    setIsRunningTests(true)
    setTestResults(null)

    try {
      const results = await executeUserCode(userCode, currentProblem.testCases)
      setTestResults(results)
    } catch (error) {
      setTestResults({ error: error.message })
    } finally {
      setIsRunningTests(false)
    }
  }

  const executeUserCode = async (code, testCases) => {
    return new Promise((resolve) => {
      try {
        // Create a safe execution environment
        const results = []
        
        for (const testCase of testCases) {
          try {
            // Execute user code in isolated scope
            const result = executeTestCase(code, testCase)
            results.push({
              name: testCase.name,
              passed: result.passed,
              expected: testCase.expected,
              actual: result.actual,
              error: result.error
            })
          } catch (error) {
            results.push({
              name: testCase.name,
              passed: false,
              expected: testCase.expected,
              actual: null,
              error: error.message
            })
          }
        }

        const passedCount = results.filter(r => r.passed).length
        resolve({
          results,
          passedCount,
          totalCount: testCases.length,
          allPassed: passedCount === testCases.length
        })
      } catch (error) {
        resolve({ error: error.message })
      }
    })
  }

  const executeTestCase = (code, testCase) => {
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

    const userFunction = func()
    
    let actual
    if (testCase.functionName && typeof userFunction === 'object') {
      // Multiple functions case
      const targetFunction = userFunction[testCase.functionName]
      if (!targetFunction) {
        throw new Error(`Function ${testCase.functionName} not found`)
      }
      actual = targetFunction(...testCase.input)
    } else {
      // Single function case
      if (typeof userFunction !== 'function') {
        throw new Error('No valid function found in user code')
      }
      actual = userFunction(...testCase.input)
    }

    const passed = deepEqual(actual, testCase.expected)
    return { passed, actual }
  }

  const deepEqual = (a, b) => {
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

  const currentProblem = curriculum[currentDay]
  const weekColors = {
    1: 'bg-blue-500',
    2: 'bg-green-500',
    3: 'bg-purple-500',
    4: 'bg-orange-500'
  }

  const getWeekName = (week) => {
    const names = {
      1: 'Fundamentals',
      2: 'Intermediate',
      3: 'Algorithms',
      4: 'Integration'
    }
    return names[week] || 'Week'
  }

  if (!currentProblem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Problem not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            30 Days of Coding Practice
          </h1>
          <p className="text-gray-600 mb-4">
            Build your JavaScript fundamentals, one problem at a time
          </p>

          {/* Progress Overview */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">
                Day {currentDay} of 30
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">
                {completedDays.size} completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">{formatTime(timer)}</span>
            </div>
          </div>

          {/* Week Progress */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((week) => {
              const weekDays = Object.values(curriculum).filter(
                (p) => p.week === week
              )
              const weekCompleted = weekDays.filter((p) =>
                completedDays.has(
                  parseInt(
                    Object.keys(curriculum).find((key) => curriculum[key] === p)
                  )
                )
              ).length

              return (
                <div key={week} className="text-center">
                  <div
                    className={`w-16 h-2 rounded-full ${weekColors[week]} mb-1 relative overflow-hidden`}
                  >
                    <div
                      className="h-full bg-white bg-opacity-30 transition-all duration-300"
                      style={{
                        width: `${
                          100 - (weekCompleted / weekDays.length) * 100
                        }%`
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    {getWeekName(week)}
                  </div>
                  <div className="text-xs font-medium">
                    {weekCompleted}/{weekDays.length}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    weekColors[currentProblem.week]
                  }`}
                />
                <span className="text-sm font-medium text-gray-500">
                  Week {currentProblem.week} • Day {currentDay}
                </span>
              </div>
              {completedDays.has(currentDay) && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentProblem.title}
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Problem
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentProblem.problem}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Example
                </h3>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
                  <code>{currentProblem.example}</code>
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Focus
                </h3>
                <p className="text-gray-600 text-sm italic">
                  {currentProblem.focus}
                </p>
              </div>
            </div>
          </div>

          {/* Code Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Your Solution</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={isRunning ? stopTimer : startTimer}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    isRunning
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {isRunning ? 'Stop' : 'Start'} Timer
                </button>
                <button
                  onClick={resetTimer}
                  className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code Editor
                </label>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your solution here..."
                  spellCheck={false}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={runTests}
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
                <div className="text-sm text-gray-500">
                  Lines: {userCode.split('\n').length}
                </div>
              </div>

              {/* Test Results */}
              {testResults && (
                <div className="mt-4">
                  {testResults.error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 mb-2">Error</h4>
                      <p className="text-red-700 text-sm">{testResults.error}</p>
                    </div>
                  ) : (
                    <div className={`border rounded-lg p-4 ${testResults.allPassed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium ${testResults.allPassed ? 'text-green-800' : 'text-yellow-800'}`}>
                          Test Results
                        </h4>
                        <span className={`text-sm font-medium ${testResults.allPassed ? 'text-green-700' : 'text-yellow-700'}`}>
                          {testResults.passedCount}/{testResults.totalCount} passed
                        </span>
                      </div>
                      
                      {testResults.allPassed ? (
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">All tests passed! Great job!</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {testResults.results.map((result, index) => (
                            <div key={index} className={`flex items-start gap-2 text-sm ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
                              {result.passed ? (
                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full bg-red-500"></div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium">{result.name}</div>
                                {!result.passed && (
                                  <div className="mt-1 text-xs">
                                    {result.error ? (
                                      <span className="text-red-600">Error: {result.error}</span>
                                    ) : (
                                      <div>
                                        <div>Expected: {JSON.stringify(result.expected)}</div>
                                        <div>Got: {JSON.stringify(result.actual)}</div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {showSolution && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Solution:</h4>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
                    <code>{currentProblem.solution}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
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
                  const newCompleted = new Set(completedDays)
                  newCompleted.delete(currentDay)
                  setCompletedDays(newCompleted)
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
            <h3 className="font-bold text-green-800 mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-green-700">
              You've completed all 30 days! You're ready to tackle technical
              interviews and coding challenges. Your JavaScript fundamentals are
              solid, and you've built the muscle memory for common patterns.
            </p>
            <p className="text-green-700 mt-2 text-sm">
              Pro tip: Keep this app handy for quick refreshers, and remember -
              you've got the skills, trust your instincts!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-600 text-sm">
        <p>
          Built for frontend developers who want to nail coding interviews
          without the leetcode grind.
        </p>
        <p className="mt-1">
          30 minutes a day × 30 days = Interview confidence
        </p>
      </div>
    </div>
  )
}

export default App
