// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../utils/db');

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     username: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false
//     },
//     role: {
//         type: DataTypes.STRING,
//         defaultValue: 'user'
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW
//     }
// }, {
//     timestamps: false
// });

// module.exports = User;


const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

console.log('Imported sequelize instance:', sequelize); // Add this for debugging

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = User;
