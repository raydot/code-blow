import React, { useState, useEffect, useRef } from 'react'
import { curriculum } from './curriculum.js'
import {
  initializePluginSystem,
  PluginSystemContext
} from './plugins/PluginBootstrap.js'
import Header from './components/layout/Header.jsx'
import Navigation from './components/layout/Navigation.jsx'
import Footer from './components/layout/Footer.jsx'
import ProblemDescription from './components/problem/ProblemDescription.jsx'
import CodePanel from './components/CodePanel.jsx'

// Just for testing:
import OllamaTest from './components/OllamaTest.jsx'

const App = () => {
  // Plugin system state
  const [pluginSystem, setPluginSystem] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const [initError, setInitError] = useState(null)

  // UI state (managed by plugins but reflected in React state for rendering)
  const [currentDay, setCurrentDay] = useState(1)
  const [completedDays, setCompletedDays] = useState(new Set())
  const [showSolution, setShowSolution] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState(null)
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [problem, setProblem] = useState(null)

  // Refs for event handlers
  const eventHandlersRef = useRef(new Map())

  // Initialize plugin system
  useEffect(() => {
    const initPlugins = async () => {
      try {
        console.log('[App] Initializing plugin system...')
        const pluginManager = await initializePluginSystem({
          debug: process.env.NODE_ENV === 'development'
        })

        const context = new PluginSystemContext(pluginManager)
        setPluginSystem(context)

        // Set up event handlers
        setupEventHandlers(context)

        // Load initial state from plugins
        await loadInitialState(context)

        setIsInitializing(false)
        console.log('[App] Plugin system initialized successfully')
      } catch (error) {
        console.error('[App] Failed to initialize plugin system:', error)
        setInitError(error.message)
        setIsInitializing(false)
      }
    }

    initPlugins()

    // Cleanup on unmount
    return () => {
      if (pluginSystem) {
        pluginSystem.hooks.shutdown()
      }
    }
  }, [])

  // Set up event handlers for plugin events
  const setupEventHandlers = (context) => {
    const eventBus = context.eventBus

    // Day changed event
    const handleDayChanged = (data) => {
      setCurrentDay(data.day)
      console.log('[App] Day changed to:', data.day)
    }

    // Progress updated event
    const handleProgressUpdated = (data) => {
      setCompletedDays((prev) => {
        const newSet = new Set(prev)
        if (data.completed) {
          newSet.add(data.day)
        } else {
          newSet.delete(data.day)
        }
        return newSet
      })
      console.log('[App] Progress updated for day:', data.day, data.completed)
    }

    // Timer events
    const handleTimerTick = (data) => {
      setTimer(data.time)
    }

    const handleTimerStarted = (data) => {
      setIsRunning(true)
    }

    const handleTimerStopped = (data) => {
      setIsRunning(false)
    }

    const handleTimerReset = (data) => {
      setTimer(0)
      setIsRunning(false)
    }

    // Test events
    const handleTestStarted = (data) => {
      setIsRunningTests(true)
      setTestResults(null)
    }

    const handleTestCompleted = (data) => {
      setTestResults(data.results)
      setIsRunningTests(false)
    }

    const handleTestError = (data) => {
      setTestResults({ error: data.error })
      setIsRunningTests(false)
    }

    // Problem loaded event
    const handleProblemLoaded = (data) => {
      setProblem(data.problem)
      // Initialize user code with starter code
      if (data.problem.starter) {
        setUserCode(data.problem.starter)
      }
    }

    // Solution visibility events
    const handleSolutionShown = (data) => {
      setShowSolution(true)
    }

    const handleSolutionHidden = (data) => {
      setShowSolution(false)
    }

    // User code changed event
    const handleUserCodeChanged = (data) => {
      setUserCode(data.code)
    }

    // Register all event handlers
    const handlers = [
      ['day-changed', handleDayChanged],
      ['progress-updated', handleProgressUpdated],
      ['timer-tick', handleTimerTick],
      ['timer-started', handleTimerStarted],
      ['timer-stopped', handleTimerStopped],
      ['timer-reset', handleTimerReset],
      ['test-started', handleTestStarted],
      ['test-completed', handleTestCompleted],
      ['test-error', handleTestError],
      ['problem-loaded', handleProblemLoaded],
      ['solution-shown', handleSolutionShown],
      ['solution-hidden', handleSolutionHidden],
      ['user-code-changed', handleUserCodeChanged]
    ]

    handlers.forEach(([event, handler]) => {
      eventBus.on(event, handler, { pluginName: 'App' })
      eventHandlersRef.current.set(event, handler)
    })
  }

  // Load initial state from plugins
  const loadInitialState = async (context) => {
    try {
      // Get UI state from UIStatePlugin
      const uiState = await context.hooks.executePlugin('UIStatePlugin', {
        action: 'getUIState'
      })

      if (uiState) {
        setCurrentDay(uiState.currentDay)
        setShowSolution(uiState.showSolution)
        setUserCode(uiState.userCode)
      }

      // Get progress from UserProgressPlugin
      const progress = await context.hooks.executePlugin('UserProgressPlugin', {
        action: 'getProgress'
      })

      if (progress) {
        setCompletedDays(new Set(progress.completedDays))
      }

      // Get timer state from TimerPlugin
      const timerState = await context.hooks.executePlugin('TimerPlugin', {
        action: 'getTime'
      })

      if (timerState) {
        setTimer(timerState.time)
        setIsRunning(timerState.isRunning)
      }

      // Load current problem
      await context.loadProblem(uiState?.currentDay || 1)
    } catch (error) {
      console.error('[App] Failed to load initial state:', error)
    }
  }

  // Plugin-based action handlers
  const handleSetCurrentDay = async (day) => {
    if (pluginSystem) {
      await pluginSystem.setCurrentDay(day)
    }
  }

  const handleStartTimer = async () => {
    if (pluginSystem) {
      await pluginSystem.startTimer()
    }
  }

  const handleStopTimer = async () => {
    if (pluginSystem) {
      await pluginSystem.stopTimer()
    }
  }

  const handleResetTimer = async () => {
    if (pluginSystem) {
      await pluginSystem.resetTimer()
    }
  }

  const handleMarkComplete = async () => {
    if (pluginSystem) {
      await pluginSystem.markDayComplete(currentDay)
    }
  }

  const handleMarkIncomplete = async () => {
    if (pluginSystem) {
      await pluginSystem.markDayIncomplete(currentDay)
    }
  }

  const handleExecuteTests = async () => {
    if (pluginSystem && problem) {
      await pluginSystem.executeTests(userCode, problem.testCases)
    }
  }

  const handleToggleSolution = async (show) => {
    if (pluginSystem) {
      await pluginSystem.toggleSolution(show)
    }
  }

  const handleSetUserCode = async (code) => {
    if (pluginSystem) {
      await pluginSystem.setUserCode(code)
    }
  }

  // Utility functions
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const weekColors = {
    1: 'bg-blue-500',
    2: 'bg-green-500',
    3: 'bg-purple-500',
    4: 'bg-orange-500'
  }

  const getWeekName = (week) => {
    const names = {
      1: 'Fundamentals',
      2: 'Data Structures',
      3: 'Data Transformation',
      4: 'Integration & Speed'
    }
    return names[week] || 'Week'
  }

  // Loading state
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing plugin system...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (initError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to initialize application</p>
          <p className="text-gray-600 text-sm">{initError}</p>
        </div>
      </div>
    )
  }

  // No problem loaded
  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading problem...</p>
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
            currentProblem={problem}
            currentDay={currentDay}
            completedDays={completedDays}
            weekColors={weekColors}
          />

          <CodePanel
            userCode={userCode}
            setUserCode={handleSetUserCode}
            isRunning={isRunning}
            startTimer={handleStartTimer}
            stopTimer={handleStopTimer}
            resetTimer={handleResetTimer}
            executeTests={handleExecuteTests}
            isRunningTests={isRunningTests}
            currentProblem={problem}
            showSolution={showSolution}
            setShowSolution={handleToggleSolution}
            testResults={testResults}
          />
        </div>

        <Navigation
          currentDay={currentDay}
          setCurrentDay={handleSetCurrentDay}
          completedDays={completedDays}
          setCompletedDays={setCompletedDays}
          markComplete={handleMarkComplete}
          markIncomplete={handleMarkIncomplete}
        />

        <Footer completedDays={completedDays} />
        <OllamaTest />
      </div>
    </div>
  )
}

export default App
