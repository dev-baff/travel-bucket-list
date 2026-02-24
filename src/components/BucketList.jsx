import { useState } from 'react'
import BucketListItem from './BucketListItem'

// Bucket list page showing all saved destinations with expenses and stats
function BucketList({ bucketList, removeFromBucketList, toggleVisited, updateExpenses }) {

  // Calculate total budget across all destinations
  const totalBudget = bucketList.reduce((total, item) => {
    return total + item.expenses.flight + item.expenses.accommodation + item.expenses.activities
  }, 0)

  // Count visited and not visited destinations
  const visitedCount = bucketList.filter((item) => item.visited).length
  const notVisitedCount = bucketList.filter((item) => !item.visited).length

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container mx-auto max-w-4xl">

        {/* Page title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          My Travel Bucket List 🌍
        </h1>

        {/* Summary stats card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Total destinations */}
            <p className="font-semibold text-gray-800">
              {bucketList.length} Destinations
            </p>

            {/* Total budget */}
            <p className="font-semibold text-gray-800">
              Total Budget: ${totalBudget.toLocaleString()}
            </p>

            {/* Visited and not visited counts */}
            <div className="flex items-center gap-3">
              <p className="text-green-500 font-semibold">
                ✓ {visitedCount} Visited
              </p>
              <span className="text-gray-300">|</span>
              <p className="text-gray-600 font-semibold">
                ○ {notVisitedCount} Not Visited
              </p>
            </div>
          </div>
        </div>

        {/* Empty state message */}
        {bucketList.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl mb-4">
              Your bucket list is empty!
            </p>
            <p className="text-gray-400">
              Search for countries and add them to your bucket list.
            </p>
          </div>
        )}

        {/* List of bucket list items */}
        <div className="flex flex-col gap-6">
          {bucketList.map((item) => (
            <BucketListItem
              key={item.cca3}
              item={item}
              removeFromBucketList={removeFromBucketList}
              toggleVisited={toggleVisited}
              updateExpenses={updateExpenses}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default BucketList