import api from './api'

async function getMyInventory() {
  const response = await api.get('/inventory/my-inventory')
  return response.data
}

async function addMedicine(medicine, stock) {
  const response = await api.post('/inventory', {
    medicine,
    stock
  })

  return response.data
}

async function getMedicineAvailability(medicineId) {
  const response = await api.get(`/inventory/medicine/${medicineId}`)

  return response.data
}

export async function updateInventoryStock(id, stock) {
  const res = await api.patch(`/inventory/${id}`, {
    stock
  })

  return res.data
}

async function deleteMedicine(id) {
  const response = await api.delete(`/inventory/${id}`)
  return response.data
}

export { getMyInventory, addMedicine, getMedicineAvailability, deleteMedicine }
