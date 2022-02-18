const DataTypes = require('sequelize');
const db = require('../config/db');

//Définition du schema de la table Post

const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    freezeTableName : true,
});


module.exports = Post;