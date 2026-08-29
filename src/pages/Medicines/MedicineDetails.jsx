import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getMedicineById } from '../../services/medicineService'
import { getMedicineAvailability } from '../../services/inventoryService'
import { createReservation } from '../../services/reservationService'

function MedicineDetails() {
  const { id } = useParams()

  const [medicine, setMedicine] = useState(null)
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [quantity, setQuantity] = useState(1)

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

  async function handleReserve(pharmacyId) {
    try {
      setError('')
      setSuccess('')

      await createReservation({
        pharmacy: pharmacyId,
        medicine: medicine._id,
        quantity: quantity
      })

      setSuccess('Reservation created successfully.')
    } catch (error) {
      console.log(error)

      setError(error?.response?.data?.message || 'Could not create reservation')
    }
  }

  useEffect(() => {
    loadMedicineDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error && !medicine) {
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

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

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

            <label htmlFor={`quantity-${item._id}`}>Quantity:</label>

            <input
              type="number"
              id={`quantity-${item._id}`}
              min="1"
              max={item.stock}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />

            <button onClick={() => handleReserve(item.pharmacy._id)}>
              Reserve
            </button>

            <hr />
          </div>
        ))
      )}
    </main>
  )
}

export default MedicineDetails
