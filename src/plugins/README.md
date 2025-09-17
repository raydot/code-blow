# Plugin System Documentation

## Overview
The plugin system provides a modular, extensible architecture for the coding practice application. It enables features to be developed as independent, reusable components that communicate through events rather than direct coupling.

### Design Philosophy
The plugin architecture follows several key design principles:

- **Separation of Concerns**: Each plugin has a single, well-defined responsibility
- **Event-Driven Communication**: Plugins communicate through events, not direct calls
- **Loose Coupling**: Plugins can be developed, tested, and deployed independently
- **High Cohesion**: Related functionality is grouped within plugins
- **Extensibility**: New features can be added without modifying existing code
- **Microservice Readiness**: Each plugin can easily become a separate service

### Architectural Patterns

#### 1. Plugin Pattern
Each feature is encapsulated as a plugin that extends the BasePlugin class:
```javascript
// Encapsulates all timer-related functionality
class TimerPlugin extends BasePlugin {
  // Self-contained with clear boundaries
}
```

#### 2. Observer Pattern (Event-Driven)
Plugins communicate through events rather than direct method calls:
```javascript
// Publisher
await this.eventBus.emit('test-completed', { results, day })

// Subscriber
this.eventBus.on('test-completed', this.handleTestCompleted.bind(this))
```

#### 3. Registry Pattern
Central registration and discovery of plugins:
```javascript
// Plugins register themselves
pluginManager.registerPlugin(TestRunnerPlugin, config)

// System discovers and manages plugins
const plugins = pluginRegistry.getAllPlugins()
```

#### 4. Strategy Pattern
Different implementations can be swapped via configuration:
```javascript
// Different test execution strategies
plugins: {
  TestRunnerPlugin: { strategy: 'isolated' },  // or 'sandboxed', 'remote'
}
```

## Architecture

### Core Components

#### BasePlugin
Abstract base class that all plugins must extend. Provides:
- **Lifecycle Management**: `initialize()`, `execute()`, `cleanup()`
- **State Management**: Enable/disable functionality
- **Metadata**: Name, version, dependencies
- **Configuration**: Plugin-specific settings

```javascript
import { BasePlugin } from '../core/BasePlugin.js'

class MyPlugin extends BasePlugin {
  async initialize(context) {
    // Setup plugin with access to eventBus, config, etc.
  }
  
  async execute(input) {
    // Main plugin functionality
    return result
  }
}
```

#### EventBus
Event-driven communication system enabling decoupled plugin interactions:
- **Pub/Sub Pattern**: Plugins emit and listen to events
- **Priority Handling**: Events processed by priority order
- **One-time Subscriptions**: `once()` for single-use handlers
- **Debug Support**: Detailed logging for development

```javascript
// Subscribe to events
eventBus.on('test-completed', (data) => {
  console.log('Test results:', data.results)
}, { pluginName: 'MyPlugin', priority: 1 })

// Emit events
await eventBus.emit('test-started', { code: userCode })
```

#### PluginManager
Central orchestrator managing the entire plugin lifecycle:
- **Registration**: Register plugin classes with configuration
- **Initialization**: Load plugins in dependency order
- **Execution**: Execute plugins with error handling
- **Status Management**: Enable/disable plugins at runtime

```javascript
// Register and initialize plugins
pluginManager.registerPlugin(TestRunnerPlugin, config)
await pluginManager.initialize()

// Execute plugins
const result = await pluginManager.executePlugin('TestRunner', input)
```

#### PluginRegistry
Manages plugin metadata and discovery:
- **Registration Tracking**: All available plugins
- **Dependency Resolution**: Calculate load order
- **Status Monitoring**: Track plugin states
- **Validation**: Ensure dependencies are met

## Plugin Development

### Creating a Plugin

