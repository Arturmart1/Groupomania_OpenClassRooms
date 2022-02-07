// Database

const db = require('../config/db');

// DAO model

const User = require('./userSchema');
const Post = require('./postSchema');
const Comment = require('./commentSchema');

let Init = async () => {
    
    await User.sync({/*alter: true*/});
    await Post.sync({/*alter: true*/});
    await Comment.sync({/*alter: true*/});
    //User.belongsTo(Post, {through: 'PostLikes', foreignKey: 'userId'});
    //Post.belongsTo(User, {foreignKey: 'userId'});
    //Post.hasMany(Comment, {foreignKey: 'postId'});
    //Comment.belongsTo(Post, {foreignKey: 'postId'});
    //Comment.belongsTo(User, {foreignKey: 'userId'});
}

module.exports = Init;