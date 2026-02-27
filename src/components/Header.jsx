import { Link } from 'react-router-dom'
import { useState } from 'react'

// Header component shown on all pages with navigation links and dark mode toggle
function Header({ bucketListCount, darkMode, setDarkMode }) {
  // Track whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm sticky top-0 z-10 border-b`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and app name */}
        <Link to="/" className={`flex items-center gap-2 font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          🗺️ Travel Bucket List
        </Link>

        {/* Desktop navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            Home
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/bucket-list" className="text-cyan-500 font-medium hover:text-cyan-400">
            My Bucket List {bucketListCount > 0 && `(${bucketListCount})`}
          </Link>

          {/* Dark mode toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
              darkMode
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>

        {/* Mobile hamburger and dark mode toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
              darkMode
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-800 text-white'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 flex flex-col gap-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Link
            to="/"
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/bucket-list"
            className="text-cyan-500 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            My Bucket List {bucketListCount > 0 && `(${bucketListCount})`}
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header