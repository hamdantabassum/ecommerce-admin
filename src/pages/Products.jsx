import { useEffect, useState } from 'react'

const empty = { name: '', description: '', price: '', image: '', category: 'Clothing', stock: '' }
const categories = ['Clothing', 'Shoes', 'Electronics', 'Accessories']

export default function Products({ req }) {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(null)
  const [error, setError] = useState('')

  const load = () => req('/products').then(setProducts).catch(() => {})
  useEffect(() => { load() }, [])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const save = async (e) => {
    e.preventDefault()
    setError('')
    const { _id, __v, createdAt, updatedAt, ...rest } = form
    const body = { ...rest, price: Number(rest.price), stock: Number(rest.stock) }
    try {
      if (_id) await req(`/products/${_id}`, { method: 'PUT', body })
      else await req('/products', { method: 'POST', body })
      setForm(null)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return
    await req(`/products/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="btn" onClick={() => { setError(''); setForm(empty) }}>Add product</button>
      </div>

      {form && (
        <form onSubmit={save} className="mb-6 grid max-w-2xl gap-3 rounded-lg border bg-white p-4 sm:grid-cols-2">
          <input className="input" placeholder="Name" required value={form.name} onChange={set('name')} />
          <select className="input" value={form.category} onChange={set('category')}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input className="input" type="number" min="0" placeholder="Price (Rs.)" required value={form.price} onChange={set('price')} />
          <input className="input" type="number" min="0" placeholder="Stock" required value={form.stock} onChange={set('stock')} />
          <input className="input sm:col-span-2" placeholder="Image URL" value={form.image} onChange={set('image')} />
          <textarea className="input sm:col-span-2" rows="3" placeholder="Description" value={form.description} onChange={set('description')} />
          {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
          <div className="flex gap-2 sm:col-span-2">
            <button className="btn">{form._id ? 'Save changes' : 'Add product'}</button>
            <button type="button" className="rounded-md border px-4 py-2 text-sm" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </form>
      )}

      <table className="w-full min-w-[560px] rounded-lg border bg-white text-left text-sm">
        <thead className="border-b bg-slate-50">
          <tr><th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3"></th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b last:border-0">
              <td className="flex items-center gap-3 p-3">
                <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                {p.name}
              </td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">Rs. {p.price.toLocaleString()}</td>
              <td className="p-3">{p.stock}</td>
              <td className="space-x-3 p-3 text-right">
                <button className="text-indigo-600" onClick={() => { setError(''); setForm(p) }}>Edit</button>
                <button className="text-red-600" onClick={() => remove(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && <p className="mt-4 text-sm">No products yet. Add your first product.</p>}
    </div>
  )
}
