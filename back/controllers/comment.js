const Comment = require("../models/comment");
const fs = require("fs");

exports.createComment = (req, res, next) => {
  const commentModel = new Comment();

  commentModel
    .createComment(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getComment = (req, res, next) => {
  const commentModel = new Comment();
  commentModel
    .getComment(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getAllComment = (req, res, next) => {
  const commentModel = new Comment();

  commentModel
    .getAllComment()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentModel = new Comment();

  commentModel
    .deleteComment(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.updateComment = (req, res, next) => {
  const commentModel = new Comment();
  const commentReq = req.body;

  commentModel
    .getOneComment(req.params.id)
    .then((result) => {
      commentModel
        .updateComment(commentReq, result[0].id)
        .then(() => {
          res.status(200).json({ message: "comment modifié" });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
