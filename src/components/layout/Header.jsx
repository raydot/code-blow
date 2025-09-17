import React from 'react'
import { Target, CheckCircle, Clock } from 'lucide-react'

const Header = ({ 
  currentDay, 
  completedDays, 
  timer, 
  formatTime,
  curriculum,
  weekColors,
  getWeekName 
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        30 Days of Coding Practice
      </h1>
      <p className="text-gray-600 mb-4">
        Build your JavaScript fundamentals, one problem at a time
      </p>

      {/* Progress Overview */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">
            Day {currentDay} of 30
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium">
            {completedDays.size} completed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium">{formatTime(timer)}</span>
        </div>
      </div>

      {/* Week Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4].map((week) => {
          const weekDays = Object.values(curriculum).filter(
            (p) => p.week === week
          )
          const weekCompleted = weekDays.filter((p) =>
            completedDays.has(
              parseInt(
                Object.keys(curriculum).find((key) => curriculum[key] === p)
              )
            )
          ).length

          return (
            <div key={week} className="text-center">
              <div
                className={`w-16 h-2 rounded-full ${weekColors[week]} mb-1 relative overflow-hidden`}
              >
                <div
                  className="h-full bg-white bg-opacity-30 transition-all duration-300"
                  style={{
                    width: `${
                      100 - (weekCompleted / weekDays.length) * 100
                    }%`
                  }}
                />
              </div>
              <div className="text-xs text-gray-600">
                {getWeekName(week)}
              </div>
              <div className="text-xs font-medium">
                {weekCompleted}/{weekDays.length}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Header
