import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaCapsules,
  FaHospital,
  FaClipboardList,
  FaBoxesStacked
} from 'react-icons/fa6'

function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <main className="dashboard-container">
      {/* Welcome */}
      <div className="dashboard-welcome">
        <div className="dashboard-avatar">
          <FaUser />
        </div>

        <div>
          <p>Welcome back</p>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <span>{user.role} Account</span>
        </div>
      </div>

      {/* Account Information */}
      <section className="dashboard-info-section">
        <h2>Account Information</h2>

        <div className="dashboard-info-grid">
          <div className="dashboard-info-item">
            <FaUser className="dashboard-info-icon" />

            <div>
              <span>Username</span>
              <p>{user.username}</p>
            </div>
          </div>

          <div className="dashboard-info-item">
            <FaEnvelope className="dashboard-info-icon" />

            <div>
              <span>Email</span>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="dashboard-info-item">
            <FaUserTag className="dashboard-info-icon" />

            <div>
              <span>Account Type</span>
              <p>{user.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Dashboard */}
      {user.role === 'User' && (
        <section className="dashboard-actions-section">
          <h2>Quick Actions</h2>

          <div className="dashboard-action-grid">
            <Link to="/medicines" className="dashboard-action-card">
              <div className="dashboard-action-icon">
                <FaCapsules />
              </div>

              <h3>Find Medicine</h3>
              <p>Search medicines and check where they are available.</p>
            </Link>

            <Link to="/pharmacies" className="dashboard-action-card">
              <div className="dashboard-action-icon">
                <FaHospital />
              </div>

              <h3>Find Pharmacy</h3>
              <p>Browse pharmacies and view their available medicines.</p>
            </Link>

            <Link to="/my-reservations" className="dashboard-action-card">
              <div className="dashboard-action-icon">
                <FaClipboardList />
              </div>

              <h3>My Reservations</h3>
              <p>Check your medicine reservations and their status.</p>
            </Link>
          </div>
        </section>
      )}

      {/* Pharmacy Dashboard */}
      {user.role === 'Pharmacy' && (
        <section className="dashboard-actions-section">
          <h2>Pharmacy Management</h2>

          <div className="dashboard-action-grid">
            <Link to="/pharmacy/inventory" className="dashboard-action-card">
              <div className="dashboard-action-icon">
                <FaBoxesStacked />
              </div>

              <h3>Manage Inventory</h3>
              <p>View medicines, stock quantities and manage your inventory.</p>
            </Link>

            <Link to="/pharmacy/reservations" className="dashboard-action-card">
              <div className="dashboard-action-icon">
                <FaClipboardList />
              </div>

              <h3>Reservations</h3>
              <p>Review and manage customer medicine reservations.</p>
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}

export default Dashboard
