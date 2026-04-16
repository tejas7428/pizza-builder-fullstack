import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['base', 'sauce', 'cheese', 'veggie', 'meat'],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  threshold: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  }
}, {
  timestamps: true
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

export default InventoryItem;