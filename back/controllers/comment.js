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
      console.log(comment);
      comment.id = result.insertId;
      comment.date = new Date();
      console.log(comment);
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
  //const userModel = new User();

  //const [user] = userModel.getUser(req.auth);
  //const [comment] = commentModel.getOneComment(req.params.id);
  //if (user.id !== comment.user_id && user.role !== "admin") {
  //  res.status(403).json("Vous n'êtes pas autorisé à réaliser cette action");
  //}
  commentModel
    .deleteComment(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
