/**
 * EventBus - Handles event-driven communication between plugins
 * Provides pub/sub pattern for decoupled plugin interactions
 */

export class EventBus {
  constructor() {
    this.events = new Map()
    this.debugMode = false
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function
   * @param {Object} options - Subscription options
   */
  on(event, handler, options = {}) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    const subscription = {
      handler,
      once: options.once || false,
      priority: options.priority || 0,
      pluginName: options.pluginName || 'unknown'
    }

    this.events.get(event).push(subscription)
    
    // Sort by priority (higher priority first)
    this.events.get(event).sort((a, b) => b.priority - a.priority)

    if (this.debugMode) {
      console.log(`[EventBus] ${subscription.pluginName} subscribed to '${event}'`)
    }
  }

  /**
   * Subscribe to an event once
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function
   * @param {Object} options - Subscription options
   */
  once(event, handler, options = {}) {
    this.on(event, handler, { ...options, once: true })
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {Function} handler - Event handler function to remove
   */
  off(event, handler) {
    if (!this.events.has(event)) return

    const handlers = this.events.get(event)
    const index = handlers.findIndex(sub => sub.handler === handler)
    
    if (index !== -1) {
      const removed = handlers.splice(index, 1)[0]
      if (this.debugMode) {
        console.log(`[EventBus] ${removed.pluginName} unsubscribed from '${event}'`)
      }
    }

    // Clean up empty event arrays
    if (handlers.length === 0) {
      this.events.delete(event)
    }
  }

  /**
   * Emit an event to all subscribers
   * @param {string} event - Event name
   * @param {*} data - Event data
   * @param {Object} options - Emission options
   */
  async emit(event, data, options = {}) {
    if (!this.events.has(event)) {
      if (this.debugMode) {
        console.log(`[EventBus] No subscribers for event '${event}'`)
      }
      return
    }

    const handlers = [...this.events.get(event)] // Copy to avoid modification during iteration
    const results = []

    if (this.debugMode) {
      console.log(`[EventBus] Emitting '${event}' to ${handlers.length} subscribers`, data)
    }

    for (const subscription of handlers) {
      try {
        const result = await subscription.handler(data, event)
        results.push(result)

        // Remove one-time subscriptions
        if (subscription.once) {
          this.off(event, subscription.handler)
        }
      } catch (error) {
        console.error(`[EventBus] Error in event handler for '${event}':`, error)
        if (options.throwOnError) {
          throw error
        }
      }
    }

    return results
  }

  /**
   * Emit event synchronously (not recommended for heavy operations)
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emitSync(event, data) {
    if (!this.events.has(event)) return

    const handlers = [...this.events.get(event)]
    const results = []

    for (const subscription of handlers) {
      try {
        const result = subscription.handler(data, event)
        results.push(result)

        if (subscription.once) {
          this.off(event, subscription.handler)
        }
      } catch (error) {
        console.error(`[EventBus] Error in sync event handler for '${event}':`, error)
      }
    }

    return results
  }

  /**
   * Remove all subscribers for an event
   * @param {string} event - Event name
   */
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event)
    } else {
      this.events.clear()
    }
  }

  /**
   * Get list of all events with subscriber counts
   */
  getEventStats() {
    const stats = {}
    for (const [event, handlers] of this.events) {
      stats[event] = {
        subscriberCount: handlers.length,
        subscribers: handlers.map(h => h.pluginName)
      }
    }
    return stats
  }

  /**
   * Enable/disable debug logging
   * @param {boolean} enabled - Debug mode enabled
   */
  setDebugMode(enabled) {
    this.debugMode = enabled
  }
}
