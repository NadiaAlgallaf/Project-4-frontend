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
    return <p className="page-message">Loading...</p>
  }

  if (error && !reservation) {
    return <p className="error page-message">{error}</p>
  }

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">Reservation Details</h1>
        <p className="page-subtitle">Review your reservation information.</p>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="card details-card">
        <div className="details-heading">
          <h3 className="card-title">{reservation.medicine.name}</h3>

          <span className="badge badge-light">{reservation.status}</span>
        </div>

        <p>
          <span className="card-label">Dosage:</span>{' '}
          {reservation.medicine.dosage}
        </p>

        <p>
          <span className="card-label">Pharmacy:</span>{' '}
          {reservation.pharmacy.name}
        </p>

        <p>
          <span className="card-label">Location:</span>{' '}
          {reservation.pharmacy.location}
        </p>

        <p>
          <span className="card-label">Quantity:</span> {reservation.quantity}
        </p>

        {reservation.prescription ? (
          <div className="prescription-section">
            <p className="success">Prescription uploaded</p>

            <a
              className="btn btn-light"
              href={reservation.prescription.imageUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Prescription
            </a>
          </div>
        ) : (
          reservation.medicine.requiresPrescription && (
            <form
              className="prescription-section"
              onSubmit={handlePrescription}
            >
              <h3>Upload Prescription</h3>

              <input
                className="form-input"
                type="text"
                placeholder="Prescription image URL"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Upload Prescription
              </button>
            </form>
          )
        )}

        {reservation.status === 'Pending' && (
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel Reservation
          </button>
        )}
      </div>
    </main>
  )
}

export default ReservationDetails
