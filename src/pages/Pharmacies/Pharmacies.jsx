import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getAllPharmacies } from '../../services/pharmacyService'

function Pharmacies() {
  const [pharmacies, setPharmacies] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadPharmacies() {
    try {
      const data = await getAllPharmacies()
      setPharmacies(data)
    } catch (error) {
      console.log(error)
      setError('Could not load pharmacies')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPharmacies()
  }, [])

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <p className="page-message">Loading...</p>
  }

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">Pharmacies</h1>
        <p className="page-subtitle">
          Find pharmacies and check their details.
        </p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search pharmacies"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {error && <p className="error">{error}</p>}

      {filteredPharmacies.length === 0 ? (
        <p className="page-message">No pharmacies found.</p>
      ) : (
        <div className="card-list">
          {filteredPharmacies.map((pharmacy) => (
            <div className="card" key={pharmacy._id}>
              <h3 className="card-title">{pharmacy.name}</h3>

              <p>
                <span className="card-label">Location:</span>{' '}
                {pharmacy.location}
              </p>

              <p>
                <span className="card-label">Phone:</span> {pharmacy.phone}
              </p>

              <Link
                className="btn btn-primary"
                to={`/pharmacies/${pharmacy._id}`}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Pharmacies
