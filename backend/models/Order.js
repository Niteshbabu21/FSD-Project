const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: String,
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true },
});

const trackingSchema = new mongoose.Schema({
  status:    String,
  message:   String,
  timestamp: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema({
  userEmail:     { type: String, required: true, lowercase: true },
  items:         [orderItemSchema],
  totalAmount:   { type: Number, required: true },
  paymentMethod: { type: String, default: 'COD' },
  address: { line1: String, city: String, state: String, pincode: String },
  orderStatus: {
    type:    String,
    enum:    ['placed', 'processing', 'dispatched', 'delivered', 'cancelled'],
    default: 'placed',
  },
  tracking: [trackingSchema],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);