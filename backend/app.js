const express = require('express');
const path = require('path');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const app = express();

const userController = require('../backend/controllers/post');
const postController = require('../backend/controllers/user');
const InitDB = require('../backend/models/initdb');

//CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

InitDB().then(() => {
    app.use(express.json());

    app.use(helmet());

    app.use('/api/auth', userRoutes);

    app.use('/api/posts', postRoutes);

    app.use('/images', express.static(path.join(__dirname, 'images')));
    
}).catch((error) => {
    console.log("error : " + error);
});


module.exports = app;