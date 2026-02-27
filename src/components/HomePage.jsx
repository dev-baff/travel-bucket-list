import { useState, useEffect } from 'react'
import CountryCard from './CountryCard'

// List of popular destinations to show by default
const POPULAR_COUNTRIES = ['Japan', 'France', 'Brazil', 'Australia', 'Egypt', 'Italy', 'Ghana', 'Canada']

// Home page component with search bar and country cards
function HomePage({ addToBucketList, darkMode }) {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [popularCountries, setPopularCountries] = useState([])
  const [popularLoading, setPopularLoading] = useState(true)

  // Fetch popular destinations on page load
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const results = await Promise.all(
          POPULAR_COUNTRIES.map((name) =>
            fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
              .then((res) => res.json())
              .then((data) => data[0])
          )
        )
        setPopularCountries(results)
      } catch (err) {
        console.error('Failed to load popular destinations')
      } finally {
        setPopularLoading(false)
      }
    }

    fetchPopular()
  }, [])

  // Fetch countries from REST Countries API based on search query
  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${query}`)
      if (!response.ok) throw new Error('No countries found')
      const data = await response.json()
      setCountries(data)
    } catch (err) {
      setError('No countries found. Please try a different search.')
      setCountries([])
    } finally {
      setLoading(false)
    }
  }

  // Allow user to press Enter to search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-16 px-4 text-center`}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Where do you want to go?
        </h1>
        <p className="text-gray-400 font-medium mb-8">
          Search for your dream destinations
        </p>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search countries..."
            className={`w-full md:w-3/4 px-6 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-800'
            }`}
          />
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Search results */}
        {searched && (
          <>
            {loading && <p className="text-center text-gray-400 text-lg">Loading...</p>}
            {error && <p className="text-center text-red-500 text-lg">{error}</p>}
            {!loading && !error && countries.length > 0 && (
              <>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Search Results ({countries.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {countries.map((country) => (
                    <CountryCard
                      key={country.cca3}
                      country={country}
                      addToBucketList={addToBucketList}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </>
            )}
            {!loading && !error && countries.length === 0 && (
              <p className="text-center text-gray-400 text-lg">
                No countries found. Try searching for something else.
              </p>
            )}
          </>
        )}

        {/* Popular destinations */}
        {!searched && (
          <>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Popular Destinations
            </h2>
            {popularLoading && (
              <p className="text-center text-gray-400 text-lg">
                Loading popular destinations...
              </p>
            )}
            {!popularLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularCountries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    addToBucketList={addToBucketList}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage