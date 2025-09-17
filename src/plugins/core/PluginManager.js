/**
 * PluginManager - Central orchestrator for the plugin system
 * Handles plugin loading, initialization, execution, and lifecycle management
 */

import { EventBus } from './EventBus.js'
import { PluginRegistry } from './PluginRegistry.js'

export class PluginManager {
  constructor(config = {}) {
    this.eventBus = new EventBus()
    this.registry = new PluginRegistry()
    this.config = config
    this.initialized = false
    this.context = {
      eventBus: this.eventBus,
      config: this.config,
      pluginManager: this
    }

    // Set debug mode if specified
    if (config.debug) {
      this.eventBus.setDebugMode(true)
    }
  }

  /**
   * Initialize the plugin system
   */
  async initialize() {
    if (this.initialized) {
      console.warn('[PluginManager] Already initialized')
      return
    }

    console.log('[PluginManager] Initializing plugin system...')

    try {
      // Validate dependencies
      const errors = this.registry.validateDependencies()
      if (errors.length > 0) {
        throw new Error(`Dependency validation failed:\n${errors.join('\n')}`)
      }

      // Get plugins in dependency order
      const loadOrder = this.registry.resolveDependencies()
      console.log('[PluginManager] Plugin load order:', loadOrder)

      // Initialize plugins in order
      for (const pluginName of loadOrder) {
        await this.initializePlugin(pluginName)
      }

      this.initialized = true
      await this.eventBus.emit('plugin-system-initialized', { pluginManager: this })
      
      console.log('[PluginManager] Plugin system initialized successfully')
    } catch (error) {
      console.error('[PluginManager] Failed to initialize plugin system:', error)
      throw error
    }
  }

  /**
   * Register a plugin
   * @param {Class} PluginClass - Plugin class constructor
   * @param {Object} config - Plugin configuration
   */
  registerPlugin(PluginClass, config = {}) {
    return this.registry.register(PluginClass, config)
  }

  /**
   * Initialize a specific plugin
   * @param {string} pluginName - Name of plugin to initialize
   */
  async initializePlugin(pluginName) {
    const pluginInfo = this.registry.getPlugin(pluginName)
    if (!pluginInfo) {
      throw new Error(`Plugin '${pluginName}' not found`)
    }

    if (pluginInfo.instance) {
      console.warn(`[PluginManager] Plugin '${pluginName}' already initialized`)
      return pluginInfo.instance
    }

    try {
      console.log(`[PluginManager] Initializing plugin: ${pluginName}`)
      
      // Create plugin instance
      const instance = new pluginInfo.class(pluginInfo.config)
      
      // Initialize the plugin
      await instance.initialize(this.context)
      instance.initialized = true

      // Store instance and update status
      this.registry.setPluginInstance(pluginName, instance)
      this.registry.updatePluginStatus(pluginName, 'initialized')

      // Emit initialization event
      await this.eventBus.emit('plugin-initialized', { 
        pluginName, 
        instance,
        config: pluginInfo.config 
      })

      console.log(`[PluginManager] Plugin '${pluginName}' initialized successfully`)
      return instance
    } catch (error) {
      this.registry.updatePluginStatus(pluginName, 'error')
      console.error(`[PluginManager] Failed to initialize plugin '${pluginName}':`, error)
      throw error
    }
  }

  /**
   * Execute a plugin
   * @param {string} pluginName - Name of plugin to execute
   * @param {Object} input - Input data for plugin
   * @returns {*} Plugin execution result
   */
  async executePlugin(pluginName, input = {}) {
    const instance = this.registry.getPluginInstance(pluginName)
    if (!instance) {
      throw new Error(`Plugin '${pluginName}' not found or not initialized`)
    }

    if (!instance.isEnabled()) {
      throw new Error(`Plugin '${pluginName}' is disabled`)
    }

    try {
      // Emit pre-execution event
      await this.eventBus.emit('plugin-execute-start', { pluginName, input })

      // Execute the plugin
      const result = await instance.execute(input)

      // Emit post-execution event
      await this.eventBus.emit('plugin-execute-complete', { 
        pluginName, 
        input, 
        result 
      })

      return result
    } catch (error) {
      await this.eventBus.emit('plugin-execute-error', { 
        pluginName, 
        input, 
        error 
      })
      throw error
    }
  }

  /**
   * Enable a plugin
   * @param {string} pluginName - Name of plugin to enable
   */
  async enablePlugin(pluginName) {
    const instance = this.registry.getPluginInstance(pluginName)
    if (!instance) {
      throw new Error(`Plugin '${pluginName}' not found`)
    }

    instance.enable()
    await this.eventBus.emit('plugin-enabled', { pluginName, instance })
    console.log(`[PluginManager] Plugin '${pluginName}' enabled`)
  }

  /**
   * Disable a plugin
   * @param {string} pluginName - Name of plugin to disable
   */
  async disablePlugin(pluginName) {
    const instance = this.registry.getPluginInstance(pluginName)
    if (!instance) {
      throw new Error(`Plugin '${pluginName}' not found`)
    }

    instance.disable()
    await this.eventBus.emit('plugin-disabled', { pluginName, instance })
    console.log(`[PluginManager] Plugin '${pluginName}' disabled`)
  }

  /**
   * Get plugin status
   * @param {string} pluginName - Name of plugin (optional)
   * @returns {Object} Plugin status information
   */
  getPluginStatus(pluginName = null) {
    if (pluginName) {
      const pluginInfo = this.registry.getPlugin(pluginName)
      const instance = this.registry.getPluginInstance(pluginName)
      
      return {
        ...pluginInfo,
        instanceInfo: instance ? instance.getInfo() : null
      }
    }

    // Return status for all plugins
    return this.registry.getAllPlugins().map(plugin => ({
      ...plugin,
      instanceInfo: plugin.instance ? plugin.instance.getInfo() : null
    }))
  }

  /**
   * Get enabled plugins
   * @returns {Array} Array of enabled plugin names
   */
  getEnabledPlugins() {
    return this.registry.getAllPlugins()
      .filter(plugin => plugin.instance && plugin.instance.isEnabled())
      .map(plugin => plugin.name)
  }

  /**
   * Shutdown the plugin system
   */
  async shutdown() {
    console.log('[PluginManager] Shutting down plugin system...')

    // Get plugins in reverse order for cleanup
    const plugins = this.registry.getAllPlugins().reverse()

    for (const plugin of plugins) {
      if (plugin.instance) {
        try {
          await plugin.instance.cleanup()
          console.log(`[PluginManager] Cleaned up plugin: ${plugin.name}`)
        } catch (error) {
          console.error(`[PluginManager] Error cleaning up plugin '${plugin.name}':`, error)
        }
      }
    }

    // Clear registry and event bus
    this.registry.clear()
    this.eventBus.removeAllListeners()
    this.initialized = false

    console.log('[PluginManager] Plugin system shutdown complete')
  }

  /**
   * Get system statistics
   * @returns {Object} System statistics
   */
  getSystemStats() {
    return {
      initialized: this.initialized,
      registry: this.registry.getStats(),
      eventBus: this.eventBus.getEventStats(),
      enabledPlugins: this.getEnabledPlugins()
    }
  }

  /**
   * Access to event bus for external use
   * @returns {EventBus} Event bus instance
   */
  getEventBus() {
    return this.eventBus
  }

  /**
   * Access to registry for external use
   * @returns {PluginRegistry} Registry instance
   */
  getRegistry() {
    return this.registry
  }
}
