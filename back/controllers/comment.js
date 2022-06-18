const Comment = require("../models/comment");
const User = require("../models/user");

exports.createComment = (req, res, next) => {
  const commentModel = new Comment();
  let comment = {
    ...JSON.parse(req.body.comment),
    img_url: null,
  };

  if (req.file) {
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    comment.img_url = url;
  }

  commentModel
    .createComment(comment)
    .then((result) => {
      comment.id = result.insertId;
      comment.date = new Date();
      res.status(201).json(comment);
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
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
