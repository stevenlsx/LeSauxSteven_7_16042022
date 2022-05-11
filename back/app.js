/*Import d'Express et création de notre application Express*/
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const path = require("path");

/*Middleware configurant les headers afin de contourner les erreurs bloquantes
de la sécurité CORS pour que tout le monde puisse requêter depuis sa machine.*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Headers",
    "Origin, X-requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OTPIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);
//app.use("/api/comment");

module.exports = app;
