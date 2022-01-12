const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const AES = require('aes-encryption');
//Création d'un utilisateur

exports.signup = (req, res, next) => {
    
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            })
            .then(() => res.status(200).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error, message : 'Echech de la création' }));
        })
        .catch(error => res.status(500).json({ error: error }));
};

//Module de connection

exports.login = (req, res, next) => {
    const cryptedEmail = AES.encrypt(req.body.email);
    User.findOne({
        Where:{
            email: cryptedEmail
        }
        })
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
    User.findOne({ _id: userId })
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
    User.findOne({ _id: userId })
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