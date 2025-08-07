// routes/student.js
const express = require('express');
const router = express.Router();
const StudentRequest = require('../models/StudentRequest');

// Submit a new request
router.post('/send-request', async (req, res) => {
  try {
    const newRequest = new StudentRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while submitting request' });
  }
});

// Get all requests (for teacher)
router.get('/all-requests', async (req, res) => {
  try {
    const requests = await StudentRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Update request status (approve/reject)
router.put('/update-status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await StudentRequest.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
