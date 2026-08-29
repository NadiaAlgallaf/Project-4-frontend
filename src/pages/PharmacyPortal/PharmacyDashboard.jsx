import { Link } from 'react-router'

function PharmacyDashboard() {
  return (
    <main>
      <h1>Pharmacy Dashboard</h1>

      <p>Manage your pharmacy inventory and reservations.</p>

      <div>
        <Link to="/pharmacy/inventory">Manage Inventory</Link>
      </div>

      <div>
        <Link to="/pharmacy/reservations">View Reservations</Link>
      </div>
    </main>
  )
}

export default PharmacyDashboard
