// DAO model

const User = require('./userSchema');
const Post = require('./postSchema');
const Comment = require('./commentSchema');

const Init = async () => {
    User.hasMany(Post, {onDelete:'CASCADE'});
    Post.belongsTo(User, {onDelete: 'CASCADE'});
    User.hasMany(Comment, {onDelete: 'CASCADE'});
    Comment.belongsTo(User);
    Post.hasMany(Comment, {onDelete: 'CASCADE'});
    await User.sync({/*alter: true*/});
    await Post.sync({/*alter: true*/});
    await Comment.sync({/*alter: true*/});
}

module.exports = Init;