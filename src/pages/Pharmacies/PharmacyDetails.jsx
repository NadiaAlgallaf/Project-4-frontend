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
    return <p className="page-message">Loading...</p>
  }

  if (error) {
    return <p className="error page-message">{error}</p>
  }

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">{pharmacy.name}</h1>

        <p className="page-subtitle">
          Pharmacy information and contact details.
        </p>
      </div>

      <div className="card details-card">
        <p>
          <span className="card-label">Location:</span> {pharmacy.location}
        </p>

        <p>
          <span className="card-label">Phone:</span> {pharmacy.phone}
        </p>
      </div>
    </main>
  )
}

export default PharmacyDetails
