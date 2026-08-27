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
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Pharmacies</h1>

      <input
        type="text"
        placeholder="Search pharmacies"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {error && <p>{error}</p>}

      {filteredPharmacies.length === 0 ? (
        <p>No pharmacies found.</p>
      ) : (
        filteredPharmacies.map((pharmacy) => (
          <div key={pharmacy._id}>
            <h3>{pharmacy.name}</h3>

            <p>Location: {pharmacy.location}</p>
            <p>Phone: {pharmacy.phone}</p>

            <Link to={`/pharmacies/${pharmacy._id}`}>View Details</Link>

            <hr />
          </div>
        ))
      )}
    </main>
  )
}

export default Pharmacies
