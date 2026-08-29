import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'

import SignupPage from './pages/Auth/SignupPage'
import SignInPage from './pages/Auth/SigninPage'
import Homepage from './pages/Home/Homepage'
import Dashboard from './pages/Dashboard'

import ProtectedRoute from './components/ProtectedRoute'

import ManageInventory from './pages/PharmacyPortal/ManageInventory'
import PharmacyReservations from './pages/PharmacyPortal/PharmacyReservations'
import PharmacyDashboard from './pages/PharmacyPortal/PharmacyDashboard'

import MyReservations from './pages/Reservations/MyReservations'
import ReservationDetails from './pages/Reservations/ReservationDetails'

import Medicines from './pages/Medicines/Medicines'
import MedicineDetails from './pages/Medicines/MedicineDetails'

import Pharmacies from './pages/Pharmacies/Pharmacies'
import PharmacyDetails from './pages/Pharmacies/PharmacyDetails'

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />

        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicines/:id" element={<MedicineDetails />} />

        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/pharmacies/:id" element={<PharmacyDetails />} />

        /* Logged-in users */
        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>}
        />

        <Route
          path="/my-reservations"element={ <ProtectedRoute> <MyReservations /> </ProtectedRoute> } />

        <Route path="/reservations/:id" element={ <ProtectedRoute> <ReservationDetails /> </ProtectedRoute>}
        />

        /* Pharmacy users only */ 
        <Route path="/pharmacy/dashboard" element={ <ProtectedRoute role="Pharmacy"> <PharmacyDashboard /> </ProtectedRoute> }
        />

        <Route path="/pharmacy/inventory" element={<ProtectedRoute role="Pharmacy"> <ManageInventory /> </ProtectedRoute>}
        />

        <Route path="/pharmacy/reservations" element={ <ProtectedRoute role="Pharmacy"> <PharmacyReservations /> </ProtectedRoute> } />
      </Routes>
    </div>
  )
}

export default App