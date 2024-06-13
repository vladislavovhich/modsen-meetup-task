const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Meetup = sequelize.define(
    "meetup",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        }, 
        place: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
    },
)

module.exports = Meetup