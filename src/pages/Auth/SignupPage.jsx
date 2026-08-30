import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signUp } from '../../services/authService.js'
import { useTranslation } from 'react-i18next'

function Signup() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConf: '',
    role: '',
    pharmacyName: '',
    location: '',
    phone: ''
  })

  const {
    username,
    firstName,
    lastName,
    email,
    password,
    passwordConf,
    role,
    pharmacyName,
    location,
    phone
  } = formData

  function handleChange(event) {
    setError('')

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSubmitting(true)

      await signUp(formData)

      navigate('/sign-in')
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Could not create account')
      setSubmitting(false)
    }
  }

  function isFormInvalid() {
    if (
      !username ||
      !email ||
      !password ||
      !passwordConf ||
      !role ||
      password !== passwordConf
    ) {
      return true
    }

    if (role === 'User') {
      return !firstName || !lastName
    }

    if (role === 'Pharmacy') {
      return !pharmacyName || !location || !phone
    }

    return true
  }

  return (
    <main className="page-container">
      <div className="form-card">
        <div className="page-header">
          <h1 className="page-title">{t('auth.signUp.title')}</h1>
          <p className="page-subtitle">Create your Dawa account.</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Account Type:</label>

            <select
              className="form-input"
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              required
            >
              <option value="">Select account type</option>
              <option value="User">User</option>
              <option value="Pharmacy">Pharmacy</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="username">{t('auth.signUp.username')}:</label>

            <input
              className="form-input"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          {role === 'User' && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>

                <input
                  className="form-input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>

                <input
                  className="form-input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>

            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('auth.signUp.password')}:</label>

            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm">{t('auth.signUp.confirmPassword')}:</label>

            <input
              className="form-input"
              type="password"
              id="confirm"
              name="passwordConf"
              value={passwordConf}
              onChange={handleChange}
              required
            />
          </div>

          {role === 'Pharmacy' && (
            <>
              <div className="form-group">
                <label htmlFor="pharmacyName">Pharmacy Name:</label>

                <input
                  className="form-input"
                  type="text"
                  id="pharmacyName"
                  name="pharmacyName"
                  value={pharmacyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location:</label>

                <input
                  className="form-input"
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone:</label>

                <input
                  className="form-input"
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isFormInvalid() || submitting}
            >
              {submitting
                ? t('auth.signUp.submitting')
                : t('auth.signUp.submit')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              onClick={() => navigate('/')}
            >
              {t('auth.signUp.cancel')}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Signup
