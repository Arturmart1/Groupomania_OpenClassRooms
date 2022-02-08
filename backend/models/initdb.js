// Database

const db = require('../config/db');

// DAO model

const User = require('./userSchema');
const Post = require('./postSchema');
const Comment = require('./commentSchema');

const Init = async () => {
    
    await User.sync({/*alter: true*/});
    await Post.sync({/*alter: true*/});
    await Comment.sync({/*alter: true*/});
    User.belongsTo(Post, {foreignKey: 'postId'}, {onDelete:'CASCADE'});
    Post.belongsTo(User, {foreignKey: 'userId'}, {onDelete:'CASCADE'});
    Post.hasMany(Comment, {foreignKey: 'postId'}, {onDelete:'CASCADE'});
    Comment.belongsTo(User, {foreignKey: 'userId'});
    Comment.belongsTo(Post, {foreignKey: 'postId'});
}

module.exports = Init;