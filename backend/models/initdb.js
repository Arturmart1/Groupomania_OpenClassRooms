// Database

const db = require('../config/db');

// DAO model

const User = require('./userSchema');
const Post = require('./postSchema');

let Init = async () => {
    
    await User.sync(/*{alter: true}*/);
    await Post.sync(/*{alter: true}*/);
}

module.exports = Init;