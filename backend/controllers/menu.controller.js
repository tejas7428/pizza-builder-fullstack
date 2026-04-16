import InventoryItem from '../models/InventoryItem.js';

// @desc    Get menu items grouped by category
// @route   GET /api/menu
// @access  Private
export const getMenu = async (req, res) => {
  try {
    // Get all inventory items with stock > 0
    const items = await InventoryItem.find({ stock: { $gt: 0 } });
    
    // Group items by category
    const menu = {
      bases: items.filter(item => item.category === 'base'),
      sauces: items.filter(item => item.category === 'sauce'),
      cheeses: items.filter(item => item.category === 'cheese'),
      veggies: items.filter(item => item.category === 'veggie'),
      meats: items.filter(item => item.category === 'meat')
    };
    
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};