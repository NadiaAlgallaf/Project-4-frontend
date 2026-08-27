import api from './api'

async function getAllPharmacies() {
  const response = await api.get('/pharmacies')
  return response.data
}

async function getPharmacyById(id) {
  const response = await api.get(`/pharmacies/${id}`)
  return response.data
}

async function createPharmacy(formData) {
  const response = await api.post('/pharmacies', formData)
  return response.data
}

async function updatePharmacy(id, formData) {
  const response = await api.patch(`/pharmacies/${id}`, formData)
  return response.data
}

async function deletePharmacy(id) {
  const response = await api.delete(`/pharmacies/${id}`)
  return response.data
}

export {
  getAllPharmacies,
  getPharmacyById,
  createPharmacy,
  updatePharmacy,
  deletePharmacy
}
