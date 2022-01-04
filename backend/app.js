const express = require('express');
const path = require('path');
const helmet = require('helmet');
const { Sequelize, DataTypes } = require('sequelize');

//Connect to maridb database using sequelize
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
});
sequelize.authenticate().then(() => {
    console.log('Connection successfull.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const app = express();

//CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;