/**
 * TestRunnerPlugin - Wraps the existing test engine functionality
 * Handles code execution and test validation through the plugin system
 */

import { BasePlugin } from '../core/BasePlugin.js'
import { runTests } from '../../engine/TestEngine.js'

export class TestRunnerPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.isRunning = false
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    this.config = context.config

    // Subscribe to test execution requests
    this.eventBus.on('execute-tests', this.handleExecuteTests.bind(this), {
      pluginName: this.name,
      priority: 1
    })

    console.log('[TestRunnerPlugin] Initialized')
  }

  async execute(input) {
    const { code, testCases, options = {} } = input

    if (!code || typeof code !== 'string') {
      throw new Error('No code provided for testing')
    }

    if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
      throw new Error('No test cases available for this problem')
    }

    try {
      // Emit test started event
      await this.eventBus.emit('test-started', {
        code,
        testCases: testCases.length,
        timestamp: new Date()
      })

      // Execute tests using existing engine
      const results = await runTests(code, testCases, {
        timeout: this.config.timeout || 5000,
        validateSyntax: this.config.validateSyntax !== false,
        ...options
      })

      // Emit test completed event
      await this.eventBus.emit('test-completed', {
        results,
        code,
        timestamp: new Date(),
        success: !results.error
      })

      return results
    } catch (error) {
      // Emit test error event
      await this.eventBus.emit('test-error', {
        error: error.message,
        code,
        timestamp: new Date()
      })

      return { error: error.message }
    }
  }

  async handleExecuteTests(data) {
    if (this.isRunning) {
      console.warn('[TestRunnerPlugin] Test execution already in progress')
      return { error: 'Test execution already in progress' }
    }

    this.isRunning = true

    try {
      const result = await this.execute(data)
      return result
    } finally {
      this.isRunning = false
    }
  }

  async cleanup() {
    // Clean up any running tests
    this.isRunning = false
    await super.cleanup()
  }

  getStatus() {
    return {
      ...this.getInfo(),
      isRunning: this.isRunning,
      timeout: this.config.timeout || 5000,
      validateSyntax: this.config.validateSyntax !== false
    }
  }
}