1. **Extend BasePlugin**:
```javascript
import { BasePlugin } from '../core/BasePlugin.js'

export class MyPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    // Plugin-specific initialization
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    this.config = context.config
    
    // Subscribe to events
    this.eventBus.on('some-event', this.handleEvent.bind(this))
  }

  async execute(input) {
    // Main functionality
    const result = this.processInput(input)
    
    // Emit events
    await this.eventBus.emit('my-plugin-complete', result)
    
    return result
  }

  async cleanup() {
    // Cleanup resources
    await super.cleanup()
  }
}
```

2. **Register the Plugin**:
```javascript
import { pluginManager } from './core/PluginManager.js'
import { MyPlugin } from './implementations/MyPlugin.js'

pluginManager.registerPlugin(MyPlugin, {
  enabled: true,
  version: '1.0.0',
  dependencies: ['SomeOtherPlugin']
})
```

3. **Configure in plugins.config.js**:
```javascript
export const pluginConfig = {
  plugins: {
    MyPlugin: {
      enabled: true,
      version: '1.0.0',
      customSetting: 'value',
      dependencies: ['SomeOtherPlugin']
    }
  }
}
```

### Plugin Lifecycle

1. **Registration**: Plugin class registered with PluginManager
2. **Dependency Resolution**: Load order calculated
3. **Initialization**: Plugin instance created and initialized
4. **Execution**: Plugin executed when needed
5. **Cleanup**: Resources cleaned up on shutdown

### Event System

#### Core Events
- `plugin-system-initialized` - System ready
- `plugin-initialized` - Individual plugin ready
- `plugin-enabled/disabled` - Plugin state changes
- `plugin-execute-start/complete/error` - Execution lifecycle

#### Application Events
- `day-changed` - User navigated to different day
- `problem-loaded` - New problem loaded
- `test-started/completed` - Test execution lifecycle
- `timer-started/stopped/reset` - Timer state changes
- `progress-updated` - Completion status changed
- `solution-shown/hidden` - Solution visibility changed

## Current Plugins

### Core Plugins (Implemented)
These plugins convert existing functionality to the plugin system:

#### TestRunnerPlugin
- **Purpose**: Execute user code against test cases
- **Dependencies**: None
- **Events**: Emits `test-started`, `test-completed`
- **Configuration**: Timeout, syntax validation

#### UserProgressPlugin
- **Purpose**: Track completion status and localStorage
- **Dependencies**: None
- **Events**: Emits `progress-updated`
- **Configuration**: Storage key, auto-save

#### TimerPlugin
- **Purpose**: Manage coding session timer
- **Dependencies**: None
- **Events**: Emits `timer-started`, `timer-stopped`, `timer-reset`
- **Configuration**: Update interval, auto-start

#### ProblemLoaderPlugin
- **Purpose**: Load and manage curriculum problems
- **Dependencies**: None
- **Events**: Emits `problem-loaded`
- **Configuration**: Data source, caching

#### UIStatePlugin
- **Purpose**: Manage UI state (current day, show solution)
- **Dependencies**: UserProgressPlugin
- **Events**: Listens to navigation events
- **Configuration**: State persistence

### Future Plugins (Planned)
These plugins will add new functionality:

#### AIAnalysisPlugin
- **Purpose**: AI-powered code analysis and feedback
- **Dependencies**: TestRunnerPlugin
- **Events**: Emits `analysis-complete`
- **Configuration**: AI provider, model settings

#### ProblemGeneratorPlugin
- **Purpose**: Generate new problems dynamically
- **Dependencies**: AIAnalysisPlugin, UserProgressPlugin
- **Events**: Emits `problem-generated`
- **Configuration**: Difficulty, topics

#### HintSystemPlugin
- **Purpose**: Progressive hints for struggling users
- **Dependencies**: AIAnalysisPlugin, TimerPlugin
- **Events**: Emits `hint-provided`
- **Configuration**: Max hints, progression rules

## Configuration

### Global Settings
```javascript
// plugins.config.js
export const pluginConfig = {
  system: {
    debug: false,           // Enable debug logging
    autoInitialize: true,   // Auto-initialize on startup
    errorHandling: 'log'    // 'throw' | 'log' | 'silent'
  }
}
```

