const io = require('../sockets/bidSocket').io;

exports.notifyUsers = (itemId, message) => {
    io.to(itemId).emit('update', message);
};
