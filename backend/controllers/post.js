const fs = require('fs');

const postSchema = require('../models/postSchema');

//Recupération de tout les posts de tous les utilisateurs

exports.getAllPosts = (req, res, next) => {
    postSchema.find()
    .then(posts => {
        res.status(200).json({ posts: posts });
    })
    .catch(error => res.status(500).json({error}));
};

//Affichage d'un seul post

exports.getOnePost = (req, res, next) => {
    postSchema.findById(req.params.id)
    .then(post => {
        res.status(200).json({ post: post });
    })
    .catch(error => res.status(500).json({error}));
};

//Création d'un post

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new postSchema({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
    .then(() => res.status(201).json({ message: 'Post crée !',}))
    .catch((error) => res.status(403).json({error: error, message: "Echec de la création du post"}));
};

//Modification du post

exports.modifyPost = (req, res, next) => {
    postSchema.findOne({ _id: req.params.id})
    .then(post => {
        if (post.userId === req.token.userId){
            const postObject = req.file ?
            {
                ...JSON.parse(req.body.post),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {...req.body };
            postSchema.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                  .then(() => res.status(201).json({ message: 'Post mofifiée !' }))
                  .catch((error) => res.status(400).json({ error: error }));
          } else {
              return res.status(403).json({ error: 'Vous n\'avez pas le droit de modifier ce post' });
          }
      })
      .catch((error) => res.status(500).json({ error: error }));
};

//Suppression du post

exports.deletePost = (req, res, next) => {
    postSchema.findOne({ _id: req.params.id, userId: req.token.userId})
    .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            postSchema.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch((error) => res.status(500).json({ error: error, message: 'Echec de la suppression du post' }));
        });
    })
    .catch((error) => res.status(500).json({ error: error }));
};