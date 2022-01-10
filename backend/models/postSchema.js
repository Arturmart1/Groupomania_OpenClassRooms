const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const post = Sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    userliked: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
    },
    freezeTableName: true,
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        },
        validPassword(password) {
            return bcrypt.compareSync(password, this.password);
        },
    },
});

return post;
