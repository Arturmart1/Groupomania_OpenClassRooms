// Database
const db = require('../config/db');
// DAO model
const User = require('./userSchema');
const Post = require('./postSchema');
// Uility
//const Populate = require('./populate');

let Init = async () => {
    
    // Démarre 2 tâches en parallèle et on attend que les deux soient finies
    //await Promise.all([
    //    (async () => await User.sync({ force: true }))(),
    //    (async () => await Post.sync({ force: true }))()
    //]);

    //await Populate();

    //return User;

    await User.sync({force: true});
    await Post.sync({force: true});
}

module.exports = Init;