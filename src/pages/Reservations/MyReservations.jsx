import { useEffect, useState } from 'react'
import { getMyReservations } from '../../services/reservationService'
import { Link } from 'react-router'

function MyReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadReservations() {
    try {
      const data = await getMyReservations()
      setReservations(data)
    } catch (error) {
      console.log(error)
      setError('Could not load reservations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReservations()
  }, [])

  if (loading) {
    return <p className="page-message">Loading...</p>
  }

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Reservations</h1>

        <p className="page-subtitle">
          View and manage your medicine reservations.
        </p>
      </div>

      {error && <p className="error">{error}</p>}

      {reservations.length === 0 ? (
        <p className="page-message">You have no reservations yet.</p>
      ) : (
        <div className="reservation-list">
          {reservations.map((reservation) => (
            <div className="reservation-card" key={reservation._id}>
              <div className="reservation-image-container">
                {reservation.medicine.medicineImg ? (
                  <img
                    className="reservation-medicine-image"
                    src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${reservation.medicine.medicineImg}`}
                    alt={reservation.medicine.brandName}
                  />
                ) : (
                  <div className="reservation-image-placeholder">No Image</div>
                )}
              </div>

              <div className="reservation-card-content">
                <div className="reservation-card-header">
                  <div>
                    <h3 className="card-title">
                      {reservation.medicine.brandName}
                    </h3>

                    <p className="reservation-generic-name">
                      {reservation.medicine.genericName}
                    </p>
                  </div>

                  <span className="badge badge-light">
                    {reservation.status}
                  </span>
                </div>

                <div className="reservation-info">
                  <p>
                    <span className="card-label">Pharmacy:</span>{' '}
                    {reservation.pharmacy.name}
                  </p>

                  <p>
                    <span className="card-label">Dosage:</span>{' '}
                    {reservation.medicine.dosage}{' '}
                    {reservation.medicine.dosageForm}
                  </p>

                  <p>
                    <span className="card-label">Quantity:</span>{' '}
                    {reservation.quantity}
                  </p>
                </div>

                <div className="reservation-card-actions">
                  <Link
                    className="btn btn-primary"
                    to={`/reservations/${reservation._id}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default MyReservations
