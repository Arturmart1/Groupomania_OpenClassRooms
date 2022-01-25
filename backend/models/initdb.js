// Database

const db = require('../config/db');

// DAO model

const User = require('./userSchema');
const Post = require('./postSchema');
const Comment = require('./commentSchema');

let Init = async () => {
    
    await User.sync({alter: true});
    await Post.sync({alter: true});
    await Comment.sync({alter: true});
}

module.exports = Init;