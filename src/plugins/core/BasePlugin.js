/**
 * BasePlugin - Abstract base class that all plugins must extend
 * Defines the plugin lifecycle and interface contract
 */

export class BasePlugin {
  constructor(config = {}) {
    this.name = this.constructor.name
    this.version = config.version || '1.0.0'
    this.config = config
    this.enabled = config.enabled !== false
    this.dependencies = config.dependencies || []
    this.initialized = false
  }

  /**
   * Plugin lifecycle methods - must be implemented by subclasses
   */
  
  /**
   * Initialize the plugin with context
   * @param {Object} context - Application context (eventBus, config, etc.)
   */
  async initialize(context) {
    throw new Error(`Plugin ${this.name} must implement initialize() method`)
  }

  /**
   * Execute plugin functionality
   * @param {Object} input - Input data for plugin execution
   * @returns {Object} - Plugin execution result
   */
  async execute(input) {
    throw new Error(`Plugin ${this.name} must implement execute() method`)
  }

  /**
   * Cleanup plugin resources
   */
  async cleanup() {
    // Default implementation - can be overridden
    this.initialized = false
  }

  /**
   * Plugin lifecycle hooks - optional to override
   */
  
  onEnable() {
    // Called when plugin is enabled
  }

  onDisable() {
    // Called when plugin is disabled
  }

  onConfigChange(newConfig) {
    // Called when plugin configuration changes
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Plugin metadata and status
   */
  
  getInfo() {
    return {
      name: this.name,
      version: this.version,
      enabled: this.enabled,
      initialized: this.initialized,
      dependencies: this.dependencies
    }
  }

  isEnabled() {
    return this.enabled
  }

  isInitialized() {
    return this.initialized
  }

  enable() {
    this.enabled = true
    this.onEnable()
  }

  disable() {
    this.enabled = false
    this.onDisable()
  }
}
