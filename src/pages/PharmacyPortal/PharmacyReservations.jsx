import { useEffect, useState } from 'react'
import {
  getPharmacyReservations,
  updateReservationStatus
} from '../../services/reservationService'

function PharmacyReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const allowedTransitions = {
    Pending: ['Approved', 'Rejected'],
    Approved: ['Ready'],
    Ready: ['Collected'],
    Rejected: [],
    Collected: []
  }

  async function loadReservations() {
    try {
      const data = await getPharmacyReservations()
      setReservations(data)
    } catch (error) {
      console.log(error)
      setError('Could not load reservations')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatus(id, status) {
    try {
      await updateReservationStatus(id, status)
      loadReservations()
    } catch (error) {
      console.log(error)
      setError('Could not update reservation status')
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
        <h1 className="page-title">Pharmacy Reservations</h1>

        <p className="page-subtitle">
          Review customer reservations and update their status.
        </p>
      </div>

      {error && <p className="error">{error}</p>}

      {reservations.length === 0 ? (
        <p className="page-message">No reservations yet.</p>
      ) : (
        <div className="reservation-table">
          <div className="reservation-table-header">
            <span>Medicine</span>
            <span>Customer</span>
            <span>Quantity</span>
            <span>Status</span>
            <span>Prescription</span>
            <span>Action</span>
          </div>

          {reservations.map((reservation) => {
            const nextStatuses = allowedTransitions[reservation.status] || []

            return (
              <div className="reservation-table-row" key={reservation._id}>
                <strong>{reservation.medicine.name}</strong>

                <span>
                  {reservation.user.firstName} {reservation.user.lastName}
                </span>

                <span>{reservation.quantity}</span>

                <span>
                  <span
                    className={`badge reservation-status status-${reservation.status.toLowerCase()}`}
                  >
                    {reservation.status}
                  </span>
                </span>

                <span>
                  {reservation.prescription ? (
                    <a
                      className="btn btn-light reservation-prescription-btn"
                      href={reservation.prescription.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <span className="reservation-empty">—</span>
                  )}
                </span>

                <span>
                  {nextStatuses.length > 0 ? (
                    <select
                      className="form-input reservation-action-select"
                      defaultValue=""
                      onChange={(event) => {
                        if (event.target.value) {
                          handleStatus(reservation._id, event.target.value)
                        }
                      }}
                    >
                      <option value="" disabled>
                        Select action
                      </option>

                      {nextStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="reservation-empty">No action</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default PharmacyReservations
