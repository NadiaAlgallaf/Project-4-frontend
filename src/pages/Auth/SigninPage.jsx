// src/components/SignInForm/SignInForm.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signIn } from '../../services/authService.js'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'

const SignInForm = () => {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

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
      const signedInUser = await signIn(formData)

      setUser(signedInUser)

      // Both User and Pharmacy go to the dashboard
      navigate('/dashboard')
    } catch (err) {
      console.log(err)

      setError(err?.response?.data?.message || 'Could not sign in')
    }
  }

  return (
    <main className="page-container">
      <div className="form-card">
        <div className="page-header">
          <h1 className="page-title">{t('auth.signIn.title')}</h1>

          <p className="page-subtitle">Sign in to your Dawa account.</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">{t('auth.signIn.username')}:</label>

            <input
              className="form-input"
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('auth.signIn.password')}:</label>

            <input
              className="form-input"
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              {t('auth.signIn.submit')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              onClick={() => navigate('/')}
            >
              {t('auth.signIn.cancel')}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default SignInForm
