const User = require("../models/user");

const db = require("../config/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      console.log(hash);
      const user = new User();
      user
        .save({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          role: req.body.role,
          imgpath: req.body.imgpath,
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
            id: user.id,
            token: jwt.sign({ id: user.id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
