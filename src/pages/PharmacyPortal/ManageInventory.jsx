import { useEffect, useState } from 'react'
import {
  getMyInventory,
  deleteMedicine,
  addMedicine,
  updateInventoryStock
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
    genericName: '',
    brandName: '',
    dosage: '',
    dosageForm: '',
    category: '',
    price: '',
    requiresPrescription: false,
    medicineImg: null
  })

  const [newMedicineStock, setNewMedicineStock] = useState(1)
  const [stockUpdates, setStockUpdates] = useState({})

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
        error?.response?.data?.message ||
          'Could not add medicine to inventory'
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

      const formData = new FormData()

      formData.append('genericName', newMedicine.genericName)
      formData.append('brandName', newMedicine.brandName)
      formData.append('dosage', newMedicine.dosage)
      formData.append('dosageForm', newMedicine.dosageForm)
      formData.append('category', newMedicine.category)
      formData.append('price', newMedicine.price)

      formData.append(
        'requiresPrescription',
        newMedicine.requiresPrescription
      )

      if (newMedicine.medicineImg) {
        formData.append('medicineImg', newMedicine.medicineImg)
      }

      const createdMedicine = await createMedicine(formData)

      await addMedicine(createdMedicine._id, newMedicineStock)

      setNewMedicine({
        genericName: '',
        brandName: '',
        dosage: '',
        dosageForm: '',
        category: '',
        price: '',
        requiresPrescription: false,
        medicineImg: null
      })

      setNewMedicineStock(1)
      setShowCreateForm(false)
      setSearch('')

      await loadMedicines()
      await loadInventory()
    } catch (error) {
      console.log(error)

      setError(
        error?.response?.data?.message || 'Could not create medicine'
      )
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

  async function handleUpdateStock(id) {
    try {
      setError('')

      const stock = stockUpdates[id]

      if (stock === undefined || stock === '') {
        setError('Please enter the new stock.')
        return
      }

      await updateInventoryStock(id, Number(stock))

      setStockUpdates({
        ...stockUpdates,
        [id]: ''
      })

      loadInventory()
    } catch (error) {
      console.log(error)

      setError(
        error.response?.data?.message || 'Could not update stock.'
      )
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
    return <p className="page-message">Loading...</p>
  }

  const filteredMedicines = medicines.filter((medicine) => {
    const searchText = search.toLowerCase()

    const genericName = medicine.genericName || ''
    const brandName = medicine.brandName || ''

    return (
      genericName.toLowerCase().includes(searchText) ||
      brandName.toLowerCase().includes(searchText)
    )
  })

  return (
    <main className="page-container">
      <div className="page-header">
        <h1 className="page-title">Manage Inventory</h1>

        <p className="page-subtitle">
          Add medicines and manage your pharmacy stock.
        </p>
      </div>

      {error && <p className="error">{error}</p>}

      <section className="inventory-section">
        <div className="section-header">
          <h2>Add Medicine</h2>

          <p>
            Search for an existing medicine and add it to your inventory.
          </p>
        </div>

        <div className="form-card inventory-form-card">
          <div className="form-group">
            <label htmlFor="medicineSearch">Search Medicine</label>

            <input
              className="form-input"
              id="medicineSearch"
              type="text"
              placeholder="Search by brand or generic name"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setSelectedMedicine('')
              }}
            />
          </div>

          {search && !selectedMedicine && (
            <div className="search-results">
              {filteredMedicines.length === 0 ? (
                <p className="search-empty">No medicines found.</p>
              ) : (
                filteredMedicines.map((medicine) => (
                  <div
                    className="search-result-item"
                    key={medicine._id}
                  >
                    <div>
                      <strong>{medicine.brandName}</strong>

                      <p>
                        {medicine.genericName} - {medicine.dosage}{' '}
                        {medicine.dosageForm}
                      </p>
                    </div>

                    <button
                      className="btn btn-light"
                      type="button"
                      onClick={() => {
                        setSelectedMedicine(medicine._id)
                        setSearch(medicine.brandName)
                      }}
                    >
                      Select
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {selectedMedicine && (
            <div className="selected-medicine-section">
              <p>
                Selected medicine: <strong>{search}</strong>
              </p>

              <div className="inventory-add-controls">
                <div className="stock-field">
                  <label htmlFor="stock">Stock</label>

                  <input
                    className="form-input"
                    type="number"
                    id="stock"
                    min="1"
                    value={stock}
                    onChange={(event) =>
                      setStock(Number(event.target.value))
                    }
                  />
                </div>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddMedicine}
                >
                  Add to Inventory
                </button>
              </div>
            </div>
          )}

          <div className="inventory-create-toggle">
            <p>Can't find the medicine?</p>

            <button
              className="btn btn-light"
              type="button"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm
                ? 'Cancel'
                : 'Create New Medicine'}
            </button>
          </div>
        </div>

        {showCreateForm && (
          <form
            className="form-card form inventory-create-form"
            onSubmit={handleCreateMedicine}
          >
            <h3 className="card-title">Create New Medicine</h3>

            <div className="form-group">
              <label htmlFor="brandName">Brand Name</label>

              <input
                className="form-input"
                type="text"
                id="brandName"
                value={newMedicine.brandName}
                onChange={(event) =>
                  setNewMedicine({
                    ...newMedicine,
                    brandName: event.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="genericName">Generic Name</label>

              <input
                className="form-input"
                type="text"
                id="genericName"
                value={newMedicine.genericName}
                onChange={(event) =>
                  setNewMedicine({
                    ...newMedicine,
                    genericName: event.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dosage">Dosage</label>

              <input
                className="form-input"
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

            <div className="form-group">
              <label htmlFor="dosageForm">Dosage Form</label>

              <input
                className="form-input"
                type="text"
                id="dosageForm"
                placeholder="Tablet, Capsule, Syrup..."
                value={newMedicine.dosageForm}
                onChange={(event) =>
                  setNewMedicine({
                    ...newMedicine,
                    dosageForm: event.target.value
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>

              <input
                className="form-input"
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

            <div className="form-group">
              <label htmlFor="price">Price</label>

              <input
                className="form-input"
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

            <div className="form-group">
              <label htmlFor="medicineImg">Medicine Image</label>

              <input
                className="form-input"
                type="file"
                id="medicineImg"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event) =>
                  setNewMedicine({
                    ...newMedicine,
                    medicineImg: event.target.files[0]
                  })
                }
              />
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="requiresPrescription">
                Requires Prescription
              </label>

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

            <div className="form-group">
              <label htmlFor="newMedicineStock">Stock</label>

              <input
                className="form-input"
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

            <button
              className="btn btn-primary"
              type="submit"
            >
              Create and Add to Inventory
            </button>
          </form>
        )}
      </section>

      <section className="inventory-section">
        <div className="section-header">
          <h2>My Inventory</h2>

          <p>
            View stock levels and update medicines in your pharmacy.
          </p>
        </div>

        {inventory.length === 0 ? (
          <p className="page-message">
            No medicines in your inventory.
          </p>
        ) : (
          <div className="inventory-table">
            <div className="inventory-table-header">
              <span>Medicine</span>
              <span>Dosage</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Status</span>
              <span>Prescription</span>
              <span>Update stock</span>
            </div>

            {inventory.map((item) => (
              <div
                className="inventory-table-row"
                key={item._id}
              >
                <div className="inventory-medicine-info">
                  {item.medicine.medicineImg && (
                    <img
                      className="inventory-medicine-image"
                      src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${item.medicine.medicineImg}`}
                      alt={item.medicine.brandName}
                    />
                  )}

                  <div>
                    <strong>{item.medicine.brandName}</strong>

                    <p>{item.medicine.genericName}</p>
                  </div>
                </div>

                <span>
                  {item.medicine.dosage}{' '}
                  {item.medicine.dosageForm}
                </span>

                <span>{item.medicine.category}</span>

                <span>{item.medicine.price} BD</span>

                <span className="inventory-stock">
                  {item.stock}
                </span>

                {/* Stock Status */}
                <span>
                  <span
                    className={
                      item.stockStatus === 'Low Stock'
                        ? 'badge badge-warning'
                        : item.stockStatus === 'Out of Stock'
                          ? 'badge badge-danger'
                          : 'badge badge-success'
                    }
                  >
                    {item.stockStatus}
                  </span>
                </span>

                {/* Prescription Status */}
                <span>
                  <span
                    className={
                      item.medicine.requiresPrescription
                        ? 'badge badge-gold'
                        : 'badge badge-light'
                    }
                  >
                    {item.medicine.requiresPrescription
                      ? 'Required'
                      : 'Not Required'}
                  </span>
                </span>

                <div className="inventory-actions">
                  <input
                    className="stock-input"
                    type="number"
                    min="0"
                    placeholder="Stock"
                    value={stockUpdates[item._id] || ''}
                    onChange={(event) =>
                      setStockUpdates({
                        ...stockUpdates,
                        [item._id]: event.target.value
                      })
                    }
                  />

                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={() =>
                      handleUpdateStock(item._id)
                    }
                  > Update</button>

                  <button
                    className="btn btn-danger inventory-remove"
                    type="button"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ManageInventory