const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders/:userId - Create a new order for a specific user
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { products } = req.body;

    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      total += product.price * item.quantity;
    }

    const newOrder = new Order({
      customerId: userId,
      products,
      totalAmount: total
    });

    await newOrder.save();
    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders/:userId - Get all orders for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ customerId: userId }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    console.error("Fetching orders error:", err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;