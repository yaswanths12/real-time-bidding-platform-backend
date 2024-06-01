const Notification = require('../models/notificationModel');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
        res.json(notifications);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching notifications', error: err.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        await Notification.update({ is_read: true }, { where: { user_id: req.user.id, is_read: false } });
        res.json({ message: 'Notifications marked as read' });
    } catch (err) {
        res.status(400).json({ message: 'Error marking notifications as read', error: err.message });
    }
};
