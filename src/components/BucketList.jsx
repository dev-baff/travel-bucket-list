import BucketListItem from './BucketListItem'

// Bucket list page showing all saved destinations with expenses and stats
function BucketList({ bucketList, removeFromBucketList, toggleVisited, updateExpenses, darkMode }) {

  // Calculate total budget across all destinations
  const totalBudget = bucketList.reduce((total, item) => {
    return total + item.expenses.flight + item.expenses.accommodation + item.expenses.activities
  }, 0)

  // Count visited and not visited destinations
  const visitedCount = bucketList.filter((item) => item.visited).length
  const notVisitedCount = bucketList.filter((item) => !item.visited).length

  return (
    <div className={`min-h-screen px-4 py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-4xl">

        {/* Page title */}
        <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          My Travel Bucket List 🌍
        </h1>

        {/* Summary stats card */}
        <div className={`rounded-lg border shadow-sm p-6 mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {bucketList.length} Destinations
            </p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Total Budget: ${totalBudget.toLocaleString()}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-green-500 font-semibold">✓ {visitedCount} Visited</p>
              <span className="text-gray-400">|</span>
              <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ○ {notVisitedCount} Not Visited
              </p>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {bucketList.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl mb-4">Your bucket list is empty!</p>
            <p className="text-gray-400">Search for countries and add them to your bucket list.</p>
          </div>
        )}

        {/* Bucket list items */}
        <div className="flex flex-col gap-6">
          {bucketList.map((item) => (
            <BucketListItem
              key={item.cca3}
              item={item}
              removeFromBucketList={removeFromBucketList}
              toggleVisited={toggleVisited}
              updateExpenses={updateExpenses}
              darkMode={darkMode}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default BucketList