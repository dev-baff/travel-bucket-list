import { Link } from 'react-router-dom'

// Individual country card showing flag, name, capital and view details button
function CountryCard({ country, darkMode }) {
  // Get capital city safely since some countries have none
  const capital = country.capital ? country.capital[0] : 'N/A'

  return (
    <div className={`rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center ${
      darkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    }`}>
      {/* Country flag image */}
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="w-24 h-16 object-cover rounded mb-4 shadow-sm"
      />

      {/* Country name and capital */}
      <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {country.name.common}
      </h2>
      <p className="text-gray-400 text-sm mb-4">{capital}</p>

      {/* View Details button */}
      <Link
        to={`/destination/${country.cca3}`}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center"
      >
        View Details
      </Link>
    </div>
  )
}

export default CountryCard