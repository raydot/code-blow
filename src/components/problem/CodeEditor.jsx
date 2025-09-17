import React from 'react'
import { Play } from 'lucide-react'

const CodeEditor = ({ 
  userCode, 
  setUserCode, 
  isRunning, 
  startTimer, 
  stopTimer, 
  resetTimer 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Your Solution</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={isRunning ? stopTimer : startTimer}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
              isRunning
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Stop' : 'Start'} Timer
          </button>
          <button
            onClick={resetTimer}
            className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code Editor
          </label>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your solution here..."
            spellCheck={false}
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="text-sm text-gray-500">
            Lines: {userCode.split('\n').length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
