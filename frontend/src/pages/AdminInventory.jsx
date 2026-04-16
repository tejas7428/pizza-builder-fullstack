import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInventory, updateInventoryItem } from '../services/api';

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getInventory();
        setInventory(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInventory();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      name: item.name,
      price: item.price,
      stock: item.stock,
      threshold: item.threshold
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditForm({});
  };

  const handleSave = async (itemId) => {
    try {
      await updateInventoryItem(itemId, editForm);
      const response = await getInventory();
      setInventory(response.data);
      setEditingItem(null);
      setEditForm({});
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm({
      ...editForm,
      [field]: value
    });
  };

  // Group inventory by category
  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  if (loading) {
    return <div className="admin-inventory">Loading inventory...</div>;
  }

  if (error) {
    return <div className="admin-inventory error">{error}</div>;
  }

  return (
    <div className="admin-inventory">
      <div className="admin-header">
        <h2>Inventory Management</h2>
        <Link to="/admin" className="btn btn-secondary">Back to Admin Dashboard</Link>
      </div>
      
      {Object.entries(groupedInventory).map(([category, items]) => (
        <div key={category} className="inventory-category">
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}s</h3>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Threshold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className={item.stock < item.threshold ? 'low-stock' : ''}>
                  {editingItem === item._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editForm.stock}
                          onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editForm.threshold}
                          onChange={(e) => handleInputChange('threshold', parseInt(e.target.value))}
                        />
                      </td>
                      <td>
                        {item.stock < item.threshold ? 'Low Stock' : 'In Stock'}
                      </td>
                      <td>
                        <button onClick={() => handleSave(item._id)} className="btn btn-primary">Save</button>
                        <button onClick={handleCancelEdit} className="btn btn-secondary">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      <td>{item.threshold}</td>
                      <td>
                        {item.stock < item.threshold ? (
                          <span className="status low-stock">Low Stock</span>
                        ) : (
                          <span className="status in-stock">In Stock</span>
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleEdit(item)} className="btn btn-primary">Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminInventory;