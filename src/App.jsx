import React, { useState, useEffect } from 'react'
import { curriculum } from './curriculum.js'
import { runTests } from './engine/TestEngine.js'
import Header from './components/layout/Header.jsx'
import Navigation from './components/layout/Navigation.jsx'
import Footer from './components/layout/Footer.jsx'
import ProblemDescription from './components/problem/ProblemDescription.jsx'
import CodePanel from './components/CodePanel.jsx'

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

  // Test execution using the new engine
  const executeTests = async () => {
    setIsRunningTests(true)
    setTestResults(null)

    try {
      const results = await runTests(userCode, currentProblem?.testCases)
      setTestResults(results)
    } catch (error) {
      setTestResults({ error: error.message })
    } finally {
      setIsRunningTests(false)
    }
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
        <Header 
          currentDay={currentDay}
          completedDays={completedDays}
          timer={timer}
          formatTime={formatTime}
          curriculum={curriculum}
          weekColors={weekColors}
          getWeekName={getWeekName}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProblemDescription 
            currentProblem={currentProblem}
            currentDay={currentDay}
            completedDays={completedDays}
            weekColors={weekColors}
          />

          <CodePanel 
            userCode={userCode}
            setUserCode={setUserCode}
            isRunning={isRunning}
            startTimer={startTimer}
            stopTimer={stopTimer}
            resetTimer={resetTimer}
            executeTests={executeTests}
            isRunningTests={isRunningTests}
            currentProblem={currentProblem}
            showSolution={showSolution}
            setShowSolution={setShowSolution}
            testResults={testResults}
          />
        </div>

        <Navigation 
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          completedDays={completedDays}
          setCompletedDays={setCompletedDays}
          markComplete={markComplete}
        />

        <Footer completedDays={completedDays} />
      </div>
    </div>
  )
}

export default App
