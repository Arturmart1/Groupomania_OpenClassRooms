// Database
const db = require('../config/db');
// DAO model
const User = require('./userSchema');
const Post = require('./postSchema');
// Uility
//const Populate = require('./populate');

let Init = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // Démarre 2 tâches en parallèle et on attend que les deux soient finies
    await Promise.all([
        (async () => await User.sync({ force: true }))(),
        (async () => await Post.sync({ force: true }))()
    ]);

    //await Populate();

    return User;
}

module.exports = Init;