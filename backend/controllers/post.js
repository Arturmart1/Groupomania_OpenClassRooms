const Post = require('../models/postSchema');
const fs = require('fs');

//Création d'un nouveau post

exports.newPost = (req, res, next) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        //image: `${req.protocol}://${req.get('host')}/images/postImages/${req.file.filename}`,
        userId: req.body.userId,
    })
    .then(post => { res.status(201).json(post); })
    .catch(err => { res.status(400).json(err); });
};

//Mise à jour du post par son auteur

exports.updatePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.userId === req.token.userId) {
                Post.update({
                    title: req.body.title,
                    content: req.body.content,
                    //image: `${req.protocol}://${req.get('host')}/images/postImages/${req.file.filename}`,
                }, { where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'Post modifié !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(401).json({ message: 'Vous n\'êtes pas autorisé à modifier ce post !' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

//Suppression d'un post

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.userId === req.token.userId) {
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce post !' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

//Recupération de tout les posts de tous les utilisateurs

exports.gets = async () => {
    await Post.findAll({ raw: true }).then((posts) => {
        for (const post of posts) {
            console.log(post);
        }
    }).catch((error) => {
        console.log("error : " + error);
    });
};

//Récupération d'un seul post

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => { res.status(200).json(post)})
        .catch(error => res.status(500).json({ error, message: error.message }));
};