import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { getPharmacyById } from '../../services/pharmacyService'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function PharmacyDetails() {
  const { id } = useParams()

  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

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

  useEffect(() => {
    if (!pharmacy || !mapRef.current || mapInstanceRef.current) {
      return
    }

    const map = L.map(mapRef.current).setView(
      [pharmacy.latitude, pharmacy.longitude],
      15
    )

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    L.marker([pharmacy.latitude, pharmacy.longitude])
      .addTo(map)
      .bindPopup(pharmacy.name)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [pharmacy])

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

      <div className="pharmacy-map-section">
        <h2>Pharmacy Location</h2>

        <div ref={mapRef} className="pharmacy-details-map"></div>
      </div>
    </main>
  )
}

export default PharmacyDetails
