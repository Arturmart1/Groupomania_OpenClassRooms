const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const { Sequelize } = require('sequelize');
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
<<<<<<< HEAD
    const cryptedEmail = AES.encrypt(req.body.email);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                fistName: req.body.fistName,
                lastName: req.body.lastName,
                email: cryptedEmail,
                password: hash,
            });
            user.create()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
=======
    //Vérification du mot de passe
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ error: 'Mot de passe invalide' });
    } else {
        bcrypt
            .hash(req.body.password, 10) // Hashing and salting the password
            .then((hash) => {
                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                }); // Create new user
                user
                    .create() // Save user in DB
                    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                    .catch((error) => res.status(403).json({ error }));
            })
            .catch(error => res.status(500).json({ error, message: error.message }));
    }
>>>>>>> 66535f860876cfc7ea8015fce9b12b69e3733e90
};

//Module de connection

exports.login = (req, res, next) => {
    const cryptedEmail = AES.encrypt(req.body.email);
    User.findOne({
        Where: {
            email: cryptedEmail
        }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        ),
                    });
                }
                )
                .catch(error => res.status(500).json({ error }));
        })
};

//Modification de l'utilisateur

exports.modifyUser = (req, res, next) => {
    const emailEncrypt = AES.encrypt(req.body.email);
    const userId = req.userId;
    User.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            user.email = emailEncrypt;
            user.save()
                .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Suppression d'un utilisateur par l'utilisateur ou un admin
exports.deleteUser = (req, res, next) => {
    const userId = req.userId;
    User.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            user.remove()
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
