const user = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const AES = require('aes-encryption');

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

exports.signUp = (req, res, next) => {
    //Hash du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const emailEncrypt = AES.encrypt(req.body.email);
            const user = new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: emailEncrypt,
                password: hash,
            });
            //Sauvegarde dans la DB
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Module de connection

exports.login = (req, res, next) => {
    const cryptedEmail = AES.encrypt(req.body.email);
    user.findOne({ email: cryptedEmail })
        .then(user => {
            if(!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
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
    user.findOne({ _id: userId })
        .then(user => {
            if(!user){
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
    user.findOne({ _id: userId })
        .then(user => {
            if(!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            user.remove()
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};