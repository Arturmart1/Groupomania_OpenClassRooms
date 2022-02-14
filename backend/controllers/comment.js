const Comment = require('../models/commentSchema');
const Post = require('../models/postSchema');
const User = require('../models/userSchema');

//Create a new comment on a post in function of the postId
exports.newComment = (req, res, next) => {
    Comment.create({
        content: req.body.content,
        postId: req.body.postId,
        userId: req.body.userId
    })
    .then(comment => { res.status(201).json(comment); })
    .catch(error => { res.status(400).json({ error: error }); });
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ 
        where: { 
            id: req.params.id 
        },
    })
        .then((comment)=>{
            Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message : "Commentaire supprimé"}))
                .catch(error => res.status(400).json({ error }));                    
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        order: [['createdAt', 'DESC']],
        where: { postId: req.params.id },
        include: [User, Post]
    })
        .then((answers) => res.status(200).json(answers))
        .catch(error => res.status(400).json({ error }));
};

exports.commentsList = (req, res, next) =>{
    Comment.findAll({
        wher: { id: req.params.id},
        order: [['createdAt', 'DESC']]
    })
    .then((list) => res.status(200).json(list))
    .catch(error => res.status(400).json({ error}));
};