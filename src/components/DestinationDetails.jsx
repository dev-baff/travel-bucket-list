import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// Destination details page showing country info, photos and add to bucket list button
function DestinationDetails({ addToBucketList }) {
  const { id } = useParams()
  const [country, setCountry] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  // Track which photo is selected for lightbox view
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Fetch country data from REST Countries API using country code
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}`
        )
        if (!response.ok) throw new Error('Country not found')
        const data = await response.json()
        setCountry(data[0])
        fetchPhotos(data[0].name.common)
      } catch (err) {
        setError('Could not load country details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [id])

  // Fetch photos from Unsplash API using country name
  const fetchPhotos = async (countryName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${countryName}&per_page=3&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
      )
      const data = await response.json()
      setPhotos(data.results)
    } catch (err) {
      // If photos fail to load, just show empty gallery
      setPhotos([])
    }
  }

  // Handle adding country to bucket list
  const handleAddToBucketList = () => {
    addToBucketList(country)
    setAdded(true)
  }

  // Get currency name safely
  const getCurrency = (country) => {
    if (!country.currencies) return 'N/A'
    const currencies = Object.values(country.currencies)
    return `${currencies[0].name} (${currencies[0].symbol})`
  }

  // Get languages safely
  const getLanguages = (country) => {
    if (!country.languages) return 'N/A'
    return Object.values(country.languages).join(', ')
  }

  // Get population in readable format
  const getPopulation = (population) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(0)} million`
    }
    return population.toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container mx-auto max-w-4xl">

        {/* Back to search link */}
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1 mb-6"
        >
          ← Back to Search
        </Link>

        {/* Country info card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Country flag */}
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-32 h-24 object-cover rounded shadow-sm"
            />

            {/* Country details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {country.name.common.toUpperCase()}
              </h1>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <p className="text-gray-400">Capital:</p>
                <p className="text-gray-800 font-medium">
                  {country.capital ? country.capital[0] : 'N/A'}
                </p>
                <p className="text-gray-400">Population:</p>
                <p className="text-gray-800 font-medium">
                  {getPopulation(country.population)}
                </p>
                <p className="text-gray-400">Currency:</p>
                <p className="text-gray-800 font-medium">
                  {getCurrency(country)}
                </p>
                <p className="text-gray-400">Languages:</p>
                <p className="text-gray-800 font-medium">
                  {getLanguages(country)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Destination photos section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Destination Photos
        </h2>

        {/* Photo gallery grid - click to open lightbox */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {photos.map((photo, index) => (
              <img
                key={photo.id}
                src={photo.urls.regular}
                alt={`${country.name.common} photo ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedPhoto(photo.urls.full)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <p className="text-gray-400">No photo available</p>
              </div>
            ))}
          </div>
        )}

        {/* Add to bucket list button */}
        <div className="flex justify-center">
          <button
            onClick={handleAddToBucketList}
            disabled={added}
            className={`px-8 py-3 rounded-full text-white font-semibold transition-colors duration-300 ${
              added
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {added ? '✓ Added to Bucket List' : '+ Add to My Bucket List'}
          </button>
        </div>

      </div>

      {/* Lightbox overlay - shows when a photo is clicked */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-6 text-white text-4xl font-bold hover:text-gray-300"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>

          {/* Full size photo */}
          <img
            src={selectedPhoto}
            alt="Full size destination photo"
            className="max-w-full max-h-screen rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  )
}

export default DestinationDetails