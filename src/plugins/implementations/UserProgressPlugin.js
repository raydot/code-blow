/**
 * UserProgressPlugin - Manages user progress and completion tracking
 * Handles localStorage persistence and progress state management
 */

import { BasePlugin } from '../core/BasePlugin.js'

export class UserProgressPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.completedDays = new Set()
    this.storageKey = config.storageKey || 'coding-practice-progress'
    this.autoSave = config.autoSave !== false
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    this.config = context.config

    // Load existing progress from localStorage
    this.loadProgress()

    // Subscribe to progress events
    this.eventBus.on('mark-day-complete', this.handleMarkComplete.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('mark-day-incomplete', this.handleMarkIncomplete.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('get-progress', this.handleGetProgress.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('reset-progress', this.handleResetProgress.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    // Listen to test completion for auto-marking
    this.eventBus.on('test-completed', this.handleTestCompleted.bind(this), {
      pluginName: this.name,
      priority: 0 // Lower priority to run after other handlers
    })

    console.log('[UserProgressPlugin] Initialized with', this.completedDays.size, 'completed days')
  }

  async execute(input) {
    const { action, day, ...params } = input

    switch (action) {
      case 'markComplete':
        return await this.markDayComplete(day)
      case 'markIncomplete':
        return await this.markDayIncomplete(day)
      case 'getProgress':
        return this.getProgress()
      case 'isComplete':
        return this.isDayComplete(day)
      case 'reset':
        return await this.resetProgress()
      case 'getStats':
        return this.getProgressStats()
      default:
        throw new Error(`Unknown progress action: ${action}`)
    }
  }

  async markDayComplete(day) {
    if (typeof day !== 'number' || day < 1 || day > 30) {
      throw new Error('Invalid day number')
    }

    const wasComplete = this.completedDays.has(day)
    this.completedDays.add(day)

    if (this.autoSave) {
      this.saveProgress()
    }

    if (!wasComplete) {
      await this.eventBus.emit('progress-updated', {
        day,
        completed: true,
        totalCompleted: this.completedDays.size,
        progress: this.getProgressStats()
      })
    }

    return {
      success: true,
      day,
      completed: true,
      wasAlreadyComplete: wasComplete,
      totalCompleted: this.completedDays.size
    }
  }

  async markDayIncomplete(day) {
    if (typeof day !== 'number' || day < 1 || day > 30) {
      throw new Error('Invalid day number')
    }

    const wasComplete = this.completedDays.has(day)
    this.completedDays.delete(day)

    if (this.autoSave) {
      this.saveProgress()
    }

    if (wasComplete) {
      await this.eventBus.emit('progress-updated', {
        day,
        completed: false,
        totalCompleted: this.completedDays.size,
        progress: this.getProgressStats()
      })
    }

    return {
      success: true,
      day,
      completed: false,
      wasComplete,
      totalCompleted: this.completedDays.size
    }
  }

  isDayComplete(day) {
    return this.completedDays.has(day)
  }

  getProgress() {
    return {
      completedDays: Array.from(this.completedDays).sort((a, b) => a - b),
      totalCompleted: this.completedDays.size,
      totalDays: 30,
      completionPercentage: Math.round((this.completedDays.size / 30) * 100),
      stats: this.getProgressStats()
    }
  }

  getProgressStats() {
    const stats = {
      week1: 0, // Days 1-7
      week2: 0, // Days 8-14
      week3: 0, // Days 15-21
      week4: 0  // Days 22-30
    }

    for (const day of this.completedDays) {
      if (day <= 7) stats.week1++
      else if (day <= 14) stats.week2++
      else if (day <= 21) stats.week3++
      else stats.week4++
    }

    return {
      byWeek: stats,
      totalCompleted: this.completedDays.size,
      totalDays: 30,
      completionPercentage: Math.round((this.completedDays.size / 30) * 100),
      isFullyComplete: this.completedDays.size === 30
    }
  }

  async resetProgress() {
    const previousCount = this.completedDays.size
    this.completedDays.clear()

    if (this.autoSave) {
      this.saveProgress()
    }

    await this.eventBus.emit('progress-reset', {
      previousCount,
      timestamp: new Date()
    })

    return {
      success: true,
      previousCount,
      currentCount: 0
    }
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(this.storageKey)
      if (saved) {
        const data = JSON.parse(saved)
        this.completedDays = new Set(data.completedDays || [])
      }
    } catch (error) {
      console.warn('[UserProgressPlugin] Failed to load progress:', error)
      this.completedDays = new Set()
    }
  }

  saveProgress() {
    try {
      const data = {
        completedDays: Array.from(this.completedDays),
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error('[UserProgressPlugin] Failed to save progress:', error)
    }
  }

  // Event handlers
  async handleMarkComplete(data) {
    return await this.markDayComplete(data.day)
  }

  async handleMarkIncomplete(data) {
    return await this.markDayIncomplete(data.day)
  }

  handleGetProgress(data) {
    return this.getProgress()
  }

  async handleResetProgress(data) {
    return await this.resetProgress()
  }

  async handleTestCompleted(data) {
    // Auto-mark day complete if all tests pass (optional feature)
    if (data.results && data.results.allPassed && data.day) {
      // Only auto-complete if not already complete
      if (!this.isDayComplete(data.day)) {
        console.log(`[UserProgressPlugin] Auto-completing day ${data.day} after successful tests`)
        await this.markDayComplete(data.day)
      }
    }
  }

  async cleanup() {
    if (this.autoSave) {
      this.saveProgress()
    }
    await super.cleanup()
  }
}
