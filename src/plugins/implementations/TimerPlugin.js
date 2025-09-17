/**
 * TimerPlugin - Manages coding session timer functionality
 * Handles start, stop, reset, and time tracking
 */

import { BasePlugin } from '../core/BasePlugin.js'

export class TimerPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.timer = 0
    this.isRunning = false
    this.intervalId = null
    this.startTime = null
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    this.config = context.config
    this.interval = this.config.interval || 1000

    // Subscribe to timer control events
    this.eventBus.on('timer-start', this.handleStart.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('timer-stop', this.handleStop.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('timer-reset', this.handleReset.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('timer-get-time', this.handleGetTime.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    // Auto-start if configured
    if (this.config.autoStart) {
      await this.start()
    }

    console.log('[TimerPlugin] Initialized')
  }

  async execute(input) {
    const { action, ...params } = input

    switch (action) {
      case 'start':
        return await this.start()
      case 'stop':
        return await this.stop()
      case 'reset':
        return await this.reset()
      case 'getTime':
        return this.getTime()
      case 'getStatus':
        return this.getTimerStatus()
      default:
        throw new Error(`Unknown timer action: ${action}`)
    }
  }

  async start() {
    if (this.isRunning) {
      return { success: false, message: 'Timer already running' }
    }

    this.isRunning = true
    this.startTime = Date.now() - (this.timer * 1000)

    this.intervalId = setInterval(() => {
      this.timer = Math.floor((Date.now() - this.startTime) / 1000)
      
      // Emit timer tick event
      this.eventBus.emitSync('timer-tick', {
        time: this.timer,
        formatted: this.formatTime(this.timer)
      })
    }, this.interval)

    await this.eventBus.emit('timer-started', {
      time: this.timer,
      timestamp: new Date()
    })

    return { success: true, time: this.timer }
  }

  async stop() {
    if (!this.isRunning) {
      return { success: false, message: 'Timer not running' }
    }

    this.isRunning = false
    
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    await this.eventBus.emit('timer-stopped', {
      time: this.timer,
      timestamp: new Date()
    })

    return { success: true, time: this.timer }
  }

  async reset() {
    const wasRunning = this.isRunning

    if (this.isRunning) {
      await this.stop()
    }

    this.timer = 0
    this.startTime = null

    await this.eventBus.emit('timer-reset', {
      time: this.timer,
      timestamp: new Date(),
      wasRunning
    })

    return { success: true, time: this.timer, wasRunning }
  }

  getTime() {
    return {
      time: this.timer,
      formatted: this.formatTime(this.timer),
      isRunning: this.isRunning
    }
  }

  getTimerStatus() {
    return {
      ...this.getInfo(),
      timer: this.timer,
      isRunning: this.isRunning,
      formatted: this.formatTime(this.timer),
      interval: this.interval
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Event handlers
  async handleStart(data) {
    return await this.start()
  }

  async handleStop(data) {
    return await this.stop()
  }

  async handleReset(data) {
    return await this.reset()
  }

  handleGetTime(data) {
    return this.getTime()
  }

  async cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.isRunning = false
    await super.cleanup()
  }
}
