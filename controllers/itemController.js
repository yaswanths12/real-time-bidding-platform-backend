const Item = require('../models/itemModel');
const { Op } = require('sequelize');

exports.getItems = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    try {
        const items = await Item.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            },
            limit,
            offset
        });
        res.json({
            items: items.rows,
            total: items.count,
            page: Number(page),
            pages: Math.ceil(items.count / limit)
        });
    } catch (err) {
        res.status(400).json({ message: 'Error fetching items', error: err.message });
    }
};

exports.getItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching item', error: err.message });
    }
};

exports.createItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
        const item = await Item.create({
            name,
            description,
            starting_price,
            current_price: starting_price,
            image_url: imageUrl,
            end_time
        });
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: 'Error creating item', error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, starting_price, end_time } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (req.user.id !== item.user_id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        item.name = name;
        item.description = description;
        item.starting_price = starting_price;
        item.end_time = end_time;
        if (imageUrl) item.image_url = imageUrl;

        await item.save();
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: 'Error updating item', error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (req.user.id !== item.user_id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await item.destroy();
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting item', error: err.message });
    }
};
