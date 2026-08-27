import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getMedicineById } from '../../services/medicineService'

function MedicineDetails() {
  const { id } = useParams()

  const [medicine, setMedicine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadMedicine() {
    try {
      const data = await getMedicineById(id)
      setMedicine(data)
    } catch (error) {
      console.log(error)
      setError('Could not load medicine')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedicine()
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
    </main>
  )
}

export default MedicineDetails
