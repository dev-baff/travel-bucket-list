import { useState } from 'react'

// Individual bucket list item showing country info, expenses and action buttons
function BucketListItem({ item, removeFromBucketList, toggleVisited, updateExpenses }) {
  // Local state for editing expenses
  const [expenses, setExpenses] = useState(item.expenses)
  const [editing, setEditing] = useState(false)

  // Calculate total expenses for this destination
  const total = expenses.flight + expenses.accommodation + expenses.activities

  // Handle expense input changes
  const handleExpenseChange = (e) => {
    setExpenses({ ...expenses, [e.target.name]: Number(e.target.value) })
  }

  // Save updated expenses to parent state
  const handleSaveExpenses = () => {
    updateExpenses(item.cca3, expenses)
    setEditing(false)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">

        {/* Left side - flag, name and expenses */}
        <div className="flex-1">
          {/* Country flag and name */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={item.flags.png}
              alt={`${item.name.common} flag`}
              className="w-12 h-8 object-cover rounded shadow-sm"
            />
            <h2 className="text-xl font-bold text-gray-800">
              {item.name.common}
            </h2>
          </div>

          {/* Expenses breakdown */}
          <div className="ml-1">
            <p className="font-semibold text-gray-800 mb-2">Expenses:</p>

            {editing ? (
              // Editable expense inputs
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center gap-4">
                  <label className="text-gray-400 w-32">Flight:</label>
                  <input
                    type="number"
                    name="flight"
                    value={expenses.flight}
                    onChange={handleExpenseChange}
                    className="border border-gray-200 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-gray-400 w-32">Accommodation:</label>
                  <input
                    type="number"
                    name="accommodation"
                    value={expenses.accommodation}
                    onChange={handleExpenseChange}
                    className="border border-gray-200 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-gray-400 w-32">Activities:</label>
                  <input
                    type="number"
                    name="activities"
                    value={expenses.activities}
                    onChange={handleExpenseChange}
                    className="border border-gray-200 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <button
                  onClick={handleSaveExpenses}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded transition-colors duration-300 w-fit"
                >
                  Save
                </button>
              </div>
            ) : (
              // Display expenses
              <div className="mb-3">
                <div className="flex gap-8 mb-1">
                  <p className="text-gray-400 w-32">Flight:</p>
                  <p className="text-gray-800">${expenses.flight.toLocaleString()}</p>
                </div>
                <div className="flex gap-8 mb-1">
                  <p className="text-gray-400 w-32">Accommodation:</p>
                  <p className="text-gray-800">${expenses.accommodation.toLocaleString()}</p>
                </div>
                <div className="flex gap-8 mb-1">
                  <p className="text-gray-400 w-32">Activities:</p>
                  <p className="text-gray-800">${expenses.activities.toLocaleString()}</p>
                </div>
                <hr className="my-2 w-64" />
                <div className="flex gap-8">
                  <p className="text-gray-800 w-32">Total:</p>
                  <p className="font-bold text-gray-800">${total.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-2 text-blue-500 hover:text-blue-700 text-sm underline"
                >
                  Edit Expenses
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side - visited badge and action buttons */}
        <div className="flex flex-col items-end gap-4">
          {/* Visited/Not Visited badge */}
          <span className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
            item.visited ? 'bg-green-500' : 'bg-gray-400'
          }`}>
            {item.visited ? '✓ Visited' : '○ Not Visited'}
          </span>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => toggleVisited(item.cca3)}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-300"
            >
              Mark as Visited
            </button>
            <button
              onClick={() => removeFromBucketList(item.cca3)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors duration-300"
            >
              ✕ Remove
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BucketListItem