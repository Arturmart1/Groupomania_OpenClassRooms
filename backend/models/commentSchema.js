const DataTypes = require('sequelize');
const db = require('../config/db');

const Comment = db.define('Comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
},{
    freezeTableName : true,
});

module.exports = Comment;