### Plugin-Specific Settings
```javascript
plugins: {
  MyPlugin: {
    enabled: true,
    version: '1.0.0',
    customOption: 'value',
    dependencies: ['OtherPlugin']
  }
}
```

## Design Approaches & Patterns

### 1. Command Pattern Implementation
Plugins can implement command-style operations for complex workflows:

```javascript
class WorkflowPlugin extends BasePlugin {
  async execute(input) {
    const { command, ...params } = input
    
    const commands = {
      'run-full-test-suite': () => this.runFullTestSuite(params),
      'analyze-code-quality': () => this.analyzeCodeQuality(params),
      'generate-feedback': () => this.generateFeedback(params)
    }
    
    const handler = commands[command]
    if (!handler) {
      throw new Error(`Unknown command: ${command}`)
    }
    
    return await handler()
  }
}
```

### 2. Chain of Responsibility Pattern
Multiple plugins can process the same event in sequence:

```javascript
// Plugin A processes and passes along
class ValidationPlugin extends BasePlugin {
  async handleCodeSubmission(data) {
    const validationResult = this.validateCode(data.code)
    
    // Pass to next plugin in chain
    await this.eventBus.emit('code-validated', {
      ...data,
      validation: validationResult
    })
  }
}

// Plugin B continues the chain
class TestRunnerPlugin extends BasePlugin {
  async handleCodeValidated(data) {
    if (data.validation.isValid) {
      const testResults = await this.runTests(data.code)
      await this.eventBus.emit('tests-completed', { ...data, testResults })
    }
  }
}
```

### 3. State Machine Pattern
Plugins can manage complex state transitions:

```javascript
class SessionPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.state = 'idle'
    this.transitions = {
      idle: ['starting'],
      starting: ['active', 'failed'],
      active: ['paused', 'completed', 'failed'],
      paused: ['active', 'completed'],
      completed: ['idle'],
      failed: ['idle']
    }
  }

  async transition(newState, data) {
    if (!this.transitions[this.state].includes(newState)) {
      throw new Error(`Invalid transition from ${this.state} to ${newState}`)
    }
    
    const oldState = this.state
    this.state = newState
    
    await this.eventBus.emit('session-state-changed', {
      from: oldState,
      to: newState,
      data
    })
  }
}
```

### 4. Decorator Pattern
Plugins can enhance functionality of other plugins:

```javascript
class CachingDecoratorPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.cache = new Map()
    this.targetPlugin = config.targetPlugin
  }

  async execute(input) {
    const cacheKey = this.generateCacheKey(input)
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }
    
    // Delegate to target plugin
    const result = await this.pluginManager.executePlugin(this.targetPlugin, input)
    this.cache.set(cacheKey, result)
    
    return result
  }
}
```

### 5. Factory Pattern
Create plugins dynamically based on configuration:

```javascript
class PluginFactory {
  static createTestRunner(type, config) {
    const runners = {
      'javascript': () => new JavaScriptTestRunner(config),
      'python': () => new PythonTestRunner(config),
      'typescript': () => new TypeScriptTestRunner(config)
    }
    
    const factory = runners[type]
    if (!factory) {
      throw new Error(`Unknown test runner type: ${type}`)
    }
    
    return factory()
  }
}
```

## Real-World Examples

### Example 1: AI-Powered Code Analysis Plugin

```javascript
class AIAnalysisPlugin extends BasePlugin {
  async initialize(context) {
    this.eventBus = context.eventBus
    this.aiClient = new OpenAIClient(this.config.apiKey)
    
    // Listen for test completion to trigger analysis
    this.eventBus.on('test-completed', this.analyzeCode.bind(this), {
      pluginName: this.name,
      priority: 0 // Run after other handlers
    })
  }

  async analyzeCode(data) {
    if (!data.results.allPassed) {
      const analysis = await this.aiClient.analyzeFailedCode({
        code: data.code,
        testResults: data.results,
        problem: data.problem
      })
      
      await this.eventBus.emit('ai-analysis-complete', {
        day: data.day,
        analysis: {
          suggestions: analysis.suggestions,
          commonMistakes: analysis.commonMistakes,
          learningResources: analysis.resources
        }
      })
    }
  }

  async execute(input) {
    const { action, code, problem } = input
    
    switch (action) {
      case 'get-hint':
        return await this.generateHint(code, problem)
      case 'explain-error':
        return await this.explainError(code, input.error)
      case 'suggest-improvement':
        return await this.suggestImprovement(code, problem)
      default:
        throw new Error(`Unknown AI analysis action: ${action}`)
    }
  }
}
```

