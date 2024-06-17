const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define(
    "user",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    },
)

module.exports = User
