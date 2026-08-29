import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getMedicineById } from '../../services/medicineService'
import { getMedicineAvailability } from '../../services/inventoryService'

function MedicineDetails() {
  const { id } = useParams()

  const [medicine, setMedicine] = useState(null)
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadMedicineDetails() {
    try {
      const medicineData = await getMedicineById(id)
      const availabilityData = await getMedicineAvailability(id)

      setMedicine(medicineData)
      setAvailability(availabilityData)
    } catch (error) {
      console.log(error)
      setError('Could not load medicine')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedicineDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <main>
      <h1>{medicine.name}</h1>

      <p>Dosage: {medicine.dosage}</p>

      <p>Category: {medicine.category}</p>

      <p>Price: {medicine.price} BD</p>

      <p>
        {medicine.requiresPrescription
          ? 'Prescription Required'
          : 'No Prescription Required'}
      </p>

      <h2>Available Pharmacies</h2>

      {availability.length === 0 ? (
        <p>This medicine is currently unavailable.</p>
      ) : (
        availability.map((item) => (
          <div key={item._id}>
            <h3>{item.pharmacy.name}</h3>

            <p>Location: {item.pharmacy.location}</p>

            <p>Phone: {item.pharmacy.phone}</p>

            <p>Stock: {item.stock}</p>

            <hr />
          </div>
        ))
      )}
    </main>
  )
}

export default MedicineDetails
