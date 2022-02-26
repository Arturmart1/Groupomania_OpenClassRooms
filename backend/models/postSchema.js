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
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    freezeTableName : true,
});


module.exports = Post;