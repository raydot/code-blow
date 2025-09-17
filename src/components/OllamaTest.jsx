/**
 * OllamaTest - Simple component to test Ollama connection
 *
 * This is just for testing - will be removed once AI integration is complete
 */

import React, { useState } from 'react'
import { ollamaService } from '../services/OllamaService.js'

export function OllamaTest() {
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [modelInfo, setModelInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    const result = await ollamaService.checkConnection()
    setConnectionStatus(result)
    setLoading(false)
  }

  const testQuery = async () => {
    setLoading(true)
    const result = await ollamaService.testQuery()
    setTestResult(result)
    setLoading(false)
  }

  const getModelInfo = async () => {
    setLoading(true)
    const result = await ollamaService.getModelInfo()
    setModelInfo(result)
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🤖 Ollama Connection Test</h2>

      <div className="space-y-4">
        {/* Connection Test */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Connection Test</h3>
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>

          {connectionStatus && (
            <div
              className={`mt-2 p-2 rounded ${
                connectionStatus.connected ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <p
                className={
                  connectionStatus.connected ? 'text-green-800' : 'text-red-800'
                }
              >
                {connectionStatus.connected
                  ? '✅ Connected!'
                  : `❌ Failed: ${connectionStatus.error}`}
              </p>
              {connectionStatus.models && (
                <p className="text-sm mt-1">
                  Models:{' '}
                  {connectionStatus.models.map((m) => m.name).join(', ')}
                </p>
              )}
            </div>
          )}
        </div>

        {/* AI Query Test */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">AI Query Test</h3>
          <button
            onClick={testQuery}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Querying AI...' : 'Test AI Query'}
          </button>

          {testResult && (
            <div
              className={`mt-2 p-2 rounded ${
                testResult.success ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {testResult.success ? (
                <div className="text-green-800">
                  <p className="font-semibold">✅ AI Query Successful!</p>
                  <p className="text-sm mt-1">Model: {testResult.model}</p>
                  {testResult.totalDuration && (
                    <p className="text-sm">
                      Duration: {Math.round(testResult.totalDuration / 1000000)}
                      ms
                    </p>
                  )}
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                    <strong>AI Response:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {testResult.response}
                    </pre>
                  </div>
                </div>
              ) : (
                <p className="text-red-800">❌ Failed: {testResult.error}</p>
              )}
            </div>
          )}
        </div>

        {/* Model Info */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Model Information</h3>
          <button
            onClick={getModelInfo}
            disabled={loading}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Model Info'}
          </button>

          {modelInfo && (
            <div
              className={`mt-2 p-2 rounded ${
                modelInfo.success ? 'bg-blue-100' : 'bg-red-100'
              }`}
            >
              {modelInfo.success ? (
                <div className="text-blue-800">
                  <p className="font-semibold">📊 Model Info:</p>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>
                      <strong>Name:</strong> {modelInfo.modelInfo.name}
                    </li>
                    <li>
                      <strong>Size:</strong> {modelInfo.modelInfo.size}GB
                    </li>
                    <li>
                      <strong>Parameters:</strong> {(modelInfo.modelInfo.parameterCount / 1000000000).toFixed(1)}B
                    </li>
                    <li>
                      <strong>Quantization:</strong> {modelInfo.modelInfo.quantization}
                    </li>
                    <li>
                      <strong>Format:</strong> {modelInfo.modelInfo.format}
                    </li>
                    <li>
                      <strong>Family:</strong> {modelInfo.modelInfo.family}
                    </li>
                  </ul>
                </div>
              ) : (
                <p className="text-red-800">❌ Failed: {modelInfo.error}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> This is a temporary test component. Once AI
          integration is complete, this will be removed and replaced with the
          actual AI features.
        </p>
      </div>
    </div>
  )
}

export default OllamaTest
