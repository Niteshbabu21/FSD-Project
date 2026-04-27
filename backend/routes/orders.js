const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { userEmail, items, totalAmount, paymentMethod, address } = req.body;
    if (!userEmail || !items?.length)
      return res.status(400).json({ message: 'Missing required fields' });

    const order = await Order.create({
      userEmail,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'COD',
      address,
      orderStatus: 'placed',
      tracking: [
        { status: 'placed',     message: 'Order placed successfully' },
        { status: 'processing', message: 'Seller is preparing your order' },
      ],
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders?email=...
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/orders/:id/status  — update status (admin use)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, message } = req.body;
    const allowed = ['placed','processing','dispatched','delivered','cancelled'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const statusMessages = {
      dispatched: 'Your order is on the way',
      delivered:  'Order delivered successfully',
      cancelled:  'Order has been cancelled',
    };

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: status,
        $push: { tracking: { status, message: message || statusMessages[status] || status } }
      },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;