const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Optional: if using .env for config

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const app = express();
const PORT = 3000;
const path = require('path');
const paymentRoutes = require('./routes/payments');
const customerRoutes = require('./routes/customers'); // Adjust path if needed

// Middleware
const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5501"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
// Routes
app.use('/api/auth', authRoutes);       // For /register, /login
app.use('/api/products', productRoutes); // For products-related operations
app.use('/api/orders', orderRoutes);
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/payments", paymentRoutes);
app.use('/api/customers', customerRoutes);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/optimized_cart_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});