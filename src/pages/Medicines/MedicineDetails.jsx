import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { getMedicineById } from '../../services/medicineService'
import { getMedicineAvailability } from '../../services/inventoryService'
import { createReservation } from '../../services/reservationService'

function MedicineDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [medicine, setMedicine] = useState(null)
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [locationFilter, setLocationFilter] = useState('')

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

      const reservation = await createReservation({
        pharmacy: pharmacyId,
        medicine: medicine._id,
        quantity: quantity
      })

      if (medicine.requiresPrescription) {
        navigate(`/reservations/${reservation._id}`)
      } else {
        navigate('/my-reservations')
      }
    } catch (error) {
      console.log(error)

      setError(
        error?.response?.data?.message || 'Could not create reservation'
      )
    }
  }

  useEffect(() => {
    loadMedicineDetails()
  }, [id])

  const filteredAvailability = availability.filter((item) =>
    item.pharmacy.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase())
  )

  if (loading) {
    return <p className="page-message">Loading...</p>
  }

  if (error && !medicine) {
    return <p className="error page-message">{error}</p>
  }

  return (
    <main className="page-container">
      <div className="medicine-profile-card">
        {medicine.medicineImg && (
          <div className="medicine-profile-image-container">
            <img
              className="medicine-profile-image"
              src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${medicine.medicineImg}`}
              alt={medicine.brandName}
            />
          </div>
        )}

        <div className="medicine-profile-info">
          <h1 className="page-title">{medicine.brandName}</h1>

          <p>
            <span className="card-label">Generic Name:</span>{' '}
            {medicine.genericName}
          </p>

          <p>
            <span className="card-label">Dosage:</span>{' '}
            {medicine.dosage}
          </p>

          <p>
            <span className="card-label">Dosage Form:</span>{' '}
            {medicine.dosageForm}
          </p>

          <p>
            <span className="card-label">Category:</span>{' '}
            {medicine.category}
          </p>

          <p>
            <span className="card-label">Price:</span>{' '}
            {medicine.price} BD
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
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="section-header">
        <h2>Available Pharmacies</h2>

        <p>Choose a pharmacy to reserve your medicine.</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search by location"
        value={locationFilter}
        onChange={(event) => setLocationFilter(event.target.value)}
      />

      {availability.length === 0 ? (
        <p className="page-message">
          This medicine is currently unavailable.
        </p>
      ) : filteredAvailability.length === 0 ? (
        <p className="page-message">
          No pharmacies found in this location.
        </p>
      ) : (
        <div className="card-grid">
          {filteredAvailability.map((item) => (
            <div className="card" key={item._id}>
              <h3 className="card-title">
                {item.pharmacy.name}
              </h3>

              <p>
                <span className="card-label">Location:</span>{' '}
                {item.pharmacy.location}
              </p>

              <p>
                <span className="card-label">Phone:</span>{' '}
                {item.pharmacy.phone}
              </p>

              <p>
                <span className="card-label">Stock:</span>{' '}
                {item.stock}
              </p>

              {/* Stock Status */}
              <p>
                <span
                  className={
                    item.stockStatus === 'Low Stock'
                      ? 'badge badge-warning'
                      : 'badge badge-success'
                  }
                >
                  {item.stockStatus === 'Low Stock'
                    ? '⚠️ Low Stock'
                    : '✓ In Stock'}
                </span>
              </p>

              {user?.role === 'User' ? (
                <div className="reservation-actions">
                  <label htmlFor={`quantity-${item._id}`}>
                    Quantity:
                  </label>

                  <input
                    className="quantity-input"
                    type="number"
                    id={`quantity-${item._id}`}
                    min="1"
                    max={item.stock}
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                  />

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleReserve(item.pharmacy._id)
                    }
                  >
                    Reserve
                  </button>
                </div>
              ) : !user ? (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/sign-in')}
                >
                  Sign in to Reserve
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default MedicineDetails