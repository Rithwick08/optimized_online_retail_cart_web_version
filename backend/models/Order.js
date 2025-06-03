const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);