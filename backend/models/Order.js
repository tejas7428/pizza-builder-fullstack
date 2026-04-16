import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderStatusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  paymentId: {
    type: String
  },
  paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'],
    default: 'Received'
  },
  statusHistory: [orderStatusHistorySchema]
}, {
  timestamps: true
});

// Add status to history when status changes
orderSchema.pre('save', function(next) {
  if (this.isModified('status') && this.statusHistory.length > 0) {
    const lastStatus = this.statusHistory[this.statusHistory.length - 1].status;
    if (lastStatus !== this.status) {
      this.statusHistory.push({ status: this.status });
    }
  } else if (this.statusHistory.length === 0) {
    this.statusHistory.push({ status: this.status });
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;