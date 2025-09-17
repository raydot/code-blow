/**
 * Curriculum - Main curriculum export
 * 
 * Uses modular curriculum loader for better maintainability and microservice readiness.
 * Contains exactly 30 problems across 4 themed weeks as originally planned.
 * 
 * For additional/extended content, see: ./curriculum/extras/
 */

// Import the modular curriculum system
export { curriculum, curriculumLoader, CurriculumLoader } from './curriculum/CurriculumLoader.js'

// Re-export individual week modules for direct access if needed
export { week1Problems, week1Metadata } from './curriculum/week1.js'
export { week2Problems, week2Metadata } from './curriculum/week2.js' 
export { week3Problems, week3Metadata } from './curriculum/week3.js'
export { week4Problems, week4Metadata } from './curriculum/week4.js'
