const { Sequelize, Model, Datatype} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {}

    user.init({
        firstName: { type : DataTypes.STRING, allowNull: false},
        lastName : { type : DataTypes.STRING, allowNull: false},
        email : { type : DataTypes.STRING, allowNull: false},
        password : { type : DataTypes.STRING, allowNull: false},
        photo: { type : DataTypes.STRING, allowNull: false},
        admin: { type: DataTypes.BOOLEAN, allowNull: false,  defaut: false},
        },
        {
            sequelize,
            modelName: 'user',
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
            }
        }
    );
    return user;
};