const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meetups_db', 'postgres', '55155', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize


