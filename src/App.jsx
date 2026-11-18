import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { api } from './api'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('admin_token'))

  const login = (t) => {
    localStorage.setItem('admin_token', t)
    setToken(t)
  }
  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }
  // Authenticated request; token expire ho jaye to automatically logout
  const req = (path, opts = {}) =>
    api(path, { ...opts, token }).catch((e) => {
      if (e.status === 401 || e.status === 403) logout()
      throw e
    })

  if (!token) return <Login onLogin={login} />

  return (
    <Layout onLogout={logout}>
      <Routes>
        <Route path="/" element={<Dashboard req={req} />} />
        <Route path="/products" element={<Products req={req} />} />
        <Route path="/orders" element={<Orders req={req} />} />
      </Routes>
    </Layout>
  )
}
