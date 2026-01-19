const express = require('express');
const { getTransactions } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware'); // Need to create middleware
const router = express.Router();

router.get('/', getTransactions); // Add protect middleware if needed, but for demo maybe open?

module.exports = router;
