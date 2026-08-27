import api from './api'

async function getAllMedicines() {
  const response = await api.get('/medicines')
  return response.data
}

async function getMedicineById(id) {
  const response = await api.get(`/medicines/${id}`)
  return response.data
}

async function createMedicine(formData) {
  const response = await api.post('/medicines', formData)
  return response.data
}

async function updateMedicine(id, formData) {
  const response = await api.patch(`/medicines/${id}`, formData)
  return response.data
}

async function deleteMedicine(id) {
  const response = await api.delete(`/medicines/${id}`)
  return response.data
}

export {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine
}
