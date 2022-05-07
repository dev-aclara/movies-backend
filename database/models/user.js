const sequelize = require('sequelize');
const connect = require('../connection');

const user = connect.define('users',{
    email:{
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha:{
        type: sequelize.STRING,
        allowNull: false
    },
    dataNascimento:{
        type: sequelize.STRING,
        allowNull: false
    },
    
})
user.sync({ logging: console.log });

module.exports = user;