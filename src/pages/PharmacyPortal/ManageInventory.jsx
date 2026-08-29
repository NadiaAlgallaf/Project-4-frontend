import { useEffect, useState } from 'react'
import { getMyInventory, deleteMedicine } from '../../services/inventoryService'
import { getAllMedicines } from '../../services/medicineService'

function ManageInventory() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [medicines, setMedicines] = useState([])

  async function loadInventory() {
    try {
      const data = await getMyInventory()
      setInventory(data)
    } catch (error) {
      console.log(error)
      setError('Could not load inventory')
    }
  }

  async function loadMedicines() {
    try {
      const data = await getAllMedicines()
      setMedicines(data)
    } catch (error) {
      console.log(error)
      setError('Could not load medicines')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMedicine(id)
      loadInventory()
    } catch (error) {
      console.log(error)
      setError('Could not remove medicine')
    }
  }

  useEffect(() => {
    async function loadPage() {
      await loadInventory()
      await loadMedicines()
      setLoading(false)
    }

    loadPage()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Manage Inventory</h1>

      {error && <p>{error}</p>}

      {inventory.length === 0 ? (
        <p>No medicines in your inventory.</p>
      ) : (
        inventory.map((item) => (
          <div key={item._id}>
            <h3>{item.medicine.name}</h3>

            <p>Dosage: {item.medicine.dosage}</p>
            <p>Category: {item.medicine.category}</p>
            <p>Price: {item.medicine.price} BD</p>

            <p>
              {item.medicine.requiresPrescription
                ? 'Prescription Required'
                : 'No Prescription Required'}
            </p>

            <button onClick={() => handleDelete(item._id)}>Remove</button>
          </div>
        ))
      )}
    </main>
  )
}

export default ManageInventory
