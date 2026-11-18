import { useEffect, useState } from 'react'

export default function Dashboard({ req }) {
  const [s, setS] = useState(null)

  useEffect(() => {
    req('/orders/stats').then(setS).catch(() => {})
  }, [])

  if (!s) return <p>Loading...</p>

  const cards = [
    ['Products', s.products],
    ['Orders', s.orders],
    ['Customers', s.users],
    ['Revenue', `Rs. ${s.revenue.toLocaleString()}`],
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-white p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
