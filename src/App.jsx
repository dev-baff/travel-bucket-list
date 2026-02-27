import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import DestinationDetails from './components/DestinationDetails'
import BucketList from './components/BucketList'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'

function App() {
  // Load bucket list from localStorage on first render
  const [bucketList, setBucketList] = useState(() => {
    const saved = localStorage.getItem('bucketList')
    return saved ? JSON.parse(saved) : []
  })

  // Load dark mode preference from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // Save bucket list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bucketList', JSON.stringify(bucketList))
  }, [bucketList])

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    // Apply dark mode class to the root html element
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Add a country to the bucket list if it doesn't already exist
  const addToBucketList = (country) => {
    if (!bucketList.find((item) => item.cca3 === country.cca3)) {
      setBucketList([...bucketList, {
        ...country,
        visited: false,
        expenses: { flight: 0, accommodation: 0, activities: 0 }
      }])
    }
  }

  // Remove a country from the bucket list by its unique code
  const removeFromBucketList = (cca3) => {
    setBucketList(bucketList.filter((item) => item.cca3 !== cca3))
  }

  // Toggle the visited status of a destination
  const toggleVisited = (cca3) => {
    setBucketList(bucketList.map((item) =>
      item.cca3 === cca3 ? { ...item, visited: !item.visited } : item
    ))
  }

  // Update the expenses for a specific destination
  const updateExpenses = (cca3, expenses) => {
    setBucketList(bucketList.map((item) =>
      item.cca3 === cca3 ? { ...item, expenses } : item
    ))
  }

  return (
    <Router>
      {/* Apply dark mode class to root div */}
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header shown on all pages */}
        <Header
          bucketListCount={bucketList.length}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main content grows to fill available space */}
        <main className="flex-grow">
          <Routes>
            {/* Home page - search and browse countries */}
            <Route path="/" element={<HomePage addToBucketList={addToBucketList} darkMode={darkMode} />} />
            {/* Destination detail page - view country info and photos */}
            <Route path="/destination/:id" element={<DestinationDetails addToBucketList={addToBucketList} darkMode={darkMode} />} />
            {/* Bucket list page - manage saved destinations and expenses */}
            <Route path="/bucket-list" element={<BucketList bucketList={bucketList} removeFromBucketList={removeFromBucketList} toggleVisited={toggleVisited} updateExpenses={updateExpenses} darkMode={darkMode} />} />
          </Routes>
        </main>

        {/* Footer shown on all pages */}
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  )
}

export default App