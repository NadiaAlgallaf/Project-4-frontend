import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, role }) {
  const { loading, user } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/sign-in" replace />
  }

  // User is logged in but does not have the required role
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute