// Footer component shown on all pages
function Footer({ darkMode }) {
  return (
    <footer className={`${darkMode ? 'bg-gray-800 border-gray-700 ' : 'bg-white'} border-t mt-auto py-6 px-4`}>
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo and tagline */}
        <div className="text-center md:text-left">
          <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            🗺️ Travel Bucket List
          </p>
          <p className="text-gray-400 text-sm">Plan your dream destinations</p>
        </div>

        {/* Middle links */}
        <div className="flex gap-6">
          <a href="/" className="text-gray-400 hover:text-blue-500 text-sm transition-colors duration-300">
            Home
          </a>
          <a href="/bucket-list" className="text-gray-400 hover:text-blue-500 text-sm transition-colors duration-300">
            My Bucket List
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Travel Bucket List. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer