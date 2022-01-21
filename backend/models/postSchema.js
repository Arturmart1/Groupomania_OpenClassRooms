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
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
},{
    freezeTableName : true,
    //Relation avec la table Comment
    hasMany: {
        model: 'Comment',
        foreignKey: 'postId',
    },
});

module.exports = Post;