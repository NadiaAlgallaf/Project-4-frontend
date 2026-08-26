import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import SignupPage from './pages/Auth/SignupPage'
import Homepage from './pages/Home/Homepage'
import SignInPage from './pages/Auth/SigninPage'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import { getCurrentUser, logout } from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

import ManageInventory from './pages/PharmacyPortal/ManageInventory'
import PharmacyReservations from './pages/PharmacyPortal/PharmacyReservations'
import MyReservations from './pages/Reservations/MyReservations'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/pharmacy/inventory" element={<ManageInventory />} />
        <Route
          path="/pharmacy/reservations"
          element={<PharmacyReservations />}
        />
        <Route path="/my-reservations" element={<MyReservations />} />
      </Routes>
    </div>
  )
}

export default App
