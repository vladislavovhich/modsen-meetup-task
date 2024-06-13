const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tag = require('./tag')
const Meetup = require('./meetup')

const Meetup_Tag = sequelize.define('meetup_tag', {}, { timestamps: false });

Meetup.belongsToMany(Tag, { through: Meetup_Tag });
Tag.belongsToMany(Meetup, { through: Meetup_Tag });

module.exports = Meetup_Tag