const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.getComment);
router.get("/", auth, commentCtrl.getAllComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
