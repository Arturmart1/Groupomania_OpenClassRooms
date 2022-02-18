const DataTypes = require('sequelize');
const db = require('../config/db');

const Comment = db.define('Comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName : true,
});

module.exports = Comment;