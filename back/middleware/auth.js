const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);

    const userId = decodedToken.id;
    if (req.body.id && req.body.id !== userId) {
      throw "UserId non valable";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Invalid request" });
  }
};
