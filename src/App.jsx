import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import DestinationDetails from './components/DestinationDetails'
import BucketList from './components/BucketList'
import { useState, useEffect } from 'react'

function App() {
  // Load bucket list from localStorage on first render
  const [bucketList, setBucketList] = useState(() => {
    const saved = localStorage.getItem('bucketList')
    return saved ? JSON.parse(saved) : []
  })

  // Save bucket list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bucketList', JSON.stringify(bucketList))
  }, [bucketList])

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
      {/* Header is shown on all pages */}
      <Header bucketListCount={bucketList.length} />
      <Routes>
        {/* Home page - search and browse countries */}
        <Route path="/" element={<HomePage addToBucketList={addToBucketList} />} />
        {/* Destination detail page - view country info and photos */}
        <Route path="/destination/:id" element={<DestinationDetails addToBucketList={addToBucketList} />} />
        {/* Bucket list page - manage saved destinations and expenses */}
        <Route path="/bucket-list" element={<BucketList bucketList={bucketList} removeFromBucketList={removeFromBucketList} toggleVisited={toggleVisited} updateExpenses={updateExpenses} />} />
      </Routes>
    </Router>
  )
}

export default App