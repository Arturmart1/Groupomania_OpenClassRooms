// DAO model

const User = require('./userSchema');
const Post = require('./postSchema');
const Comment = require('./commentSchema');

const Init = async () => {
    User.belongsTo(Post, {onDelete:'CASCADE'});
    User.hasMany(Comment, {onDelete:'CASCADE'});
    Post.belongsTo(User, {onDelete:'CASCADE'});
    Post.hasMany(Comment, {onDelete:'CASCADE'});
    Comment.belongsTo(User);
    Comment.belongsTo(Post);
    await User.sync({/*alter: true*/});
    await Post.sync({/*alter: true*/});
    await Comment.sync({/*alter: true*/});
}

module.exports = Init;