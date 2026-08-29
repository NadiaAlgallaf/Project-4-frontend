import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Navbar() {
  const { t } = useTranslation()
  const { logout, user } = useAuth()

  return (
    <nav>
      {/* Links available for everyone */}
      <Link to="/">{t('nav.home')}</Link>
      <Link to="/medicines">Medicines</Link>
      <Link to="/pharmacies">Pharmacies</Link>

      {user ? (
        <>
          {/* Links for User */}
          {user.role === 'User' && (
            <Link to="/my-reservations">My Reservations</Link>
          )}

          {/* Links for Pharmacy */}
          {user.role === 'Pharmacy' && (
            <>
              <Link to="/pharmacy/dashboard">Dashboard</Link>

              <Link to="/pharmacy/inventory">Inventory</Link>

              <Link to="/pharmacy/reservations">Reservations</Link>
            </>
          )}

          {/* Available for any signed in*/}
          <button onClick={logout}>{t('nav.signOut')}</button>
        </>
      ) : (
        <>
          {/* Links for users who are not signed in */}
          <Link to="/sign-up">{t('nav.signUp')}</Link>

          <Link to="/sign-in">{t('nav.signIn')}</Link>
        </>
      )}

      <LanguageSwitcher />
    </nav>
  )
}

export default Navbar
