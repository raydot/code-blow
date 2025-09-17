import React from 'react'
import { CheckCircle } from 'lucide-react'

const TestResults = ({ testResults }) => {
  if (!testResults) return null

  return (
    <div className="mt-4">
      {testResults.error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-medium text-red-800 mb-2">Error</h4>
          <p className="text-red-700 text-sm">
            {testResults.error}
          </p>
        </div>
      ) : (
        <div
          className={`border rounded-lg p-4 ${
            testResults.allPassed
              ? 'bg-green-50 border-green-200'
              : 'bg-yellow-50 border-yellow-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4
              className={`font-medium ${
                testResults.allPassed
                  ? 'text-green-800'
                  : 'text-yellow-800'
              }`}
            >
              Test Results
            </h4>
            <span
              className={`text-sm font-medium ${
                testResults.allPassed
                  ? 'text-green-700'
                  : 'text-yellow-700'
              }`}
            >
              {testResults.passedCount}/{testResults.totalCount}{' '}
              passed
            </span>
          </div>

          {testResults.allPassed ? (
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                All tests passed! Great job!
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              {testResults.results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 text-sm ${
                    result.passed
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {result.passed ? (
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full bg-red-500"></div>
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{result.name}</div>
                    {!result.passed && (
                      <div className="mt-1 text-xs">
                        {result.error ? (
                          <span className="text-red-600">
                            Error: {result.error}
                          </span>
                        ) : (
                          <div>
                            <div>
                              Expected:{' '}
                              {JSON.stringify(result.expected)}
                            </div>
                            <div>
                              Got: {JSON.stringify(result.actual)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TestResults
