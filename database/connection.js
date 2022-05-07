const sequelize = require('sequelize');

const connect = new sequelize('jera', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connect;