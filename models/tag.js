const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

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

module.exports = Tag
