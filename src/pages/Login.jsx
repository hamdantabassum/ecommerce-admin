import { useState } from 'react'
import { api } from '../api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api('/auth/login', { method: 'POST', body: { email, password } })
      if (data.user.role !== 'admin') throw new Error('This account is not an admin')
      onLogin(data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-3 rounded-lg border bg-white p-6">
        <h1 className="text-xl font-bold">Admin login</h1>
        <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn w-full" disabled={loading}>{loading ? 'Please wait...' : 'Login'}</button>
      </form>
    </div>
  )
}
