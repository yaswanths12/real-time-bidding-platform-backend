// require('dotenv').config();

// const express = require('express');
// const http = require('http');
// const sequelize = require('./utils/db');
// const authRoutes = require('./routes/authRoutes');
// const itemRoutes = require('./routes/itemRoutes');
// const bidRoutes = require ('./routes/bidRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
// const errorHandler = require('./middleware/errorHandler');
// const { initialize } = require('./sockets/bidSocket');

// const app = express();
// const server = http.createServer(app);

// app.use(express.json());
// app.use('/users', authRoutes);
// app.use('/items', itemRoutes);
// app.use('/bids', bidRoutes);
// app.use('/notifications', notificationRoutes);
// app.use(errorHandler);


// initialize(server);

// const PORT = process.env.PORT || 3000;

// sequelize.sync()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// module.exports = app;

require('dotenv').config();

const express = require('express');
const http = require('http');
const sequelize = require('./utils/db'); // Import the database connection
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middleware/errorHandler');
const { initialize } = require('./sockets/bidSocket');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);
app.use(errorHandler);

initialize(server);

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = app;
