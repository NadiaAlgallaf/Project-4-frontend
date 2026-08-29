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

      if (signedInUser.role === 'Pharmacy') {
        navigate('/pharmacy/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.log(err)

      setError(err?.response?.data?.message || 'Could not sign in')
    }
  }

  return (
    <main>
      <h1>{t('auth.signIn.title')}</h1>

      {error && <p className="error">{error}</p>}

      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">{t('auth.signIn.username')}:</label>

          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">{t('auth.signIn.password')}:</label>

          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">{t('auth.signIn.submit')}</button>

          <button type="button" onClick={() => navigate('/')}>
            {t('auth.signIn.cancel')}
          </button>
        </div>
      </form>
    </main>
  )
}

export default SignInForm
