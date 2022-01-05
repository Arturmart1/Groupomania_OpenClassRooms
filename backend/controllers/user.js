const user = require('../models/userShema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    //Verification du mot de passe
    if(!passwordSchema.validate(req.body.password)){
        res.status(401).json({message: 'Mot de passe invalide'});
    }else{
        //Création de l'utilisateur
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new user({
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({error}));
        })
    }
};

//Module de connection

exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email})
    .then (user =>{
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then (valid =>{
            if(!valid){
                return res.status(401).json({error: 'Mot de passe incorrect!'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userid: user._id }, '${process.env.TOKEN', {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//Modification de l'utilisateur par l'utilisateur

exports.updateUser = (req, res, next) => {
    user.findOne({ _id: req.userId}) //Utiliser TOKEN?
    .then(user => {
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé'});
        }
        user.email = req.body.email;
        user.save()
        .then(() => res.status(200).json({message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//Suppression de l'utilisateur par l'utilisateur

exports.deleteUser = (req, res, next) => {
    user.findOne({ _id: req.userId})  //Utiliser TOKEN?
    .then(user => {
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé'});
        }
        user.remove()
        .then(() => res.status(200).json({message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};