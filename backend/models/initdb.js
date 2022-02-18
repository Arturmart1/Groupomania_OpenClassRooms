// DAO model

const User = require('./userSchema');
const Post = require('./postSchema');
const Comment = require('./commentSchema');

const Init = async () => {
    Post.belongsTo(User, {onDelete: 'CASCADE'});
    Post.hasMany(Comment, {onDelete: 'CASCADE'});
    Comment.belongsTo(User);
    await User.sync({/*alter: true*/});
    await Post.sync({/*alter: true*/});
    await Comment.sync({/*alter: true*/});
}

module.exports = Init;