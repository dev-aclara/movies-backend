const sequelize = require('sequelize');
const connect = require('../connection');

const perfil = connect.define('perfis',{
    idUsuario:{
        type: sequelize.STRING,
    },
    nome:{
        type: sequelize.STRING,
        allowNull: false
    },
    
})
perfil.sync({ logging: console.log });

module.exports = perfil;