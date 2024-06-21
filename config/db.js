const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('modsenmeetups_db', 'modsenmeetupsuser', 'ouHzgAEBUUqSpNTm84oeTEo7dAnyNSHP', {
    host: 'postgresql://modsenmeetupsuser:ouHzgAEBUUqSpNTm84oeTEo7dAnyNSHP@dpg-cpqmgiaj1k6c73bj917g-a/modsenmeetups_db',
    dialect: 'postgres'
});

module.exports = sequelize


