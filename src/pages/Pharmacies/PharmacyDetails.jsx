import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getPharmacyById } from '../../services/pharmacyService'

function PharmacyDetails() {
  const { id } = useParams()

  const [pharmacy, setPharmacy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadPharmacy() {
    try {
      const data = await getPharmacyById(id)
      setPharmacy(data)
    } catch (error) {
      console.log(error)
      setError('Could not load pharmacy')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPharmacy()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <main>
      <h1>{pharmacy.name}</h1>

      <p>Location: {pharmacy.location}</p>

      <p>Phone: {pharmacy.phone}</p>
    </main>
  )
}

export default PharmacyDetails
