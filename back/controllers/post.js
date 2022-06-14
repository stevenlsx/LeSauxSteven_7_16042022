const Post = require("../models/post");
const fs = require("fs");

/*On prépare objet qui contient le corps de la requête et donne la valeur null à l'url de l'img.
 On verifie ensuite si la requête contient un file. Si c'est le cas on l'ajoute a notre objet. Sinon on créé le post.
 On peut donc créer un post avec ou sans image.*/
exports.createPost = (req, res, next) => {
  const postModel = new Post();

  let post = {
    ...JSON.parse(req.body.post),
    img_url: null,
  };
  if (req.file) {
    const url = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    post.img_url = url;
  }
  postModel
    .createPost(post)
    .then((result) => {
      post.id = result.insertId;
      post.date = new Date();
      console.log(post);
      res.status(201).json(post);
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
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deletePost = (req, res, next) => {
  const postModel = new Post();
  postModel
    .findImg(req.params.id)
    .then((image) => {
      //console.log(image);
      if (image !== null) {
        const filename = image[0].img_url.split("/images/")[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log(filename);
          postModel
            .deletePost(req.params.id)
            .then((result) => {
              //console.log(result);
              res.status(200).json(result);
            })
            .catch((error) => {
              res.status(500).json(error);
            });
        });
      }
      if (image === null) {
        console.log(image);
        postModel
          .deletePost(req.params.id)
          .then((response) => {
            console.log(response);
            res.status(200).json(response);
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      }
    })
    .catch((error) => {
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
exports.getMyPost = (req, res, next) => {
  const postModel = new Post();
  postModel
    .getMyPost(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
