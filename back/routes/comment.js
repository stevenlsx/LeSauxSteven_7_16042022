const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.getComment);
router.get("/", auth, commentCtrl.getAllComment);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.put("/:id", auth, commentCtrl.updateComment);

module.exports = router;
