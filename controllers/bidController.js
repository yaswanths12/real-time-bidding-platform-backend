const Bid = require('../models/bidModel');
const Item = require('../models/itemModel');
const Notification = require('../models/notificationModel');
const { notifyUsers } = require('../services/notificationService');

exports.getBids = async (req, res) => {
    const { itemId } = req.params;

    try {
        const bids = await Bid.findAll({ where: { item_id: itemId } });
        res.json(bids);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching bids', error: err.message });
    }
};

exports.createBid = async (req, res) => {
    const { itemId } = req.params;
    const { bid_amount } = req.body;

    try {
        const item = await Item.findByPk(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (new Date() > new Date(item.end_time)) {
            return res.status(400).json({ message: 'Auction has ended' });
        }

        if (bid_amount <= item.current_price) {
            return res.status(400).json({ message: 'Bid amount must be higher than current price' });
        }

        const bid = await Bid.create({
            item_id: itemId,
            user_id: req.user.id,
            bid_amount
        });

        item.current_price = bid_amount;
        await item.save();

        await Notification.create({
            user_id: item.user_id,
            message: `You have a new bid of $${bid_amount} on your item ${item.name}`
        });

        notifyUsers(itemId, `New bid of $${bid_amount} on item ${item.name}`);

        res.status(201).json(bid);
    } catch (err) {
        res.status(400).json({ message: 'Error placing bid', error: err.message });
    }
};
