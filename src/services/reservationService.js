import api from './api'

async function createReservation(formData) {
  const response = await api.post('/reservations', formData)
  return response.data
}

async function getMyReservations() {
  const response = await api.get('/reservations/my-reservations')
  return response.data
}

async function getPharmacyReservations() {
  const response = await api.get('/reservations/pharmacy')
  return response.data
}

async function updateReservationStatus(id, status) {
  const response = await api.patch(`/reservations/${id}/status`, {
    status
  })

  return response.data
}

async function cancelReservation(id) {
  const response = await api.delete(`/reservations/${id}`)
  return response.data
}

async function uploadPrescription(id, file) {
  const formData = new FormData()

 formData.append('prescriptionImg', file)

  const response = await api.post(`/reservations/${id}/prescription`, formData)

  return response.data
}

export {
  createReservation,
  getMyReservations,
  getPharmacyReservations,
  updateReservationStatus,
  cancelReservation,
  uploadPrescription
}
