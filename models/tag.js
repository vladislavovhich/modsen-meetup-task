const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const User = require("./user")

const Tag = sequelize.define(
    "tag",
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

Tag.belongsTo(User)
User.hasMany(Tag)

module.exports = Tag