### Example 2: Performance Monitoring Plugin

```javascript
class PerformancePlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.metrics = new Map()
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    
    // Monitor all plugin executions
    this.eventBus.on('plugin-execute-start', this.startTiming.bind(this))
    this.eventBus.on('plugin-execute-complete', this.endTiming.bind(this))
    this.eventBus.on('plugin-execute-error', this.recordError.bind(this))
  }

  startTiming(data) {
    this.metrics.set(`${data.pluginName}-start`, performance.now())
  }

  endTiming(data) {
    const startTime = this.metrics.get(`${data.pluginName}-start`)
    if (startTime) {
      const duration = performance.now() - startTime
      this.recordMetric(data.pluginName, 'execution-time', duration)
    }
  }

  recordMetric(pluginName, metricType, value) {
    const key = `${pluginName}-${metricType}`
    const existing = this.metrics.get(key) || []
    existing.push({ value, timestamp: Date.now() })
    
    // Keep only last 100 measurements
    if (existing.length > 100) {
      existing.shift()
    }
    
    this.metrics.set(key, existing)
  }

  async execute(input) {
    const { action } = input
    
    switch (action) {
      case 'get-metrics':
        return this.getMetrics()
      case 'get-performance-report':
        return this.generatePerformanceReport()
      default:
        throw new Error(`Unknown performance action: ${action}`)
    }
  }
}
```

### Example 3: Multi-Language Support Plugin

```javascript
class InternationalizationPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.currentLanguage = config.defaultLanguage || 'en'
    this.translations = new Map()
  }

  async initialize(context) {
    this.eventBus = context.eventBus
    
    // Load translations
    await this.loadTranslations()
    
    // Listen for language changes
    this.eventBus.on('language-changed', this.handleLanguageChange.bind(this))
  }

  async loadTranslations() {
    const languages = ['en', 'es', 'fr', 'de', 'zh']
    
    for (const lang of languages) {
      try {
        const translations = await import(`../translations/${lang}.js`)
        this.translations.set(lang, translations.default)
      } catch (error) {
        console.warn(`Failed to load translations for ${lang}:`, error)
      }
    }
  }

  translate(key, params = {}) {
    const langTranslations = this.translations.get(this.currentLanguage)
    if (!langTranslations) {
      return key // Fallback to key if no translations
    }
    
    let translation = langTranslations[key] || key
    
    // Replace parameters
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{{${param}}}`, value)
    })
    
    return translation
  }

  async execute(input) {
    const { action, key, params, language } = input
    
    switch (action) {
      case 'translate':
        return this.translate(key, params)
      case 'set-language':
        return await this.setLanguage(language)
      case 'get-available-languages':
        return Array.from(this.translations.keys())
      default:
        throw new Error(`Unknown i18n action: ${action}`)
    }
  }
}
```

## Advanced Plugin Patterns

### Plugin Composition
Combine multiple plugins to create complex functionality:

```javascript
class CompositeAnalysisPlugin extends BasePlugin {
  constructor(config) {
    super(config)
    this.subPlugins = [
      'SyntaxAnalysisPlugin',
      'PerformanceAnalysisPlugin', 
      'SecurityAnalysisPlugin',
      'StyleAnalysisPlugin'
    ]
  }

