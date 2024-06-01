// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.BiddingPlatform, process.env.root, process.env.root, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
    

//     dialect: 'postgres'
// });


// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// module.exports = sequelize;


// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.BiddingPlatform, process.env.root, process.env.root, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
    

//     dialect: 'postgres'
// });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

console.log('Sequelize instance:', sequelize); // Add this for debugging

module.exports = sequelize;


