import React from 'react'

const Navigation = ({ 
  currentDay, 
  setCurrentDay, 
  completedDays, 
  setCompletedDays,
  markComplete,
  markIncomplete 
}) => {
  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex gap-3">
        <button
          onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
          disabled={currentDay === 1}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
          disabled={currentDay === 30}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="flex gap-3">
        {!completedDays.has(currentDay) && (
          <button
            onClick={markComplete}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Mark Complete
          </button>
        )}
        {completedDays.has(currentDay) && (
          <button
            onClick={markIncomplete}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
          >
            Mark Incomplete
          </button>
        )}
      </div>
    </div>
  )
}

export default Navigation
