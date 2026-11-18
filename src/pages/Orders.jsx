import { useEffect, useState } from 'react'

const statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled']

export default function Orders({ req }) {
  const [orders, setOrders] = useState(null)

  const load = () => req('/orders').then(setOrders).catch(() => setOrders([]))
  useEffect(() => { load() }, [])

  const changeStatus = async (id, status) => {
    await req(`/orders/${id}`, { method: 'PUT', body: { status } })
    load()
  }

  if (!orders) return <p>Loading...</p>

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="w-full min-w-[640px] rounded-lg border bg-white text-left text-sm">
          <thead className="border-b bg-slate-50">
            <tr><th className="p-3">Customer</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Address</th><th className="p-3">Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b align-top last:border-0">
                <td className="p-3">{o.user?.name}<br /><span className="text-slate-500">{o.user?.email}</span></td>
                <td className="p-3">{o.items.map((i, idx) => <div key={idx}>{i.name} x {i.qty}</div>)}</td>
                <td className="p-3">Rs. {o.total.toLocaleString()}</td>
                <td className="p-3">{o.address?.name}, {o.address?.phone}<br />{o.address?.address}, {o.address?.city}</td>
                <td className="p-3">
                  <select className="input !w-auto" value={o.status} onChange={(e) => changeStatus(o._id, e.target.value)}>
                    {statuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
