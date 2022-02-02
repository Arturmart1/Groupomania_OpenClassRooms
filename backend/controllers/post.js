const Post = require('../models/postSchema');
const fs = require('fs');

//Création d'un nouveau post

exports.newPost = (req, res, next) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        image: `${req.protocol}://${req.get('host')}/images/postImages/${req.file.filename}`,
        userId: req.body.userId,
    })
    .then(post => { res.status(201).json(post); })
    .catch(err => { res.status(400).json(err); });
};

//Mise à jour du post par son auteur

exports.updatePost = (req, res, next) => {
    //const postImage = `${req.protocol}://${req.get('host')}/images/postImages/${req.file.filename}`;
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.userId === req.token.userId || req.token.isAdmin) {
                Post.update({...post, title: req.body.title, content: req.body.content, /*image: postImage */}, { where: { id: req.params.id }})
                    .then(() => res.status(201).json({ message: 'Post modifié !' }))
                    .catch(error => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce post !' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};

//Suppression d'un post

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.userId === req.token.userId  || req.token.isAdmin ) {
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

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']],
    })
    .then(posts => { res.status(200).json(posts); })
    .catch(error => res.status(500).json({ error, message: error.message }));
};

//Récupération d'un seul post

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => { res.status(200).json(post)})
        .catch(error => res.status(500).json({ error, message: error.message }));
};

//Like d'un post

exports.likePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.userId === req.token.userId) {
                Post.update({
                    likes: post.likes + 1,
                }, { where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'Post liké !' }))
                    .catch((error) => res.status(400).json({ error, message: error.message }));
            } else {
                res.status(401).json({ message: 'Vous n\'êtes pas autorisé à liker ce post !' });
            }
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
};