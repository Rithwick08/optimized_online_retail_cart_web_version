const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

router.post("/", async (req, res) => {
  try {
    const { orderId, amount, method } = req.body;

    if (!orderId || !amount || !method) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payment = new Payment({ orderId, amount, method });
    await payment.save();

    res.json({ message: "Payment processed successfully", payment });
  } catch (error) {
    res.status(500).json({ error: "Failed to process payment" });
  }
});

module.exports = router;