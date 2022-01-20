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