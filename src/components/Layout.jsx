import { NavLink } from 'react-router-dom'

const link = ({ isActive }) =>
  `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`

export default function Layout({ children, onLogout }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex shrink-0 flex-row items-center gap-2 border-b bg-white p-3 md:w-56 md:flex-col md:items-stretch md:border-b-0 md:border-r md:p-4">
        <h1 className="mr-4 font-bold text-indigo-600 md:mb-4 md:mr-0">ShopEase Admin</h1>
        <NavLink to="/" end className={link}>Dashboard</NavLink>
        <NavLink to="/products" className={link}>Products</NavLink>
        <NavLink to="/orders" className={link}>Orders</NavLink>
        <button onClick={onLogout} className="ml-auto rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 md:ml-0 md:mt-auto">
          Logout
        </button>
      </aside>
      <main className="flex-1 overflow-x-auto p-4 md:p-8">{children}</main>
    </div>
  )
}
