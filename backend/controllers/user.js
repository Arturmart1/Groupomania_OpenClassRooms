const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const Comment = require('../models/commentSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AES = require('../middleware/aes-encrypt');
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)                                    // Minimum 8 caractères
    .is().max(100)                                  // Maximum 100 caractères
    .has().uppercase()                              // Doit contenir au moins une majuscule
    .has().lowercase()                              // Doit contenir au moins une minuscule
    .has().digits(2)                                // Doit avoir au moins 2 chiffres
    .has().not().spaces()                           // Ne doit pas avoir d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'azerty1234']); // Liste de mots de passes interdits

//Création d'un utilisateur
exports.signup = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs' });
    }
    if (!passwordSchema.validate(password)) {
        return res.status(400).json({ error: 'Mot de passe incorrect' });
    }
    const cryptedEmail = AES.encrypt(email);
    User.findOne({
        where: {
            email: cryptedEmail
        }
    })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'Cet email est déjà utilisé' });
            }
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            User.create({
                firstName: firstName,
                lastName: lastName,
                email: cryptedEmail,
                password: hashPassword,
            })
                .then(() => {
                    res.status(201).json({ message: 'Utilisateur créé avec succès !' });
                })
                .catch(error => {
                    res.status(400).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur' });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur', message: error.message });
        });
};

//Module de connection

exports.login = (req, res, next) =>{
    const cryptedEmail = AES.encrypt(req.body.email);
    User.findOne({
        where: {
            email: cryptedEmail
        }
    })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Utilisateur non trouvé' });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).json({ error: 'Mot de passe incorrect' });
            }
            const token = jwt.sign({ userId: user.id }, 'process.env.TOKEN', { expiresIn: '24h' });
            res.status(200).json({
                userId: user.id,
                token: token,
                expiresIn: '24h',
                isAdmin: user.isAdmin
            });
        })
        .catch(error => res.status(500).json({ error: 'Une erreur est survenue lors de la connexion', message: error.message }));
};

//Modification de l'utilisateur

exports.modifyUser = (req, res, next) => {
    //const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (user.id === req.token.userId || req.token.isAdmin) {
                User.update({...user, firstName: req.body.firstName, lastName: req.body.lastName}, { where: { id: req.params.id }})
                    .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else{
                res.status(403).json({message: '403: Unauthorized request'});
            }
        })
        .catch(error => res.status(500).json({ error }));
};

//Suppression d'un utilisateur par l'utilisateur

exports.deleteUser = (req, res, next) => {
    User.findOne({ where: {id: req.params.id}})
        .then((user) => {
            if (user.id === req.token.userId || req.token.isAdmin) {
                User.destroy({where : {id: req.params.id}})
                .then(() => res.status(200).json({message: 'Utilisateur supprimé avec succès'}))
                .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce post !' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

exports.getAllUsers = (req, res, next) => {
    User.findAll({
        order: [['createdAt', 'DESC']],
        include: [Post, Comment]
    })
    .then(users => { res.status(200).json(users); })
    .catch(error => res.status(500).json({ error, message: error.message }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ 
        where: { id: req.params.id}
    })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json(error));
};