const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    starting_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    current_price: {
        type: DataTypes.DECIMAL,
        defaultValue: null
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

module.exports = Item;
