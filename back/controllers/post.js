const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const postModel = new Post();
  console.log(postModel);
  postModel
    .create(req.body)
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getOnePost = (req, res, next) => {
  const postModel = new Post();
  postModel
    .getOnePost(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
exports.getAllPost = (req, res, next) => {
  const postModel = new Post();
  postModel
    .getAllPost()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deletePost = (req, res, next) => {
  const postModel = new Post();
  console.log(postModel);
  postModel
    .deletePost(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
