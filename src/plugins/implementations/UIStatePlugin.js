/**
 * UIStatePlugin - Manages UI state and user interface interactions
 * Handles current day, solution visibility, and other UI state management
 */

import { BasePlugin } from '../core/BasePlugin.js'

export class UIStatePlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.currentDay = 1
    this.showSolution = false
    this.userCode = ''
    this.persistState = config.persistState !== false
    this.stateKey = config.stateKey || 'ui-state'
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    this.config = context.config

    // Load persisted state
    if (this.persistState) {
      this.loadState()
    }

    // Subscribe to UI state events
    this.eventBus.on('set-current-day', this.handleSetCurrentDay.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('toggle-solution', this.handleToggleSolution.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('set-user-code', this.handleSetUserCode.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('get-ui-state', this.handleGetUIState.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('reset-ui-state', this.handleResetUIState.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    // Listen to progress updates to potentially change UI state
    this.eventBus.on('progress-updated', this.handleProgressUpdated.bind(this), {
      pluginName: this.name,
      priority: 0
    })

    console.log('[UIStatePlugin] Initialized with day', this.currentDay)
  }

  async execute(input) {
    const { action, ...params } = input

    switch (action) {
      case 'setCurrentDay':
        return await this.setCurrentDay(params.day)
      case 'getCurrentDay':
        return this.getCurrentDay()
      case 'toggleSolution':
        return await this.toggleSolution(params.show)
      case 'setSolutionVisibility':
        return await this.setSolutionVisibility(params.show)
      case 'setUserCode':
        return this.setUserCode(params.code)
      case 'getUserCode':
        return this.getUserCode()
      case 'getUIState':
        return this.getUIState()
      case 'resetState':
        return await this.resetState()
      case 'navigateNext':
        return await this.navigateNext()
      case 'navigatePrevious':
        return await this.navigatePrevious()
      default:
        throw new Error(`Unknown UI state action: ${action}`)
    }
  }

  async setCurrentDay(day) {
    if (typeof day !== 'number' || day < 1 || day > 30) {
      throw new Error('Invalid day number')
    }

    const previousDay = this.currentDay
    this.currentDay = day

    // Reset solution visibility when changing days
    if (previousDay !== day) {
      this.showSolution = false
      this.userCode = '' // Clear code when switching days
    }

    if (this.persistState) {
      this.saveState()
    }

    await this.eventBus.emit('day-changed', {
      day: this.currentDay,
      previousDay,
      timestamp: new Date()
    })

    return {
      success: true,
      currentDay: this.currentDay,
      previousDay,
      showSolution: this.showSolution
    }
  }

  getCurrentDay() {
    return {
      currentDay: this.currentDay,
      showSolution: this.showSolution,
      userCode: this.userCode
    }
  }

  async toggleSolution(forceShow = null) {
    const previousState = this.showSolution
    this.showSolution = forceShow !== null ? forceShow : !this.showSolution

    if (this.persistState) {
      this.saveState()
    }

    const eventName = this.showSolution ? 'solution-shown' : 'solution-hidden'
    await this.eventBus.emit(eventName, {
      day: this.currentDay,
      previousState,
      currentState: this.showSolution,
      timestamp: new Date()
    })

    return {
      success: true,
      showSolution: this.showSolution,
      previousState,
      day: this.currentDay
    }
  }

  async setSolutionVisibility(show) {
    return await this.toggleSolution(show)
  }

  setUserCode(code) {
    this.userCode = code || ''

    if (this.persistState) {
      this.saveState()
    }

    // Emit code change event (synchronous to avoid performance issues)
    this.eventBus.emitSync('user-code-changed', {
      code: this.userCode,
      day: this.currentDay,
      length: this.userCode.length,
      lines: this.userCode.split('\n').length
    })

    return {
      success: true,
      code: this.userCode,
      length: this.userCode.length,
      lines: this.userCode.split('\n').length
    }
  }

  getUserCode() {
    return {
      code: this.userCode,
      length: this.userCode.length,
      lines: this.userCode.split('\n').length
    }
  }

  getUIState() {
    return {
      currentDay: this.currentDay,
      showSolution: this.showSolution,
      userCode: this.userCode,
      codeStats: {
        length: this.userCode.length,
        lines: this.userCode.split('\n').length
      }
    }
  }

  async resetState() {
    const previousState = this.getUIState()
    
    this.currentDay = 1
    this.showSolution = false
    this.userCode = ''

    if (this.persistState) {
      this.saveState()
    }

    await this.eventBus.emit('ui-state-reset', {
      previousState,
      newState: this.getUIState(),
      timestamp: new Date()
    })

    return {
      success: true,
      previousState,
      newState: this.getUIState()
    }
  }

  async navigateNext() {
    if (this.currentDay >= 30) {
      return { success: false, message: 'Already at last day' }
    }

    return await this.setCurrentDay(this.currentDay + 1)
  }

  async navigatePrevious() {
    if (this.currentDay <= 1) {
      return { success: false, message: 'Already at first day' }
    }

    return await this.setCurrentDay(this.currentDay - 1)
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.stateKey)
      if (saved) {
        const state = JSON.parse(saved)
        this.currentDay = state.currentDay || 1
        this.showSolution = state.showSolution || false
        this.userCode = state.userCode || ''
      }
    } catch (error) {
      console.warn('[UIStatePlugin] Failed to load state:', error)
    }
  }

  saveState() {
    try {
      const state = {
        currentDay: this.currentDay,
        showSolution: this.showSolution,
        userCode: this.userCode,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(this.stateKey, JSON.stringify(state))
    } catch (error) {
      console.error('[UIStatePlugin] Failed to save state:', error)
    }
  }

  // Event handlers
  async handleSetCurrentDay(data) {
    return await this.setCurrentDay(data.day)
  }

  async handleToggleSolution(data) {
    return await this.toggleSolution(data.show)
  }

  handleSetUserCode(data) {
    return this.setUserCode(data.code)
  }

  handleGetUIState(data) {
    return this.getUIState()
  }

  async handleResetUIState(data) {
    return await this.resetState()
  }

  async handleProgressUpdated(data) {
    // Could implement auto-navigation or other UI responses to progress changes
    // For now, just log the progress update
    console.log(`[UIStatePlugin] Progress updated for day ${data.day}:`, data.completed)
  }

  getStatus() {
    return {
      ...this.getInfo(),
      currentDay: this.currentDay,
      showSolution: this.showSolution,
      codeLength: this.userCode.length,
      persistState: this.persistState
    }
  }

  async cleanup() {
    if (this.persistState) {
      this.saveState()
    }
    await super.cleanup()
  }
}
