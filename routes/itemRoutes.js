const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const authenticateToken = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', authenticateToken, allowRoles('user', 'admin'), upload.single('image'), createItem);
router.put('/:id', authenticateToken, allowRoles('user', 'admin'), upload.single('image'), updateItem);
router.delete('/:id', authenticateToken, allowRoles('user', 'admin'), deleteItem);

module.exports = router;
