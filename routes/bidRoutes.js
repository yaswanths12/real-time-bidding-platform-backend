const express = require('express');
const { getBids, createBid } = require('../controllers/bidController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:itemId/bids', getBids);
router.post('/:itemId/bids', authenticateToken, createBid);

module.exports = router;
