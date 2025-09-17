import React from 'react'
import { CheckCircle, BookOpen, Code, Zap } from 'lucide-react'

const ProblemDescription = ({ 
  currentProblem, 
  currentDay, 
  completedDays, 
  weekColors 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              weekColors[currentProblem.week]
            }`}
          />
          <span className="text-sm font-medium text-gray-500">
            Week {currentProblem.week} • Day {currentDay}
          </span>
        </div>
        {completedDays.has(currentDay) && (
          <CheckCircle className="w-5 h-5 text-green-600" />
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {currentProblem.title}
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Problem
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {currentProblem.problem}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Code className="w-4 h-4" />
            Example
          </h3>
          <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
            <code>{currentProblem.example}</code>
          </pre>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Focus
          </h3>
          <p className="text-gray-600 text-sm italic">
            {currentProblem.focus}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProblemDescription
