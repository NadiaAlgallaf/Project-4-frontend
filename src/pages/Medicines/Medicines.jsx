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
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Medicines</h1>

      <input
        type="text"
        placeholder="Search for a medicine"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {error && <p>{error}</p>}

      {filteredMedicines.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        filteredMedicines.map((medicine) => (
          <div key={medicine._id}>
            <h3>{medicine.name}</h3>

            <p>Dosage: {medicine.dosage}</p>
            <p>Category: {medicine.category}</p>
            <p>Price: {medicine.price} BD</p>

            <p>
              {medicine.requiresPrescription
                ? 'Prescription Required'
                : 'No Prescription Required'}
            </p>

            <Link to={`/medicines/${medicine._id}`}>View Details</Link>

            <hr />
          </div>
        ))
      )}
    </main>
  )
}

export default Medicines
