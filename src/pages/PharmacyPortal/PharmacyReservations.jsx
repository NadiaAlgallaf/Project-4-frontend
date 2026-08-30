import { useEffect, useState } from 'react'
import { getPharmacyReservations, updateReservationStatus} from '../../services/reservationService'

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
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Pharmacy Reservations</h1>

      {error && <p>{error}</p>}

      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        reservations.map((reservation) => {
          const nextStatuses = allowedTransitions[reservation.status] || []

          return (
            <div key={reservation._id}>
              <h3>{reservation.medicine.name}</h3>

              <p>
                Customer: {reservation.user.firstName}{' '}
                {reservation.user.lastName}
              </p>

              <p>Quantity: {reservation.quantity}</p>

              <p>Status: {reservation.status}</p>

              {reservation.prescription && (
                <p>
                  Prescription:{' '}
                  <a href={reservation.prescription.imageUrl} target="_blank" rel="noreferrer">
                    View Prescription
                  </a>
                </p>
              )}

              {nextStatuses.length > 0 && (
                <select defaultValue="" onChange={(event) => {
                    if (event.target.value) {
                      handleStatus( reservation._id, event.target.value
                      ) }
                  }}
                >
                  <option value="" disabled> Select action </option>

                  {nextStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              )}

              <hr />
            </div>
          )
        })
      )}
    </main>
  )
}

export default PharmacyReservations