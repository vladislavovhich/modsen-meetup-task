const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./user')

const Role = sequelize.define(
    "role",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
    },
)

User.belongsTo(Role)
Role.hasMany(User)

module.exports = Role