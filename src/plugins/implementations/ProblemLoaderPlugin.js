/**
 * ProblemLoaderPlugin - Manages problem loading and curriculum data
 * Handles problem retrieval, caching, and curriculum management
 */

import { BasePlugin } from '../core/BasePlugin.js'
import { curriculum } from '../../curriculum.js'

export class ProblemLoaderPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.problems = new Map()
    this.currentProblem = null
    this.cacheEnabled = config.cacheProblems !== false
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    this.config = context.config

    // Load curriculum data
    await this.loadCurriculum()

    // Subscribe to problem loading events
    this.eventBus.on('load-problem', this.handleLoadProblem.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('get-problem', this.handleGetProblem.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    this.eventBus.on('get-curriculum-info', this.handleGetCurriculumInfo.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    // Listen to day changes to auto-load problems
    this.eventBus.on('day-changed', this.handleDayChanged.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    console.log('[ProblemLoaderPlugin] Initialized with', this.problems.size, 'problems')
  }

  async execute(input) {
    const { action, day, ...params } = input

    switch (action) {
      case 'loadProblem':
        return await this.loadProblem(day)
      case 'getProblem':
        return this.getProblem(day)
      case 'getCurrentProblem':
        return this.getCurrentProblem()
      case 'getCurriculumInfo':
        return this.getCurriculumInfo()
      case 'getWeekInfo':
        return this.getWeekInfo(params.week)
      case 'validateDay':
        return this.validateDay(day)
      default:
        throw new Error(`Unknown problem loader action: ${action}`)
    }
  }

  async loadCurriculum() {
    try {
      // Load problems from curriculum
      for (const [dayStr, problem] of Object.entries(curriculum)) {
        const day = parseInt(dayStr)
        if (!isNaN(day)) {
          this.problems.set(day, {
            ...problem,
            day,
            loaded: true,
            loadedAt: new Date()
          })
        }
      }

      await this.eventBus.emit('curriculum-loaded', {
        totalProblems: this.problems.size,
        problems: Array.from(this.problems.keys()).sort((a, b) => a - b)
      })

      console.log(`[ProblemLoaderPlugin] Loaded ${this.problems.size} problems from curriculum`)
    } catch (error) {
      console.error('[ProblemLoaderPlugin] Failed to load curriculum:', error)
      throw error
    }
  }

  async loadProblem(day) {
    if (!this.validateDay(day).isValid) {
      throw new Error(`Invalid day: ${day}`)
    }

    const problem = this.problems.get(day)
    if (!problem) {
      throw new Error(`Problem not found for day ${day}`)
    }

    this.currentProblem = { ...problem, day }

    await this.eventBus.emit('problem-loaded', {
      day,
      problem: this.currentProblem,
      title: problem.title,
      week: problem.week
    })

    return {
      success: true,
      day,
      problem: this.currentProblem
    }
  }

  getProblem(day) {
    if (day === undefined) {
      return this.currentProblem
    }

    const problem = this.problems.get(day)
    return problem ? { ...problem, day } : null
  }

  getCurrentProblem() {
    return this.currentProblem
  }

  getCurriculumInfo() {
    const weeks = {}
    const problemsByWeek = {}

    for (const [day, problem] of this.problems) {
      const week = problem.week
      if (!weeks[week]) {
        weeks[week] = {
          week,
          problems: [],
          count: 0
        }
        problemsByWeek[week] = []
      }
      
      weeks[week].problems.push(day)
      weeks[week].count++
      problemsByWeek[week].push({
        day,
        title: problem.title,
        focus: problem.focus
      })
    }

    // Sort problems within each week
    Object.values(weeks).forEach(week => {
      week.problems.sort((a, b) => a - b)
    })

    return {
      totalProblems: this.problems.size,
      totalWeeks: Object.keys(weeks).length,
      weeks,
      problemsByWeek,
      weekNames: this.getWeekNames()
    }
  }

  getWeekInfo(week) {
    const curriculumInfo = this.getCurriculumInfo()
    return curriculumInfo.weeks[week] || null
  }

  getWeekNames() {
    return {
      1: 'Fundamentals',
      2: 'Data Structures', 
      3: 'Algorithms',
      4: 'Advanced Patterns'
    }
  }

  validateDay(day) {
    if (typeof day !== 'number') {
      return { isValid: false, error: 'Day must be a number' }
    }

    if (day < 1 || day > 30) {
      return { isValid: false, error: 'Day must be between 1 and 30' }
    }

    if (!this.problems.has(day)) {
      return { isValid: false, error: `No problem available for day ${day}` }
    }

    return { isValid: true }
  }

  // Event handlers
  async handleLoadProblem(data) {
    return await this.loadProblem(data.day)
  }

  handleGetProblem(data) {
    return this.getProblem(data.day)
  }

  handleGetCurriculumInfo(data) {
    return this.getCurriculumInfo()
  }

  async handleDayChanged(data) {
    const { day, previousDay } = data
    
    try {
      await this.loadProblem(day)
      console.log(`[ProblemLoaderPlugin] Auto-loaded problem for day ${day}`)
    } catch (error) {
      console.error(`[ProblemLoaderPlugin] Failed to auto-load problem for day ${day}:`, error)
    }
  }

  getStatus() {
    return {
      ...this.getInfo(),
      totalProblems: this.problems.size,
      currentProblem: this.currentProblem?.day || null,
      cacheEnabled: this.cacheEnabled,
      curriculumLoaded: this.problems.size > 0
    }
  }

  async cleanup() {
    this.problems.clear()
    this.currentProblem = null
    await super.cleanup()
  }
}
