const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postModel = new Post();
  console.log(req.body.file);

  const url = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  postModel
    .createPost(req.body, url)
    .then((result) => {
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
exports.updatePost = (req, res, next) => {
  const postModel = new Post();
  const postReq = req.body;

  postModel
    .getOnePost(req.params.id)
    .then((result) => {
      postModel
        .updatePost(postReq, result[0].id)
        .then(() => {
          res.status(200).json({ message: "post modifié" });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
