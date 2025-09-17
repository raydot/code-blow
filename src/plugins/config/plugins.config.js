/**
 * Plugin Configuration
 * Central configuration for all plugins in the system
 */

export const pluginConfig = {
  // Global plugin system settings
  system: {
    debug: false,
    autoInitialize: true,
    errorHandling: 'log', // 'throw' | 'log' | 'silent'
  },

  // Core plugins configuration
  plugins: {
    // Test execution plugin
    TestRunnerPlugin: {
      enabled: true,
      version: '1.0.0',
      timeout: 5000, // Test execution timeout in ms
      validateSyntax: true,
      dependencies: []
    },

    // User progress tracking plugin
    UserProgressPlugin: {
      enabled: true,
      version: '1.0.0',
      storageKey: 'coding-practice-progress',
      autoSave: true,
      dependencies: []
    },

    // Timer functionality plugin
    TimerPlugin: {
      enabled: true,
      version: '1.0.0',
      interval: 1000, // Timer update interval in ms
      autoStart: false,
      dependencies: []
    },

    // Problem loading and management plugin
    ProblemLoaderPlugin: {
      enabled: true,
      version: '1.0.0',
      source: 'curriculum', // 'curriculum' | 'api' | 'dynamic'
      cacheProblems: true,
      dependencies: []
    },

    // UI state management plugin
    UIStatePlugin: {
      enabled: true,
      version: '1.0.0',
      persistState: true,
      stateKey: 'ui-state',
      dependencies: ['UserProgressPlugin']
    },

    // Future AI plugins (disabled for now)
    AIAnalysisPlugin: {
      enabled: false,
      version: '1.0.0',
      provider: 'openai',
      model: 'gpt-4',
      apiKey: null, // Set via environment variable
      dependencies: ['TestRunnerPlugin']
    },

    ProblemGeneratorPlugin: {
      enabled: false,
      version: '1.0.0',
      difficulty: 'adaptive',
      topics: ['arrays', 'strings', 'objects', 'functions'],
      dependencies: ['AIAnalysisPlugin', 'UserProgressPlugin']
    },

    HintSystemPlugin: {
      enabled: false,
      version: '1.0.0',
      maxHints: 3,
      progressive: true,
      dependencies: ['AIAnalysisPlugin', 'TimerPlugin']
    },

    PerformanceTestPlugin: {
      enabled: false,
      version: '1.0.0',
      benchmarkIterations: 1000,
      memoryTracking: true,
      dependencies: ['TestRunnerPlugin']
    }
  },

  // Plugin loading order (for dependencies)
  loadOrder: [
    'UserProgressPlugin',
    'TimerPlugin', 
    'ProblemLoaderPlugin',
    'TestRunnerPlugin',
    'UIStatePlugin',
    // Future plugins
    'AIAnalysisPlugin',
    'ProblemGeneratorPlugin', 
    'HintSystemPlugin',
    'PerformanceTestPlugin'
  ],

  // Event configuration
  events: {
    // Core events that plugins can emit/listen to
    coreEvents: [
      'plugin-system-initialized',
      'plugin-initialized',
      'plugin-enabled',
      'plugin-disabled',
      'plugin-execute-start',
      'plugin-execute-complete',
      'plugin-execute-error'
    ],

    // Application events
    appEvents: [
      'day-changed',
      'problem-loaded',
      'test-started',
      'test-completed',
      'timer-started',
      'timer-stopped',
      'timer-reset',
      'progress-updated',
      'solution-shown',
      'solution-hidden'
    ]
  }
}

/**
 * Get configuration for a specific plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {Object} Plugin configuration
 */
export function getPluginConfig(pluginName) {
  return pluginConfig.plugins[pluginName] || {}
}

/**
 * Get enabled plugins
 * @returns {Array} Array of enabled plugin names
 */
export function getEnabledPlugins() {
  return Object.entries(pluginConfig.plugins)
    .filter(([name, config]) => config.enabled)
    .map(([name]) => name)
}

/**
 * Update plugin configuration
 * @param {string} pluginName - Name of the plugin
 * @param {Object} newConfig - New configuration to merge
 */
export function updatePluginConfig(pluginName, newConfig) {
  if (pluginConfig.plugins[pluginName]) {
    pluginConfig.plugins[pluginName] = {
      ...pluginConfig.plugins[pluginName],
      ...newConfig
    }
  }
}

/**
 * Enable/disable a plugin
 * @param {string} pluginName - Name of the plugin
 * @param {boolean} enabled - Whether to enable the plugin
 */
export function setPluginEnabled(pluginName, enabled) {
  if (pluginConfig.plugins[pluginName]) {
    pluginConfig.plugins[pluginName].enabled = enabled
  }
}