  async execute(input) {
    const results = {}
    
    // Run all sub-plugins in parallel
    const promises = this.subPlugins.map(async (pluginName) => {
      try {
        const result = await this.pluginManager.executePlugin(pluginName, input)
        results[pluginName] = result
      } catch (error) {
        results[pluginName] = { error: error.message }
      }
    })
    
    await Promise.all(promises)
    
    return {
      composite: true,
      results,
      summary: this.generateSummary(results)
    }
  }
}
```

### Plugin Middleware
Create middleware-style plugins that can intercept and modify data:

```javascript
class ValidationMiddlewarePlugin extends BasePlugin {
  async initialize(context) {
    this.eventBus = context.eventBus
    
    // Intercept all test executions
    this.eventBus.on('execute-tests', this.validateBeforeExecution.bind(this), {
      pluginName: this.name,
      priority: 10 // High priority to run first
    })
  }

  async validateBeforeExecution(data) {
    // Pre-execution validation
    const validation = this.validateInput(data)
    
    if (!validation.isValid) {
      // Prevent execution by emitting error
      await this.eventBus.emit('test-error', {
        error: validation.error,
        code: data.code
      })
      return false // Stop event propagation
    }
    
    // Modify data if needed
    data.code = this.sanitizeCode(data.code)
    return true // Continue execution
  }
}
```

## Best Practices

### Plugin Design
- **Single Responsibility**: Each plugin should have one clear purpose
- **Stateless**: Avoid internal state when possible
- **Event-Driven**: Communicate via events, not direct calls
- **Error Handling**: Gracefully handle and report errors
- **Configuration**: Make behavior configurable
- **Testability**: Design plugins to be easily unit tested
- **Documentation**: Provide clear API documentation for each plugin

### Event Handling
- **Descriptive Names**: Use clear, consistent event names
- **Data Structure**: Include relevant context in event data
- **Error Propagation**: Handle event handler errors appropriately
- **Performance**: Avoid heavy operations in event handlers
- **Event Versioning**: Consider versioning for event data structures
- **Idempotency**: Ensure event handlers can be called multiple times safely

### Dependencies
- **Minimal**: Keep dependencies to minimum necessary
- **Explicit**: Clearly declare all dependencies
- **Optional**: Design for graceful degradation when dependencies unavailable
- **Circular Detection**: Avoid circular dependencies between plugins
- **Version Compatibility**: Ensure compatible versions of dependent plugins

## Debugging

### Debug Mode
Enable debug logging in configuration:
```javascript
system: { debug: true }
```

### Plugin Status
Check plugin status:
```javascript
const status = pluginManager.getPluginStatus()
console.log('Plugin Status:', status)
```

### Event Monitoring
Monitor event flow:
```javascript
const stats = pluginManager.getEventBus().getEventStats()
console.log('Event Statistics:', stats)
```

## Migration Path

### Phase 1: Infrastructure ✅
- Core plugin system components
- Event bus and registry
- Configuration system

### Phase 2: Core Plugin Conversion (Current)
- Convert existing functionality to plugins
- Maintain backward compatibility
- Test plugin interactions

### Phase 3: New Feature Plugins
- Add AI integration plugins
- Implement advanced features
- Expand plugin ecosystem

### Phase 4: Microservice Transition
- Convert plugins to REST services
- Implement service communication
- Deploy distributed architecture

## Directory Structure
```
src/plugins/
├── README.md                    # This documentation
├── core/                        # Core plugin system
│   ├── BasePlugin.js           # Abstract plugin class
│   ├── EventBus.js             # Event communication
│   ├── PluginManager.js        # Central orchestrator
│   └── PluginRegistry.js       # Plugin tracking
├── config/                      # Configuration
│   └── plugins.config.js       # Plugin settings
├── implementations/             # Actual plugins
│   ├── TestRunnerPlugin.js     # Test execution
│   ├── UserProgressPlugin.js   # Progress tracking
│   ├── TimerPlugin.js          # Timer functionality
│   ├── ProblemLoaderPlugin.js  # Problem management
│   └── UIStatePlugin.js        # UI state management
└── __tests__/                   # Plugin tests
    ├── core/                   # Core system tests
    └── implementations/        # Plugin-specific tests
```

This plugin system provides the foundation for a scalable, maintainable architecture that can easily transition to microservices as the application grows.
