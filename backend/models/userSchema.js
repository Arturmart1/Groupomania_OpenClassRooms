const DataTypes = require('sequelize');
const db = require('../config/db');

//Définition du schema de la table User

const User = db.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://i.postimg.cc/MHrVKYGM/default-profil-pict.jpg'
    },
},{
    freezeTableName : true,
});

module.exports = User;