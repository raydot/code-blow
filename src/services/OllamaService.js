/**
 * OllamaService - Basic connection and testing for local Ollama instance
 * 
 * This is the first small piece of AI integration - just connection testing
 */

export class OllamaService {
  constructor() {
    this.baseUrl = 'http://localhost:11434'
    this.model = 'codellama:7b-instruct'
  }

  /**
   * Test if Ollama is running and accessible
   */
  async checkConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`)
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Ollama connected successfully')
        console.log('Available models:', data.models?.map(m => m.name) || [])
        return { connected: true, models: data.models || [] }
      } else {
        console.log('❌ Ollama responded but with error:', response.status)
        return { connected: false, error: `HTTP ${response.status}` }
      }
    } catch (error) {
      console.log('❌ Ollama connection failed:', error.message)
      return { connected: false, error: error.message }
    }
  }

  /**
   * Test basic AI query - simple "hello world" test
   */
  async testQuery() {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          prompt: 'Write a simple JavaScript function that adds two numbers.',
          stream: false,
          options: {
            temperature: 0.3,
            max_tokens: 200
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Ollama query failed: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ Ollama query successful')
      console.log('AI Response:', data.response)
      
      return { 
        success: true, 
        response: data.response,
        model: data.model,
        totalDuration: data.total_duration
      }
    } catch (error) {
      console.log('❌ Ollama query failed:', error.message)
      return { success: false, error: error.message }
    }
  }

  /**
   * Get model info
   */
  async getModelInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/api/show`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.model })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Raw Ollama model response:', data) // Debug log
        
        // Calculate approximate size from parameter count
        const parameterCount = data.model_info?.['general.parameter_count'] || 0
        const approximateSize = Math.round(parameterCount * 4 / (1024 * 1024 * 1024) * 10) / 10 // 4 bytes per param, convert to GB
        
        return { 
          success: true, 
          modelInfo: {
            name: data.name || this.model,
            size: approximateSize,
            parameterCount: parameterCount,
            format: data.details?.format || 'gguf',
            family: data.details?.family || 'llama',
            quantization: data.details?.quantization_level || 'Q4_0'
          }
        }
      } else {
        return { success: false, error: `HTTP ${response.status}` }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Export a singleton instance for easy testing
export const ollamaService = new OllamaService()
