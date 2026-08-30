import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit } from 'lucide-react';
import API from '../../api/axios';

const ManageProductsPage = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', unit: 'KG', isAvailable: true
  });

  useEffect(() => { fetchProducts(); }, [shopId]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/public/shops/${shopId}/products`);
      setProducts(res.data.data);
    } catch (err) { toast.error('Failed to load products'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        const res = await API.put(`/merchant/products/${editProduct.id}`, form);
        setProducts(products.map(p => p.id === editProduct.id ? res.data.data : p));
        toast.success('Product updated!');
      } else {
        const res = await API.post(`/merchant/shops/${shopId}/products`, form);
        setProducts([...products, res.data.data]);
        toast.success('Product added!');
      }
      resetForm();
    } catch (err) { toast.error('Failed to save product'); }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/merchant/products/${productId}`);
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted');
    } catch (err) { toast.error('Failed to delete'); }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({ name: product.name, description: product.description || '',
              price: product.price || '', unit: product.unit || 'KG',
              isAvailable: product.isAvailable });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', unit: 'KG', isAvailable: true });
    setEditProduct(null);
    setShowForm(false);
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Manage Products</h1>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2
                     rounded-xl text-sm font-semibold hover:bg-green-700">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <h2 className="font-semibold text-gray-700 mb-4">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Product name *" value={form.name} required
                   onChange={e => setForm({ ...form, name: e.target.value })}
                   className={inputClass} />
            <input type="text" placeholder="Description (optional)" value={form.description}
                   onChange={e => setForm({ ...form, description: e.target.value })}
                   className={inputClass} />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Price (₹)" value={form.price}
                     onChange={e => setForm({ ...form, price: e.target.value })}
                     className={inputClass} />
              <select value={form.unit}
                      onChange={e => setForm({ ...form, unit: e.target.value })}
                      className={inputClass}>
                {['KG', 'Gram', 'Litre', 'ML', 'Piece', 'Dozen', 'Packet'].map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.isAvailable}
                     onChange={e => setForm({ ...form, isAvailable: e.target.checked })}
                     className="accent-green-600" />
              Currently available
            </label>
            <div className="flex gap-3">
              <button type="submit"
                className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-semibold
                           hover:bg-green-700">
                {editProduct ? 'Update' : 'Add Product'}
              </button>
              <button type="button" onClick={resetForm}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-semibold
                           hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">📦</div>
          <p>No products yet. Add your first product!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map(product => (
            <div key={product.id}
                 className="bg-white rounded-xl border border-gray-100 shadow-sm p-4
                            flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                {product.description && (
                  <p className="text-xs text-gray-500">{product.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  {product.price && (
                    <span className="text-green-600 font-bold text-sm">
                      ₹{product.price}/{product.unit}
                    </span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full
                    ${product.isAvailable ? 'bg-green-100 text-green-600'
                                          : 'bg-gray-100 text-gray-500'}`}>
                    {product.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(product.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProductsPage;