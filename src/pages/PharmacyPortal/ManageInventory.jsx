import { useEffect, useState } from 'react'
import {
  getMyInventory,
  deleteMedicine,
  addMedicine
} from '../../services/inventoryService'
import { getAllMedicines, createMedicine } from '../../services/medicineService'

function ManageInventory() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [medicines, setMedicines] = useState([])
  const [search, setSearch] = useState('')
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [stock, setStock] = useState(1)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    category: '',
    price: '',
    requiresPrescription: false
  })

  const [newMedicineStock, setNewMedicineStock] = useState(1)

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

  async function handleAddMedicine() {
    try {
      setError('')

      if (!selectedMedicine) {
        setError('Please select a medicine')
        return
      }

      if (stock < 1) {
        setError('Stock must be at least 1')
        return
      }

      await addMedicine(selectedMedicine, stock)

      setSelectedMedicine('')
      setSearch('')
      setStock(1)

      loadInventory()
    } catch (error) {
      console.log(error)

      setError(
        error?.response?.data?.message || 'Could not add medicine to inventory'
      )
    }
  }

  async function handleCreateMedicine(event) {
    event.preventDefault()

    try {
      setError('')

      if (newMedicineStock < 1) {
        setError('Stock must be at least 1')
        return
      }

      const createdMedicine = await createMedicine({
        ...newMedicine,
        price: Number(newMedicine.price)
      })

      await addMedicine(createdMedicine._id, newMedicineStock)

      setNewMedicine({
        name: '',
        dosage: '',
        category: '',
        price: '',
        requiresPrescription: false
      })

      setNewMedicineStock(1)
      setShowCreateForm(false)
      setSearch('')

      await loadMedicines()
      await loadInventory()
    } catch (error) {
      console.log(error)

      setError(error?.response?.data?.message || 'Could not create medicine')
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

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main>
      <h1>Manage Inventory</h1>

      <h2>Add Medicine</h2>

      <input
        type="text"
        placeholder="Search medicine"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search && (
        <div>
          {filteredMedicines.map((medicine) => (
            <div key={medicine._id}>
              <p>
                {medicine.name} - {medicine.dosage}
              </p>

              <button
                onClick={() => {
                  setSelectedMedicine(medicine._id)
                  setSearch(medicine.name)
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedMedicine && (
        <div>
          <label htmlFor="stock">Stock:</label>

          <input
            type="number"
            id="stock"
            min="1"
            value={stock}
            onChange={(event) => setStock(Number(event.target.value))}
          />

          <button onClick={handleAddMedicine}>Add to Inventory</button>
        </div>
      )}

      <div>
        <p>Can't find the medicine?</p>

        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create New Medicine'}
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateMedicine}>
          <h3>Create New Medicine</h3>

          <div>
            <label htmlFor="medicineName">Medicine Name:</label>

            <input
              type="text"
              id="medicineName"
              value={newMedicine.name}
              onChange={(event) =>
                setNewMedicine({
                  ...newMedicine,
                  name: event.target.value
                })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="dosage">Dosage:</label>

            <input
              type="text"
              id="dosage"
              value={newMedicine.dosage}
              onChange={(event) =>
                setNewMedicine({
                  ...newMedicine,
                  dosage: event.target.value
                })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>

            <input
              type="text"
              id="category"
              value={newMedicine.category}
              onChange={(event) =>
                setNewMedicine({
                  ...newMedicine,
                  category: event.target.value
                })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price:</label>

            <input
              type="number"
              id="price"
              min="0"
              step="0.001"
              value={newMedicine.price}
              onChange={(event) =>
                setNewMedicine({
                  ...newMedicine,
                  price: event.target.value
                })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="requiresPrescription">Requires Prescription:</label>

            <input
              type="checkbox"
              id="requiresPrescription"
              checked={newMedicine.requiresPrescription}
              onChange={(event) =>
                setNewMedicine({
                  ...newMedicine,
                  requiresPrescription: event.target.checked
                })
              }
            />
          </div>

          <div>
            <label htmlFor="newMedicineStock">Stock:</label>

            <input
              type="number"
              id="newMedicineStock"
              min="1"
              value={newMedicineStock}
              onChange={(event) =>
                setNewMedicineStock(Number(event.target.value))
              }
              required
            />
          </div>

          <button type="submit">Create and Add to Inventory</button>
        </form>
      )}

      {error && <p>{error}</p>}

      <h2>My Inventory</h2>
      {inventory.length === 0 ? (
        <p>No medicines in your inventory.</p>
      ) : (
        inventory.map((item) => (
          <div key={item._id}>
            <h3>{item.medicine.name}</h3>

            <p>Dosage: {item.medicine.dosage}</p>
            <p>Category: {item.medicine.category}</p>
            <p>Price: {item.medicine.price} BD</p>
            <p>Stock: {item.stock}</p>

            <p>
              {item.medicine.requiresPrescription
                ? 'Prescription Required'
                : 'No Prescription Required'}
            </p>

            <button onClick={() => handleDelete(item._id)}>Remove</button>
            <hr />
          </div>
        ))
      )}
    </main>
  )
}

export default ManageInventory
