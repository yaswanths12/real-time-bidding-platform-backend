const socketIo = require('socket.io');

let io;

exports.initialize = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`Client joined room: ${roomId}`);
        });

        socket.on('bid', (data) => {
            io.to(data.roomId).emit('update', data.message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

exports.io = () => io;
