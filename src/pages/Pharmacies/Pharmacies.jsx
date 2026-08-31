import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { getAllPharmacies } from '../../services/pharmacyService'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function Pharmacies() {
  const [pharmacies, setPharmacies] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

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

  useEffect(() => {
    if (loading || !mapRef.current) {
      return
    }

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([26.2235, 50.5876], 11)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      mapInstanceRef.current = map
    }

    markersRef.current.forEach((marker) => {
      marker.remove()
    })

    markersRef.current = []

    filteredPharmacies.forEach((pharmacy) => {
      if (pharmacy.latitude === undefined || pharmacy.longitude === undefined) {
        return
      }

      const marker = L.marker([pharmacy.latitude, pharmacy.longitude]).addTo(
        mapInstanceRef.current
      ).bindPopup(`
          <strong>${pharmacy.name}</strong><br />
          ${pharmacy.location}
        `)

      markersRef.current.push(marker)
    })
  }, [filteredPharmacies, loading])

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

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

      <div className="pharmacies-map-section">
        <h2>Pharmacy Locations</h2>

        <div ref={mapRef} className="pharmacies-map"></div>
      </div>

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
