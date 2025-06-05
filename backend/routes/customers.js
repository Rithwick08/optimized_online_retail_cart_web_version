const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }, '_id username email');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Delete customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const customer = await User.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;