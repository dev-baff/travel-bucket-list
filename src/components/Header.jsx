import { Link } from 'react-router-dom'
import { useState } from 'react'

// Header component shown on all pages with navigation links
function Header({ bucketListCount }) {
  // Track whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and app name */}
        <Link to="/" className="flex items-center gap-2 font-bold text-gray-800 text-lg">
          🗺️ Travel Bucket List
        </Link>

        {/* Desktop navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <span className="text-gray-300">|</span>
          {/* Show count of saved destinations if any */}
          <Link to="/bucket-list" className="text-cyan-500 font-medium hover:text-cyan-700">
            My Bucket List {bucketListCount > 0 && `(${bucketListCount})`}
          </Link>
        </nav>

        {/* Hamburger button - only visible on mobile */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown menu - only shows when hamburger is clicked */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3">
          <Link to="/" className="text-gray-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/bucket-list" className="text-cyan-500 font-medium" onClick={() => setMenuOpen(false)}>
            My Bucket List {bucketListCount > 0 && `(${bucketListCount})`}
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header