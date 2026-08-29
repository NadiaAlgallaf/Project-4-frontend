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
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>My Reservations</h1>

      {error && <p>{error}</p>}

      {reservations.length === 0 ? (
        <p>You have no reservations yet.</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation._id}>
            <h3>{reservation.medicine.name}</h3>

            <p>Pharmacy: {reservation.pharmacy.name}</p>

            <p>Quantity: {reservation.quantity}</p>

            <p>Status: {reservation.status}</p>

            <Link to={`/reservations/${reservation._id}`}>View Details</Link>

            <hr />
          </div>
        ))
      )}
    </main>
  )
}

export default MyReservations
