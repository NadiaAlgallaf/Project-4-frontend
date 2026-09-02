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
        <Link to="/" className="navbar-logo">
          <img src={dawaLogo} alt="Dawa" />
        </Link>

        <div className="navbar-links">
          <Link to="/">
            {t('nav.home')}
          </Link>

          <Link to="/medicines">
            {t('nav.medicines')}
          </Link>

          <Link to="/pharmacies">
            {t('nav.pharmacies')}
          </Link>

          {user ? (
            <>
              {user.role === 'User' && (
                <Link to="/my-reservations">
                  {t('nav.myReservations')}
                </Link>
              )}

              {user.role === 'Pharmacy' && (
                <>
                  <Link to="/pharmacy/dashboard">
                    {t('nav.dashboard')}
                  </Link>

                  <Link to="/pharmacy/inventory">
                    {t('nav.inventory')}
                  </Link>

                  <Link to="/pharmacy/reservations">
                    {t('nav.reservations')}
                  </Link>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>

      <div className="navbar-actions">
        {user ? (
          <button
            className="btn btn-primary"
            onClick={logout}
          >
            {t('nav.signOut')}
          </button>
        ) : (
          <>
            <Link
              to="/sign-up"
              className="btn btn-light"
            >
              {t('nav.signUp')}
            </Link>

            <Link
              to="/sign-in"
              className="btn btn-primary"
            >
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