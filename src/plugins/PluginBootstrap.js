/**
 * PluginBootstrap - Initializes and configures the plugin system
 * Handles plugin registration, configuration, and startup
 */

import { PluginManager } from './core/PluginManager.js'
import { pluginConfig, getPluginConfig } from './config/plugins.config.js'

// Import all plugin implementations
import { TestRunnerPlugin } from './implementations/TestRunnerPlugin.js'
import { TimerPlugin } from './implementations/TimerPlugin.js'
import { UserProgressPlugin } from './implementations/UserProgressPlugin.js'
import { ProblemLoaderPlugin } from './implementations/ProblemLoaderPlugin.js'
import { UIStatePlugin } from './implementations/UIStatePlugin.js'

/**
 * Initialize the plugin system with all core plugins
 * @param {Object} config - Override configuration
 * @returns {PluginManager} Initialized plugin manager
 */
export async function initializePluginSystem(config = {}) {
  console.log('[PluginBootstrap] Initializing plugin system...')

  // Create plugin manager with merged configuration
  const finalConfig = {
    ...pluginConfig.system,
    ...config
  }

  const pluginManager = new PluginManager(finalConfig)

  try {
    // Register all core plugins
    await registerCorePlugins(pluginManager)

    // Initialize the plugin system
    await pluginManager.initialize()

    console.log('[PluginBootstrap] Plugin system initialized successfully')
    return pluginManager
  } catch (error) {
    console.error('[PluginBootstrap] Failed to initialize plugin system:', error)
    throw error
  }
}

/**
 * Register all core plugins with the plugin manager
 * @param {PluginManager} pluginManager - Plugin manager instance
 */
async function registerCorePlugins(pluginManager) {
  const plugins = [
    { class: UserProgressPlugin, name: 'UserProgressPlugin' },
    { class: TimerPlugin, name: 'TimerPlugin' },
    { class: ProblemLoaderPlugin, name: 'ProblemLoaderPlugin' },
    { class: TestRunnerPlugin, name: 'TestRunnerPlugin' },
    { class: UIStatePlugin, name: 'UIStatePlugin' }
  ]

  for (const plugin of plugins) {
    const config = getPluginConfig(plugin.name)
    
    if (config.enabled) {
      console.log(`[PluginBootstrap] Registering ${plugin.name}`)
      pluginManager.registerPlugin(plugin.class, config)
    } else {
      console.log(`[PluginBootstrap] Skipping disabled plugin: ${plugin.name}`)
    }
  }
}

/**
 * Create a React hook for using the plugin system
 * @param {PluginManager} pluginManager - Plugin manager instance
 * @returns {Object} Plugin system interface
 */
export function createPluginHook(pluginManager) {
  return {
    // Execute plugin actions
    async executePlugin(pluginName, input) {
      return await pluginManager.executePlugin(pluginName, input)
    },

    // Get plugin status
    getPluginStatus(pluginName) {
      return pluginManager.getPluginStatus(pluginName)
    },

    // Access event bus for custom event handling
    getEventBus() {
      return pluginManager.getEventBus()
    },

    // Enable/disable plugins
    async enablePlugin(pluginName) {
      return await pluginManager.enablePlugin(pluginName)
    },

    async disablePlugin(pluginName) {
      return await pluginManager.disablePlugin(pluginName)
    },

    // Get system stats
    getSystemStats() {
      return pluginManager.getSystemStats()
    },

    // Shutdown system
    async shutdown() {
      return await pluginManager.shutdown()
    }
  }
}

/**
 * Plugin system context for React components
 */
export class PluginSystemContext {
  constructor(pluginManager) {
    this.pluginManager = pluginManager
    this.eventBus = pluginManager.getEventBus()
    this.hooks = createPluginHook(pluginManager)
  }

  // Convenience methods for common operations
  async executeTests(code, testCases) {
    return await this.hooks.executePlugin('TestRunnerPlugin', {
      code,
      testCases
    })
  }

  async setCurrentDay(day) {
    return await this.hooks.executePlugin('UIStatePlugin', {
      action: 'setCurrentDay',
      day
    })
  }

  async startTimer() {
    return await this.hooks.executePlugin('TimerPlugin', {
      action: 'start'
    })
  }

  async stopTimer() {
    return await this.hooks.executePlugin('TimerPlugin', {
      action: 'stop'
    })
  }

  async resetTimer() {
    return await this.hooks.executePlugin('TimerPlugin', {
      action: 'reset'
    })
  }

  async markDayComplete(day) {
    return await this.hooks.executePlugin('UserProgressPlugin', {
      action: 'markComplete',
      day
    })
  }

  async markDayIncomplete(day) {
    return await this.hooks.executePlugin('UserProgressPlugin', {
      action: 'markIncomplete',
      day
    })
  }

  async loadProblem(day) {
    return await this.hooks.executePlugin('ProblemLoaderPlugin', {
      action: 'loadProblem',
      day
    })
  }

  async toggleSolution(show) {
    return await this.hooks.executePlugin('UIStatePlugin', {
      action: 'toggleSolution',
      show
    })
  }

  async setUserCode(code) {
    return await this.hooks.executePlugin('UIStatePlugin', {
      action: 'setUserCode',
      code
    })
  }

  // Event subscription helpers
  onEvent(eventName, handler, options = {}) {
    this.eventBus.on(eventName, handler, options)
  }

  offEvent(eventName, handler) {
    this.eventBus.off(eventName, handler)
  }

  async emitEvent(eventName, data) {
    return await this.eventBus.emit(eventName, data)
  }
}
