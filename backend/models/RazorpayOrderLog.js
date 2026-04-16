import mongoose from 'mongoose';

const razorpayOrderLogSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created'
  }
}, {
  timestamps: true
});

const RazorpayOrderLog = mongoose.model('RazorpayOrderLog', razorpayOrderLogSchema);

export default RazorpayOrderLog;