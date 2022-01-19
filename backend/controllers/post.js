const Post = require('../models/postSchema');
const fs = require('fs');

//Creatation d'un nouveau post

exports.newPost = (req, res, next) => {
    const { title, content } = req.body;
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const userId = req.userId;
    Post.create({
        title: title,
        content: content,
        image: image,
        userId: userId,
    })
    .then(() => { res.status(200).json({ message: 'Post créé !' });
    })
    .catch(error => { res.status(400).json({ error: 'Une erreur est survenue lors de la création du post' });
    });
};

//Recupération de tout les posts de tous les utilisateurs

exports.getPosts = (req, res, next) => {
    Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(posts => {
            res.status(200).json({ posts: posts });
        })
        .catch(err => {
            res.status(500).json({ error: err, message: error.message });
        });
};