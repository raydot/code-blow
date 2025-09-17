/**
 * PluginRegistry - Manages plugin registration, discovery, and metadata
 * Tracks available plugins and their status
 */

export class PluginRegistry {
  constructor() {
    this.plugins = new Map()
    this.pluginOrder = []
  }

  /**
   * Register a plugin class
   * @param {Class} PluginClass - Plugin class constructor
   * @param {Object} config - Plugin configuration
   */
  register(PluginClass, config = {}) {
    const pluginName = PluginClass.name
    
    if (this.plugins.has(pluginName)) {
      throw new Error(`Plugin '${pluginName}' is already registered`)
    }

    const pluginInfo = {
      name: pluginName,
      class: PluginClass,
      config,
      instance: null,
      status: 'registered',
      registeredAt: new Date(),
      dependencies: config.dependencies || [],
      version: config.version || '1.0.0'
    }

    this.plugins.set(pluginName, pluginInfo)
    this.pluginOrder.push(pluginName)

    console.log(`[PluginRegistry] Registered plugin: ${pluginName}`)
    return pluginInfo
  }

  /**
   * Unregister a plugin
   * @param {string} pluginName - Name of plugin to unregister
   */
  unregister(pluginName) {
    if (!this.plugins.has(pluginName)) {
      throw new Error(`Plugin '${pluginName}' is not registered`)
    }

    const pluginInfo = this.plugins.get(pluginName)
    
    // Cleanup instance if it exists
    if (pluginInfo.instance) {
      pluginInfo.instance.cleanup()
    }

    this.plugins.delete(pluginName)
    this.pluginOrder = this.pluginOrder.filter(name => name !== pluginName)

    console.log(`[PluginRegistry] Unregistered plugin: ${pluginName}`)
  }

  /**
   * Get plugin information
   * @param {string} pluginName - Name of plugin
   * @returns {Object} Plugin information
   */
  getPlugin(pluginName) {
    return this.plugins.get(pluginName)
  }

  /**
   * Check if plugin is registered
   * @param {string} pluginName - Name of plugin
   * @returns {boolean} Whether plugin is registered
   */
  hasPlugin(pluginName) {
    return this.plugins.has(pluginName)
  }

  /**
   * Get all registered plugins
   * @returns {Array} Array of plugin information objects
   */
  getAllPlugins() {
    return Array.from(this.plugins.values())
  }

  /**
   * Get plugins by status
   * @param {string} status - Plugin status to filter by
   * @returns {Array} Array of plugin information objects
   */
  getPluginsByStatus(status) {
    return this.getAllPlugins().filter(plugin => plugin.status === status)
  }

  /**
   * Update plugin status
   * @param {string} pluginName - Name of plugin
   * @param {string} status - New status
   */
  updatePluginStatus(pluginName, status) {
    const plugin = this.plugins.get(pluginName)
    if (plugin) {
      plugin.status = status
      plugin.lastStatusChange = new Date()
    }
  }

  /**
   * Set plugin instance
   * @param {string} pluginName - Name of plugin
   * @param {Object} instance - Plugin instance
   */
  setPluginInstance(pluginName, instance) {
    const plugin = this.plugins.get(pluginName)
    if (plugin) {
      plugin.instance = instance
    }
  }

  /**
   * Get plugin instance
   * @param {string} pluginName - Name of plugin
   * @returns {Object} Plugin instance
   */
  getPluginInstance(pluginName) {
    const plugin = this.plugins.get(pluginName)
    return plugin ? plugin.instance : null
  }

  /**
   * Resolve plugin dependencies and return load order
   * @returns {Array} Array of plugin names in dependency order
   */
  resolveDependencies() {
    const resolved = []
    const resolving = new Set()
    const visited = new Set()

    const resolve = (pluginName) => {
      if (visited.has(pluginName)) {
        return
      }

      if (resolving.has(pluginName)) {
        throw new Error(`Circular dependency detected involving plugin: ${pluginName}`)
      }

      const plugin = this.plugins.get(pluginName)
      if (!plugin) {
        throw new Error(`Plugin dependency not found: ${pluginName}`)
      }

      resolving.add(pluginName)

      // Resolve dependencies first
      for (const dependency of plugin.dependencies) {
        resolve(dependency)
      }

      resolving.delete(pluginName)
      visited.add(pluginName)
      resolved.push(pluginName)
    }

    // Resolve all plugins
    for (const pluginName of this.pluginOrder) {
      resolve(pluginName)
    }

    return resolved
  }

  /**
   * Get registry statistics
   * @returns {Object} Registry statistics
   */
  getStats() {
    const plugins = this.getAllPlugins()
    const statusCounts = {}

    plugins.forEach(plugin => {
      statusCounts[plugin.status] = (statusCounts[plugin.status] || 0) + 1
    })

    return {
      totalPlugins: plugins.length,
      statusCounts,
      registrationOrder: [...this.pluginOrder]
    }
  }

  /**
   * Validate plugin dependencies
   * @returns {Array} Array of validation errors
   */
  validateDependencies() {
    const errors = []

    for (const [pluginName, plugin] of this.plugins) {
      for (const dependency of plugin.dependencies) {
        if (!this.hasPlugin(dependency)) {
          errors.push(`Plugin '${pluginName}' depends on missing plugin '${dependency}'`)
        }
      }
    }

    return errors
  }

  /**
   * Clear all registered plugins
   */
  clear() {
    // Cleanup all instances
    for (const plugin of this.plugins.values()) {
      if (plugin.instance) {
        plugin.instance.cleanup()
      }
    }

    this.plugins.clear()
    this.pluginOrder = []
  }
}
