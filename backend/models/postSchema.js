const DataTypes = require('sequelize');
const db = require('../config/db');

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
        allowNull: false,
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
    userliked: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    freezeTableName: true,
});

module.exports = Post;