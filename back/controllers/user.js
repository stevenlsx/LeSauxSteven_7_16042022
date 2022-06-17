const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User();
      user
        .save({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          role: req.body.role,
          img_url: req.body.img_url,
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

exports.login = async (req, res, next) => {
  const userModel = new User();

  userModel
    .getUserByEmail(req.body.email)
    .then((result) => {
      const user = result[0];
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              role: user.role,
            },
            token: jwt.sign({ id: user.id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getAllUser = (req, res, next) => {
  const userModel = new User();
  userModel
    .getAllUser()
    .then((res) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
exports.getUser = (req, res, next) => {
  const userModel = new User();
  userModel
    .getUser(req.params.id)
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  const userModel = new User();

  //const [user] = userModel.getUser(req.auth);
  //if (user.id !== req.params.id && user.role !== "admin") {
  //  res.status(403).json("Vous n'êtes pas autorisé à réaliser cette action");
  //}
  userModel
    .deleteUser(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
};
exports.me = (req, res, next) => {
  const userModel = new User();
  userModel
    .getUser(req.auth)
    .then((result) => {
      delete result[0].password;
      res.status(200).json({ user: result[0] });
    })
    .catch((error) => res.status(500).json(error));
};
