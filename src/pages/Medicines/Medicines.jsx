import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getAllMedicines } from '../../services/medicineService'

function Medicines() {
  const [medicines, setMedicines] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadMedicines() {
    try {
      const data = await getAllMedicines()
      setMedicines(data)
    } catch (error) {
      console.log(error)
      setError('Could not load medicines')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedicines()
  }, [])

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <p className="page-message">Loading...</p>
  }

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">Medicines</h1>
        <p className="page-subtitle">Search and find available medicines.</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search for a medicine"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {error && <p className="error">{error}</p>}

      {filteredMedicines.length === 0 ? (
        <p className="page-message">No medicines found.</p>
      ) : (
        <div className="card-grid">
          {filteredMedicines.map((medicine) => (
            <div className="card" key={medicine._id}>
              <h3 className="card-title">{medicine.name}</h3>

              <p>
                <span className="card-label">Dosage:</span> {medicine.dosage}
              </p>

              <p>
                <span className="card-label">Category:</span>{' '}
                {medicine.category}
              </p>

              <p>
                <span className="card-label">Price:</span> {medicine.price} BD
              </p>

              <p>
                <span
                  className={
                    medicine.requiresPrescription
                      ? 'badge badge-gold'
                      : 'badge badge-light'
                  }
                >
                  {medicine.requiresPrescription
                    ? 'Prescription Required'
                    : 'No Prescription Required'}
                </span>
              </p>

              <Link
                className="btn btn-primary"
                to={`/medicines/${medicine._id}`}
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

export default Medicines
