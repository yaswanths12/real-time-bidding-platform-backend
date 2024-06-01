const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getNotifications);
router.post('/mark-read', authenticateToken, markAsRead);

module.exports = router;
