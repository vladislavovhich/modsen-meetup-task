const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('modsenmeetups_db', 'modsenmeetupsuser', 'ouHzgAEBUUqSpNTm84oeTEo7dAnyNSHP', {
    host: 'dpg-cpqmgiaj1k6c73bj917g-a',
    dialect: 'postgres'
});

module.exports = sequelize


