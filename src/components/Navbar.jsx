import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import dawaLogo from '../assets/dawa-logo.png'

function Navbar() {
  const { t } = useTranslation()
  const { logout, user } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Links available for everyone */}
        <Link to="/" className="navbar-logo">
          <img src={dawaLogo} alt="Dawa" />
        </Link>

        <div className="navbar-links">
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
            </>
          ) : null}
        </div>
      </div>

      <div className="navbar-actions">
        {user ? (
          <>
            {/* Available for any signed in*/}
            <button className="btn btn-primary" onClick={logout}>
              {t('nav.signOut')}
            </button>
          </>
        ) : (
          <>
            {/* Links for users who are not signed in */}
            <Link to="/sign-up" className="btn btn-light">
              {t('nav.signUp')}
            </Link>

            <Link to="/sign-in" className="btn btn-primary">
              {t('nav.signIn')}
            </Link>
          </>
        )}

        <LanguageSwitcher />
      </div>
    </nav>
  )
}

export default Navbar
