const Comment = require('../models/commentSchema');

//Create a new comment on a post in function of the postId
exports.newComment = (req, res, next) => {
    const newComment = new Comment({
        content: req.body.content,
        postId: req.body.postId,
        userId: req.body.userId,
    });
    newComment.create()
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne ({ where: { id: req.params.id } })
        .then((comment)=>{
            Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message : "Commentaire supprimé"}))
                .catch(error => res.status(400).json({ error }));                    
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getComment = (req, res, next) => {
    Comment.findOne ({ postId : req.params.id })
        .then((comment)=>{ res.status(200).json(comment);
        })
        .catch(error => res.status(500).json({ error }));
};