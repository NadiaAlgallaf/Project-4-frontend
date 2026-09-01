import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { getPharmacyById } from '../../services/pharmacyService'
import { getPharmacyInventory } from '../../services/inventoryService'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function PharmacyDetails() {
  const { id } = useParams()

  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  const [pharmacy, setPharmacy] = useState(null)
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadPharmacy() {
    try {
      const data = await getPharmacyById(id)
      const inventoryData = await getPharmacyInventory(id)

      setPharmacy(data)
      setInventory(inventoryData)
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
      <div className="pharmacy-profile-card">
        {pharmacy.pharmacyImg && (
          <div className="pharmacy-profile-image-container">
            <img
              className="pharmacy-profile-image"
              src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${pharmacy.pharmacyImg}`}
              alt={pharmacy.name}
            />
          </div>
        )}

        <div className="pharmacy-profile-info">
          <h1 className="page-title">{pharmacy.name}</h1>

          <p className="page-subtitle">
            Pharmacy information and contact details.
          </p>

          <p>
            <span className="card-label">Location:</span> {pharmacy.location}
          </p>

          <p>
            <span className="card-label">Phone:</span> {pharmacy.phone}
          </p>
        </div>
      </div>

      <div className="pharmacy-map-section">
        <h2>Pharmacy Location</h2>

        <div ref={mapRef} className="pharmacy-details-map"></div>
      </div>

      <div className="section-header">
        <h2>Available Medicines</h2>

        <p>Medicines currently available at this pharmacy.</p>
      </div>

      {inventory.length === 0 ? (
        <p className="page-message">No medicines currently available.</p>
      ) : (
        <div className="card-grid">
          {inventory.map((item) => (
            <div className="card" key={item._id}>
              {item.medicine.medicineImg && (
                <img
                  className="medicine-image"
                  src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${item.medicine.medicineImg}`}
                  alt={item.medicine.brandName}
                />
              )}

              <h3 className="card-title">{item.medicine.brandName}</h3>

              <p>
                <span className="card-label">Generic Name:</span>{' '}
                {item.medicine.genericName}
              </p>

              <p>
                <span className="card-label">Dosage:</span>{' '}
                {item.medicine.dosage}
              </p>

              <p>
                <span className="card-label">Dosage Form:</span>{' '}
                {item.medicine.dosageForm}
              </p>

              <p>
                <span className="card-label">Category:</span>{' '}
                {item.medicine.category}
              </p>

              <p>
                <span className="card-label">Price:</span> {item.medicine.price}{' '}
                BD
              </p>

              <p>
                <span className="card-label">Stock:</span> {item.stock}
              </p>

              <p>
                <span
                  className={
                    item.medicine.requiresPrescription
                      ? 'badge badge-gold'
                      : 'badge badge-light'
                  }
                >
                  {item.medicine.requiresPrescription
                    ? 'Prescription Required'
                    : 'No Prescription Required'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default PharmacyDetails
