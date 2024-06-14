const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')
const Tag = require("./tag")

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

Meetup.belongsToMany(Tag, { through: 'meetup_tag' });
Tag.belongsToMany(Meetup, { through: 'meetup_tag' });

module.exports = Meetup