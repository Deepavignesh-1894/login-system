// models/StudentRequest.js
const mongoose = require('mongoose');

const studentRequestSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  reason: String,
  proofUrl: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('StudentRequest', studentRequestSchema);
