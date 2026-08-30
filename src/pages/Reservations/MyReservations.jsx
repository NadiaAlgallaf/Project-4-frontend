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
        <div className="card-list">
          {reservations.map((reservation) => (
            <div className="card" key={reservation._id}>
              <h3 className="card-title">{reservation.medicine.name}</h3>

              <p>
                <span className="card-label">Pharmacy:</span>{' '}
                {reservation.pharmacy.name}
              </p>

              <p>
                <span className="card-label">Quantity:</span>{' '}
                {reservation.quantity}
              </p>

              <p>
                <span className="card-label">Status:</span>{' '}
                <span className="badge badge-light">{reservation.status}</span>
              </p>

              <Link
                className="btn btn-primary"
                to={`/reservations/${reservation._id}`}
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

export default MyReservations
