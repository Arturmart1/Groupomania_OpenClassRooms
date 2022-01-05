//Schema utilisateur
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const user = Sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    freezeTableName: true,
    instanceMethods: {
        //Hash du mot de passe
        generateHash(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        },
        //Validation du mot de passe
        validPassword(password) {
            return bcrypt.compareSync(password, this.password);
        },
    },
});

return user;