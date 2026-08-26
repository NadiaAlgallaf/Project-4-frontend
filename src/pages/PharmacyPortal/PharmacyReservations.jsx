import { useEffect, useState } from 'react'
import {
  getPharmacyReservations,
  updateReservationStatus
} from '../../services/reservationService'

function PharmacyReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Pharmacy Reservations</h1>

      {error && <p>{error}</p>}

      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation._id}>
            <h3>{reservation.medicine.name}</h3>

            <p>
              Customer: {reservation.user.firstName} {reservation.user.lastName}
            </p>

            <p>Quantity: {reservation.quantity}</p>

            <p>Status: {reservation.status}</p>

            {reservation.prescription && (
              <p>
                Prescription:{' '}
                <a
                  href={reservation.prescription.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Prescription
                </a>
              </p>
            )}

            <select
              value={reservation.status}
              onChange={(event) =>
                handleStatus(reservation._id, event.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Ready">Ready</option>
              <option value="Collected">Collected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <hr />
          </div>
        ))
      )}
    </main>
  )
}

export default PharmacyReservations
