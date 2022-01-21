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
        unique: true
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
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    freezeTableName : true,
});

module.exports = User;