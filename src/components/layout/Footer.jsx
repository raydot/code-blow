import React from 'react'

const Footer = ({ completedDays }) => {
  return (
    <>
      {/* Completion Message */}
      {completedDays.size === 30 && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-bold text-green-800 mb-2">
            🎉 Congratulations!
          </h3>
          <p className="text-green-700">
            You've completed all 30 days! You're ready to tackle technical
            interviews and coding challenges. Your JavaScript fundamentals are
            solid, and you've built the muscle memory for common patterns.
          </p>
          <p className="text-green-700 mt-2 text-sm">
            Pro tip: Keep this app handy for quick refreshers, and remember -
            you've got the skills, trust your instincts!
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 text-center text-gray-600 text-sm">
        <p>
          Built for frontend developers who want to nail coding interviews
          without the leetcode grind.
        </p>
        <p className="mt-1">
          30 minutes a day × 30 days = Interview confidence
        </p>
      </div>
    </>
  )
}

export default Footer
