import { Link } from 'react-router-dom'

// Individual country card showing flag, name, capital and view details button
function CountryCard({ country }) {
  // Get capital city safely since some countries have none
  const capital = country.capital ? country.capital[0] : 'N/A'

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center">
      {/* Country flag emoji */}
      <div className="text-6xl mb-4">
        {country.flag}
      </div>

      {/* Country name and capital */}
      <h2 className="text-lg font-bold text-gray-800">{country.name.common}</h2>
      <p className="text-gray-500 text-sm mb-4">{capital}</p>

      {/* View Details button links to destination detail page */}
      <Link
        to={`/destination/${country.cca3}`}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
      >
        View Details
      </Link>
    </div>
  )
}

export default CountryCard