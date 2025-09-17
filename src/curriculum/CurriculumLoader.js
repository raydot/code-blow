/**
 * CurriculumLoader - Dynamic curriculum loading system
 * Loads problems on demand and provides microservice-ready architecture
 */

import { week1Problems, week1Metadata } from './week1.js'
import { week2Problems, week2Metadata } from './week2.js'
import { week3Problems, week3Metadata } from './week3.js'
import { week4Problems, week4Metadata } from './week4.js'

class CurriculumLoader {
  constructor() {
    this.weekModules = new Map()
    this.problemCache = new Map()
    this.metadataCache = new Map()
    
    // Register week modules
    this.registerWeek(1, week1Problems, week1Metadata)
    this.registerWeek(2, week2Problems, week2Metadata)
    this.registerWeek(3, week3Problems, week3Metadata)
    this.registerWeek(4, week4Problems, week4Metadata)
  }

  /**
   * Register a week module
   * @param {number} weekNumber - Week number (1-4)
   * @param {Object} problems - Week problems object
   * @param {Object} metadata - Week metadata
   */
  registerWeek(weekNumber, problems, metadata) {
    this.weekModules.set(weekNumber, { problems, metadata })
    this.metadataCache.set(weekNumber, metadata)
    
    // Cache individual problems
    Object.entries(problems).forEach(([day, problem]) => {
      this.problemCache.set(parseInt(day), problem)
    })
  }

  /**
   * Get a specific problem by day
   * @param {number} day - Day number (1-30)
   * @returns {Object|null} Problem object or null if not found
   */
  getProblem(day) {
    if (typeof day !== 'number' || day < 1 || day > 30) {
      return null
    }

    return this.problemCache.get(day) || null
  }

  /**
   * Get all problems for a specific week
   * @param {number} week - Week number (1-4)
   * @returns {Object} Week problems object
   */
  getWeekProblems(week) {
    const weekModule = this.weekModules.get(week)
    return weekModule ? weekModule.problems : {}
  }

  /**
   * Get week metadata
   * @param {number} week - Week number (1-4)
   * @returns {Object|null} Week metadata or null if not found
   */
  getWeekMetadata(week) {
    return this.metadataCache.get(week) || null
  }

  /**
   * Get all problems as a flat object (for backward compatibility)
   * @returns {Object} All problems indexed by day
   */
  getAllProblems() {
    const allProblems = {}
    
    for (const [day, problem] of this.problemCache) {
      allProblems[day] = problem
    }
    
    return allProblems
  }

  /**
   * Get curriculum overview
   * @returns {Object} Complete curriculum information
   */
  getCurriculumOverview() {
    const weeks = []
    const totalProblems = this.problemCache.size
    
    for (let week = 1; week <= 4; week++) {
      const metadata = this.getWeekMetadata(week)
      const problems = this.getWeekProblems(week)
      const problemCount = Object.keys(problems).length
      
      weeks.push({
        ...metadata,
        problemCount,
        dayRange: this.getWeekDayRange(week)
      })
    }
    
    return {
      totalProblems,
      totalWeeks: 4,
      weeks,
      dayRange: { start: 1, end: 30 }
    }
  }

  /**
   * Get day range for a specific week
   * @param {number} week - Week number
   * @returns {Object} Day range {start, end}
   */
  getWeekDayRange(week) {
    const problems = this.getWeekProblems(week)
    const days = Object.keys(problems).map(d => parseInt(d)).sort((a, b) => a - b)
    
    return days.length > 0 
      ? { start: days[0], end: days[days.length - 1] }
      : { start: null, end: null }
  }

  /**
   * Search problems by criteria
   * @param {Object} criteria - Search criteria
   * @returns {Array} Matching problems
   */
  searchProblems(criteria = {}) {
    const { week, title, focus, difficulty } = criteria
    const results = []
    
    for (const [day, problem] of this.problemCache) {
      let matches = true
      
      if (week && problem.week !== week) matches = false
      if (title && !problem.title.toLowerCase().includes(title.toLowerCase())) matches = false
      if (focus && !problem.focus.toLowerCase().includes(focus.toLowerCase())) matches = false
      
      if (matches) {
        results.push({ day, ...problem })
      }
    }
    
    return results.sort((a, b) => a.day - b.day)
  }

  /**
   * Get problems by difficulty or complexity
   * @param {string} level - 'beginner', 'intermediate', 'advanced'
   * @returns {Array} Problems matching difficulty level
   */
  getProblemsByDifficulty(level) {
    const difficultyMap = {
      beginner: [1, 2, 3, 4, 5],
      intermediate: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      advanced: [22, 23, 24, 25, 26, 27, 28, 29, 30]
    }
    
    const days = difficultyMap[level] || []
    return days.map(day => ({ day, ...this.getProblem(day) })).filter(p => p.title)
  }

  /**
   * Validate curriculum integrity
   * @returns {Object} Validation results
   */
  validateCurriculum() {
    const issues = []
    const stats = {
      totalProblems: this.problemCache.size,
      expectedProblems: 30,
      missingDays: [],
      duplicateDays: [],
      weekDistribution: {}
    }
    
    // Check for missing days
    for (let day = 1; day <= 30; day++) {
      if (!this.problemCache.has(day)) {
        stats.missingDays.push(day)
        issues.push(`Missing problem for day ${day}`)
      }
    }
    
    // Check week distribution
    for (let week = 1; week <= 4; week++) {
      const weekProblems = Object.keys(this.getWeekProblems(week)).length
      stats.weekDistribution[week] = weekProblems
      
      if (weekProblems === 0) {
        issues.push(`Week ${week} has no problems`)
      }
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      stats
    }
  }

  /**
   * Get curriculum statistics
   * @returns {Object} Detailed statistics
   */
  getStatistics() {
    const stats = {
      totalProblems: this.problemCache.size,
      totalTestCases: 0,
      averageTestCasesPerProblem: 0,
      weekBreakdown: {},
      focusAreas: {},
      complexityDistribution: {}
    }
    
    // Calculate test cases and focus areas
    for (const [day, problem] of this.problemCache) {
      const testCaseCount = problem.testCases ? problem.testCases.length : 0
      stats.totalTestCases += testCaseCount
      
      // Week breakdown
      const week = problem.week
      if (!stats.weekBreakdown[week]) {
        stats.weekBreakdown[week] = { problems: 0, testCases: 0 }
      }
      stats.weekBreakdown[week].problems++
      stats.weekBreakdown[week].testCases += testCaseCount
      
      // Focus areas
      if (problem.focus) {
        const focusKey = problem.focus.split('.')[0] // First sentence
        stats.focusAreas[focusKey] = (stats.focusAreas[focusKey] || 0) + 1
      }
    }
    
    stats.averageTestCasesPerProblem = stats.totalTestCases / stats.totalProblems
    
    return stats
  }
}

// Create singleton instance
export const curriculumLoader = new CurriculumLoader()

// Export for backward compatibility
export const curriculum = curriculumLoader.getAllProblems()

// Export class for advanced usage
export { CurriculumLoader }
