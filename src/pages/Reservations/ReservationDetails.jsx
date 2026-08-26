import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  getMyReservations,
  cancelReservation,
  uploadPrescription
} from '../../services/reservationService'

function ReservationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [reservation, setReservation] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadReservation() {
    try {
      const data = await getMyReservations()

      const foundReservation = data.find(
        (reservation) => reservation._id === id
      )

      if (!foundReservation) {
        setError('Reservation not found')
        return
      }

      setReservation(foundReservation)
    } catch (error) {
      console.log(error)
      setError('Could not load reservation')
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    try {
      await cancelReservation(id)
      navigate('/my-reservations')
    } catch (error) {
      console.log(error)
      setError('Could not cancel reservation')
    }
  }

  async function handlePrescription(event) {
    event.preventDefault()

    if (!imageUrl) {
      setError('Please enter a prescription image URL')
      return
    }

    try {
      await uploadPrescription(id, imageUrl)

      setImageUrl('')
      loadReservation()
    } catch (error) {
      console.log(error)
      setError('Could not upload prescription')
    }
  }

  useEffect(() => {
    loadReservation()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error && !reservation) {
    return <p>{error}</p>
  }

  return (
    <main>
      <h1>Reservation Details</h1>

      {error && <p>{error}</p>}

      <h3>{reservation.medicine.name}</h3>

      <p>Dosage: {reservation.medicine.dosage}</p>

      <p>Pharmacy: {reservation.pharmacy.name}</p>

      <p>Location: {reservation.pharmacy.location}</p>

      <p>Quantity: {reservation.quantity}</p>

      <p>Status: {reservation.status}</p>

      {reservation.prescription ? (
        <div>
          <p>Prescription uploaded</p>

          <a
            href={reservation.prescription.imageUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Prescription
          </a>
        </div>
      ) : (
        reservation.medicine.requiresPrescription && (
          <form onSubmit={handlePrescription}>
            <h3>Upload Prescription</h3>

            <input
              type="text"
              placeholder="Prescription image URL"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />

            <button type="submit">Upload Prescription</button>
          </form>
        )
      )}

      {reservation.status === 'Pending' && (
        <button onClick={handleCancel}>Cancel Reservation</button>
      )}
    </main>
  )
}

export default ReservationDetails
